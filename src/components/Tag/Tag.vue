<template>
    <div :class="classes" :style="tagStyle">
        <div :class="[prefixCls + '-wrapper']">
            <span v-if="showDot" :class="[prefixCls + '-dot-icon']" :style="dotStyle"></span>
            <component :is="status" v-if="showIcon" :class="[prefixCls + '-icon']" style="width:12px; height:12px"/>
            <span :class="[prefixCls + '-text']"><slot></slot></span>
        </div>
    </div>
</template>

<script>
    // 以下为引入的五个SVG图标
    import completed from '../static/iconSvg/completed.svg';
    import error from '../static/iconSvg/error.svg';
    import processing from '../static/iconSvg/processing.svg';
    import rejected from '../static/iconSvg/rejected.svg';
    import remove from '../static/iconSvg/remove.svg';
    const tagBgColors = ['#E1F2FF' , '#D5F6F2', '#D9F5D6', '#FAF1D1', '#FEEAD2', '#FDE3E2', '#FDDDEF', '#ECE2FE' ,'#B2E6F2', '#EFF0F1']
    const tagTextColors = ['#0065B3', '#078372', '#237B19', '#AA7803', '#B26206', '#AC2F28', '#8C218C', '#4E1BA7', '#161FA2', '#373C43']
    const radiusTagBgColors = ['#E1F2FF', '#FDE3E2', '#D9F5D6' , '#FEEAD2', '#EFF0F1']
    const radiusTagTextColors = ['#0091FF', '#F54E45', '#34C724' , '#F58300', '#8D9399']
    const statusList = ['processing', 'error', 'completed', 'rejected','remove']
    const oneOf = (value, checkList) =>{
        return checkList.includes(value)
    }
    const findColorIndex = (color, colorList) => {
        return colorList.indexOf(color)
    }
    const prefixCls = "p-tag"
     
    export default {
        name: "Tag",
        components: { completed,error,processing,rejected,remove },
        data () {
            return {
                prefixCls:prefixCls,
            }
        },
        computed:{
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.size}`]: !this.type ,
                        [`${prefixCls}-${this.type}`]: !!this.type,
                    }
                ]
            },
            showDot () {
                return !!this.type && this.type === 'dot' 
            },
            dotStyle () {
                let colorPos = findColorIndex(this.status, statusList)
                return {backgroundColor: radiusTagTextColors[colorPos]}
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
                    let colorPos = findColorIndex(this.color, tagBgColors)
                    if (colorPos < 0) {
                        return {}
                    } else {
                        color = tagTextColors[colorPos]
                        backgroundColor = this.color
                    }
                } else {
                    if (this.type === 'circular' && !!this.status) {
                    let colorPos = findColorIndex(this.status, statusList)
                        if (colorPos < 0) {
                            return {}
                        } else {
                            color = radiusTagTextColors[colorPos]
                            backgroundColor = radiusTagBgColors[colorPos]
                        }
                    } 
                    if (this.type === 'dot' && !!this.status){
                        color = '#2B2F36'
                        backgroundColor = ''
                    }
                } 
                return {color, backgroundColor}
            },
        },
        props: {
            size: {
                type: String,
                validator(value){
                    return oneOf(value, ['big', 'small'])
                },
                default: 'big'
            },
            type: {
                type: String,
                validator(value){
                    return oneOf(value, ['circular', 'dot'])
                }
            },
            color: {
                type: String,
                validator(value){
                    return oneOf(value, tagBgColors)
                },
                default:'#E1F2FF'
            },
            status: {
                type: String,
                validator(value){
                    return oneOf(value, statusList)
                },
                default: 'processing'
            }
        },
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
    padding 2px 4px
.p-tag-circular
    margin-right 12px
    border-radius 12px
    padding 4px 8px
    .p-tag-icon
        width 12px
        height 12px
        margin 0px 6px
    svg 
        width 12px
        height 12px
.p-tag-dot
    margin-right 12px
    .p-tag-dot-icon
        width 6px
        height 6px
        border-radius 50%
        margin 0px 8px
</style>

