<template>
    <div  v-clickoutside="handleClose" :class="classes" :style="{cursor: disabled? 'not-allowed': 'pointer'}" ref='pSelect'>
        <div  
            :disabled="disabled"
            :class="headerClass" 
            @click="handleOpen"
            :style="headerStyle" >
            <span class="p-select-title" ref="caption" v-if="caption && !multiple" >{{caption}}</span>
            <span v-if="showCount && multiple && selectedNum" class="p-select-count">
                <span>已选择<span class="p-select-count-active">{{selectedNum}}</span>项</span>
            </span>
            <span class="p-select-selected-box" v-show="!showCount">
                <input 
                    :class="[this.prefixCls + '-input']"
                    :style="inputStyle"
                    @input="handleInput"
                    @focus="handleFocus"
                    type="text"
                    ref="input"
                    autocomplete="off"
                    spellcheck="false"
                    v-model="selectedItem"
                />
                <span class="p-select-placeholder" v-show="showPlaceholder" > {{ placeholder}}</span>
            </span>
            <Triangle :class="triangleClass" />
        </div>
    </div>
</template>
<script>
import Drop from './Drop.vue'
import Triangle from '../static/iconSvg/triangle.svg'
import iconClose from '../static/iconSvg/icon_close.svg'
import clickoutside from './directive/clickoutside.js'
import Options from './dropdown'

