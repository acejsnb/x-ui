<template>
    <div :class="classes" :style="tagStyle">
        <div :class="[this.prefixCls + '-wrapper']">
            <span v-if="showDot" :class="[this.prefixCls + '-dot-icon']" :style="dotStyle" />
            <component :is="status" v-if="showIcon" :class="[this.prefixCls + '-icon']" />
            <span :class="[this.prefixCls + '-text']">
                <span v-if="!!status">{{tagText}}</span>
                <slot v-if="!!color" />
            </span>
        </div>
    </div>
</template>
<script>
    // 以下为引入的五个SVG图标
    import completed from '../static/iconSvg/completed.svg'
    import error from '../static/iconSvg/error.svg'
    import processing from '../static/iconSvg/processing.svg'
    import rejected from '../static/iconSvg/rejected.svg'
    import remove from '../static/iconSvg/remove.svg'
    export default {
        name: "Tag",
        components: {completed, error, processing, rejected, remove},
        data () {
            return {
                prefixCls:'p-tag',
                tagText:'',
            }
        },
        props: {
            size: {
                type: String,
                validator(value){
                    return    ['big', 'small'].findIndex(item =>{return item === value} ) > -1
                },
                default: 'big'
            },
            type: {
                type: String,
                validator(value){
                    return   ['circular', 'dot'].findIndex(item => {return item === value} ) > -1
                }
            },
            color: {
                type: String,
                validator(value){
                    return   ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1'].findIndex(item => {return item === value} ) > -1
                },
                default:'#E1F2FF'
            },
            status: {
                type: String,
                validator(value){
                    return   ['processing', 'error', 'completed', 'rejected','remove'].findIndex(item => { return item === value} ) > -1
                },
                default: 'processing'
            }
        },
        methods:{
            oneOf (value, checkList){
                return checkList.includes(value)
            },
            findColorIndex (color, colorList){
                return colorList.indexOf(color)
            }
        },
        computed:{
            tagBgColors () {
                return ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1']
            },
            tagTextColors () {
                return ['#0065B3', '#078372', '#237B19', '#AA7803', '#B26206', '#AC2F28', '#8C218C', '#4E1BA7', '#161FA2', '#373C43']
            },
            radiusTagBgColors () {
                return ['#E1F2FF', '#FDE3E2', '#D9F5D6' , '#FEEAD2', '#EFF0F1']
            },
            radiusTagTextColors () {
                return ['#0091FF', '#F54E45', '#34C724' , '#F58300', '#8D9399']
            },
            statusList () {
                return ['processing', 'error', 'completed', 'rejected','remove']
            },
            statusText () {
                return ['进行中', '错误', '已完成', '已拒绝','删除']
            },
            classes () {
                return [
                    `${this.prefixCls}`,
                    {
                        [`${this.prefixCls}-${this.size}`]: !this.type ,
                        [`${this.prefixCls}-${this.type}`]: !!this.type,
                    }
                ]
            },
            showDot () {
                return !!this.type && this.type === 'dot' 
            },
            dotStyle () {
                let colorPos = this.findColorIndex(this.status, this.statusList)
                return {backgroundColor: this.radiusTagTextColors[colorPos]}
            },
            showIcon () {
                return !!this.type && this.type === 'circular'
            },
            iconSrc () {
                if (!!this.status ) {
                    return `../static/iconSvg/${this.status}.svg`
                } else {
                    return ''
                }
            },
            tagStyle () {
                let color =''
                let backgroundColor = ''
                if (!this.type) {
                    let colorPos = this.findColorIndex(this.color, this.tagBgColors)
                    if (colorPos < 0) {
                        return {}
                    } else {
                        color = this.tagTextColors[colorPos]
                        backgroundColor = this.color
                    }
                } else {
                    let colorPos = this.findColorIndex(this.status, this.statusList)
                    if (colorPos < 0) return {}
                    if (this.type === 'circular' && !!this.status) {
                        color = this.radiusTagTextColors[colorPos]
                        backgroundColor = this.radiusTagBgColors[colorPos]
                    } 
                    if (this.type === 'dot' && !!this.status){
                        color = '#2B2F36'
                        backgroundColor = ''
                    }
                    this.tagText = this.statusText[colorPos]
                    
                } 
                return {color, backgroundColor}
            },
        }
    }
</script>

<style lang="stylus">
.p-tag
    display inline-block
    font-size 14px
    .p-tag-wrapper
        display flex
        justify-content center
        align-items center
        box-sizing border-box 
.p-tag-big
    min-width 40px
    margin-right 8px
    padding 4px 8px
.p-tag-small
    height 18px
    margin-right 4px
    font-size 12px
    padding 2px 8px
.p-tag-circular
    margin-right 12px
    border-radius 12px
    padding 4px 12px
    .p-tag-icon
        width 12px
        height 12px
        margin-right 4px
.p-tag-dot
    margin-right 12px
    .p-tag-dot-icon
        width 6px
        height 6px
        border-radius 50%
        margin 0 8px

</style>