export default {
    name: "pSelect",
    inheritAttrs: false,
    directives: { 
        'clickoutside':clickoutside,
    },
    components: { Triangle, Drop, iconClose},
    computed:{
        classes () {    
            return [
                `${this.prefixCls}`,
                {
                    [`${this.prefixCls}-multiple`]: this.multiple,
                }
            ];
        },
        headerStyle () {
            return {
                width : this.width + 'px',
                borderRadius: !!this.radius ? '16px' : '4px',
                backgroundColor: this.disabled ? '#EFF0F1' :'white',
                cursor: this.disabled ? 'not-allowed' :'pointer',
                pointerEvents:this.disabled ? 'none': 'auto',
            }
        },
        triangleClass () {
            return [ 'p-select-triangle', this.dropInstance &&  this.dropInstance.dropVisible ? 'p-select-triangle-up' : 'p-select-triangle-down']
        },
        headerClass () {
            return ['p-select-header', this.radius&&'p-select-header-radius' ]
        },
        inputStyle () {
            return {
                cursor:this.disabled ? 'not-allowed': 'pointer',
            }
        }
    },
    
    watch : {
        /**
         * 下拉列表数据
         */
        selectdata:{
            handler (n, o) {
                if (n !== o) {
                    n.forEach((item, index) => {
                        this.$set(item,'selected', false)
                    })
                    this.dropData = n
                    this.filterdata = this.cloneDeep(n)
                }
            },
            deep:true,
            immediate: true
        },
        /**
         * 默认选中项
         */
        value:{
            handler(n, o) {
                if (n !== o && n) {
                    if (this.dropInstance) {
                        this.dropInstance.value=n
                    }
                }
            },
            immediate:true
        },
    },
    props: {
        /**
         * 是否多选
         */
        multiple:{
            type: Boolean,
            default: false
        },
        count:{
            type: Boolean,
            default: false
        },
        /**
         * 绑定的v-model值
         */
        value: {
            type: [String,Number],
            default: ''
        },
        /**
         * 下拉列表数据
         */
        selectdata: {
            type: Array,
            default: () => []
        },
        /**
         * 宽度
         */
        width: {
            type: [String, Number],
            default: '200'
        },
        /**
         * 是否设置圆角
         */
        radius: {
            type: Boolean,
            default: false
        },
        /**是否设置标题 */
        caption:{
            type: String,
            default: ''
        },
        /**是否是禁止选中 */
        disabled:{
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            prefixCls:'p-select',
            selectedItems:[],  // 多选条件下被选项集合
            selectedItem:'',   // 单选条件下被选选
            selectedItemsText:'',  // 多选条件下已选项提示框
            dropVisible:false, // 控制下拉列表的显示隐藏,
            getScroll:null,
            resetPostion:null,
            queryItems:[],   // 搜索下拉框
            filterdata:[],
            query:'', // 搜索项
            showPlaceholder: true,
            placeholder:'请选择',
            selectedNum:0, 
            showCount:false,
            dropData:[],
            dropInstance:null  
        }
    },
    methods: {
        /**
         * description 深度克隆对象
         * params obj 需要克隆的对象
         */
        cloneDeep(obj) {
            if (typeof obj !=='object' || obj === null) {
                return obj
            }
            let newObj = Array.isArray(obj) ? [] : {}
            for (let key in obj) {
                if (typeof obj[key] === 'object') {
                    newObj[key]  = this.cloneDeep(obj[key] )
                } else {
                    newObj[key] = obj[key]
                }
            }
            return newObj
        },
        /**
         * description 处理用户输入事件
         * params event事件对象
         */
        handleInput (event) {
            this.query = event.target.value || event.data || ''
            if (!this.dropInstance) return
            if (this.query) {
                this.showPlaceholder = false
                this.dropInstance.query = this.query
                this.dropInstance.data = this.findSelectedItem()
            } else {
                this.dropInstance.data = this.selectdata 
            } 
        },
         /**
         * description 处理点击事件
         * params option 选中项
         */
        optionClick (option) {
            if (this.multiple) {
                if (option.selected) {
                    let index = this.selectedItems.findIndex((item) => {return item.id===option.id})
                    if (index > -1) {
                        this.selectedItems.splice(index,1)
                        if (!this.selectedItems.length ) {
                            this.showPlaceholder = true
                            this.showCount = false
                            this.dropInstance.data= this.selectdata
                        }
                    }
                } else {
                    this.selectedItems.push(option)
                }
                this.selectedItem = ''
                option.selected = !option.selected
                this.$emit('change', this.selectedItems)
            } else {
                if (!this.dropInstance) return
                this.dropInstance.data.forEach(item => {
                    item.selected = false
                })
                this.dropInstance.data[option.id].selected = true
                this.selectedItem = option.name
                this.placeholder = option.name
                this.showPlaceholder = false
                this.dropInstance.dropVisible = false
                this.$emit('change', option)
            }
        },
        /**
         * description 下拉框在打开和合上之间切换状态
         */
        handleOpen () { 
            if (this.multiple && this.showCount) {
                this.showPlaceholder = true
                this.placeholder = `已选择 ${this.selectedNum} 项`
                this.showCount = false
            }  
            if (this.dropInstance) {
                this.dropInstance.dropVisible=!this.dropInstance.dropVisible
            } else {
                const data=this.dropData, value=this.value, multiple = this.multiple
                // 初始化实例
                this.dropInstance=Options({
                    tag: this.$refs.pSelect, data:{value}, props:{multiple, query: this.query, value, data}
                }).$on('change', (option) => {
                    this.optionClick(option)
                }).$on('cancel' ,() => {
                    this.emitCancel()
                }).$on('confirm' ,() => {
                    this.emitConfirm()
                })
                this.dropInstance.$nextTick(() => {
                    this.dropInstance.dropVisible=true;
                })
            }
        },
        /**
         * description 根据输入内容筛选匹配项
         */
        findSelectedItem () {
            let selections = []
            this.filterdata.forEach(item => {
                item.display = item.name
                selections.push(item)
            })
            let foundItems = selections.filter(item => {
                return item.name ? item.name.indexOf(this.query) > -1 : false;
            }).map(item => {
                item.display = item.display.replace(new RegExp(this.query, 'g'), `<span style="color:#0091FF">${this.query}</span>`);
                return item;
            })
            return foundItems
        },
        handleFocus () {
            this.selectedItem = ''
            if (!this.dropInstance) return
            if (this.multiple) {
                this.dropInstance.data.forEach(item => item.selected = false)
                if (this.showCount) {
                    this.showPlaceholder = true
                    this.placeholder = `已选择 ${this.selectedNum} 项`
                    this.showCount = false
                }
            } else {
                if (this.dropInstance) {
                    this.dropInstance.data= this.selectdata
                    this.showPlaceholder = true
                }
            }
        },
        /**
         * description 向父组件传递取消并关闭下拉框
         */
        emitCancel () {
            this.selectedItems = []
            if(this.dropInstance){
                this.dropInstance.data.forEach(item => item.selected = false)
                this.dropInstance.dropVisible = false
                this.$emit('cancel')
            }
        },
            /**
         * description 向父组件传递确认事件并关闭下拉框
         */
        emitConfirm () {
            this.selectedNum = this.selectedItems.length
            if (this.dropInstance) this.dropInstance.dropVisible = false
            this.showPlaceholder = !this.selectedItems.length
            this.showCount = true
            this.$emit('confirm', this.selectedItems)
            this.selectedItems = []
        },
        /**
         * description 关闭下拉列表
         */
        handleClose () {
            if (this.dropInstance) {
                this.selectedItems = []
                this.dropInstance.dropVisible = false
                this.placeholder = '请选择'
                this.dropInstance.data.forEach(item => item.selected = false)
            }
             
        },
        /**
         *description 输入框失去焦点的事件
        */
        onInputBlur () {
            if (this.dropInstance) this.dropInstance.dropVisible = false
        },
    },
    /**
     * description 组件销毁
     */
    beforeDestroy() {
        if (this.dropInstance) {
            this.dropInstance.dropVisible = false
            Options.remove(this.dropInstance)
        }
    }
}
</script>
<style lang="stylus">
    @import "../static/stylus/animate/selectDownUp.styl"
    .p-select
        position relative
        min-width 200px
        display inline-block
        vertical-align middle
        cursor pointer
        outline none
        .p-select-drop-down
            position fixed;
            .p-select-not-found 
                height 54px
                padding 16px 0 16px 12px
                border 1px solid #E4E5E7
                border-radius 4px
                line-height 22px
                font-size 14px
                color #C3C7CB
                background:white
                box-shadow $box-shadow-bottom
                box-sizing border-box
        .p-select-header-radius
            border 1px solid #ccc
            border-radius 12px
        .p-select-header
            position relative
            display flex
            z-index 100000
            min-height 32px
            height 32px
            width 100%
            box-sizing border-box
            border 1px solid #ccc
            border-radius 4 px
            overflow hidden
            cursor pointer
            .p-select-count
                color #1F2429
                font-size 14px
                line-height 32px
                padding-left 12px
                .p-select-count-active
                    color #0091FF
                    margin 0 4px
            .p-select-title
                display inline-block
                padding 0 0 0 12px
                height 30px
                line-height 30px
                font-size 14px
                flex-shrink 0
            .p-select-selected-box
                position relative
                flex-shrink 1
                display inline-block
                height 32px
                width 100%
                box-sizing border-box
                color #1F2329
                font-size 14px
                .p-select-input, .p-select-placeholder
                    display inline-block
                    position absolute
                    left 0 
                    top 0
                    padding-left 12px
                    height 30px
                    width 100%
                    border none
                    outline none
                    line-height 30px
                .p-select-placeholder
                    z-index 99
                    pointer-events none
                    color #C3C7CB
                .p-select-input
                    z-index 9
                    color #1F2429
            .p-select-triangle
                position absolute
                z-index 999
                top 8px
                right 10px
                transform-origin center center
                transform rotate(180deg)
                transition 0.3s ease-in-out
                will-change rotate
            .p-select-triangle-up
                transform rotate(0deg)
            .p-select-triangle-down
                transform rotate(180deg)
            &:hover
                border 1px solid #0091FF
                box-shadow 0 0 0 2px rgba(0, 145, 255, .2)
                transition 0.3s
                will-change box-shadow

</style>
