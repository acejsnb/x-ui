<template>
    <div class="p-select-search" :style="{width: width+'px'}">
        <div class="p-select-search-box" @click="searchBoxClick">
            <section class="p-select-search-field-text" v-if="searchPlaceHolder">请搜索</section>
            <section class="p-select-search-field">
                <article class="p-select-field-item" v-for="(cd, cdi) in choiceData" :key="cd.name+'-'+cdi">
                    <span class="p-select-choice">{{cd.name}}</span>
                    <span class="p-select-choice-clear" @click="removeChoiceItem(cdi)"><IconCloseSvg /></span>
                </article>
                <article class="p-select-field-item">
                    <input type="text" class="p-select-search-input" v-model="inputValue" @input="searchInput" ref="inputField" :style="{width: inputWidth+'px'}">
                </article>
            </section>
            <span class="p-select-search-triangle">
                <TriangleSvg :class="[!dropDownShow&&'p-select-search-triangle-rotate']" />
            </span>
        </div>
        <transition name="slideDownUp">
            <div class="p-select-drop-down-box" v-show="dropDownShow">
                <div class="p-select-drop-down-not" v-if="notFound">Not found</div>
                <SelectOption
                        v-model="value"
                        :data="searchData"
                        @click="optionClick"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import IconCloseSvg from '../../static/iconSvg/icon_close.svg';
    import TriangleSvg from '../../static/iconSvg/triangle.svg';
    import SelectOption from '../../selectOption/SelectOption';

    export default {
        name: "SelectMultipleSearch",
        components: { IconCloseSvg, TriangleSvg, SelectOption },
        props: {
            // 选中项的id
            value: {
                type: String,
                default: ''
            },
            // 盒子宽度
            width: {
                type: [String, Number],
                default: 240
            },
            // 传入的数据
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                searchPlaceHolder: true, // 请搜索是否显示
                inputValue: '', // 输入框输入的值
                inputWidth: 10, // 输入框的宽度
                // 下拉框是否显示
                dropDownShow: true,
                // 搜索的数据
                searchData: [],
                // 选中的数据
                choiceData: []
            }
        },
        computed: {
            // 搜索无内容
            notFound() {
                return this.searchData.length===0;
            }
        },
        watch: {
            // 监听文字输入
            inputValue(n, o) {
                if (n === o) return;
                if (n) {
                    const { scrollWidth }=this.$refs.inputField;
                    if (scrollWidth < this.width-24) this.inputWidth=scrollWidth;
                    else this.inputWidth=this.width-24;
                } else {
                    this.inputWidth=10;
                }
            }
        },
        created() {
            // 设置option数据
            this.searchData=this.data;
        },
        methods: {
            // 点击p-select-search-box使输入框获取焦点
            searchBoxClick() {
                this.dropDownShow=!this.dropDownShow;
                // this.dropDownShow=true;
                this.$refs.inputField.focus();
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                this.searchPlaceHolder = !e.target.value;
            },
            // 移除选中的项
            removeChoiceItem(i) {
                this.choiceData.splice(i, 1);
            },
            // 提交当前选择的值
            optionClick(id) {
                this.$emit('click', id);
            }
        }
    }
</script>

<style lang="stylus">
@import "../../static/stylus/animate/selectDownUp.styl"

.p-select-search
    position relative
    display inline-block
    z-index 100
    .p-select-search-box
        position relative
        padding-left 12px
        padding-right @padding-left
        background-color #fff
        border 1px solid $grey-400
        border-radius 4px
        width 100%
        min-height 32px
        overflow hidden
        cursor pointer
        z-index 101
        .p-select-search-field-text
            position absolute
            left 0
            top 0
            padding-left 12px
            width 100%
            height 30px
            line-height 30px
            color $grey-400
            font-size 14px
            z-index 1
        .p-select-search-field
            .p-select-field-item
                position relative
                display inline-block
                z-index 2
                .p-select-choice
                    display inline-block
                    margin-top 4px
                    margin-right 4px
                    padding-left 8px
                    padding-right 28px
                    background-color $grey-200
                    border-radius 2px
                    height 24px
                    line-height @height
                    font-size 14px
                    color $grey-900
                .p-select-choice-clear
                    position absolute
                    top 9px
                    right 12px
                    z-index 5
                    cursor pointer
                    svg
                        &:hover
                            path
                                transition fill .3s
                                fill $blue-500
                .p-select-search-input
                    outline none
                    border 0
                    background none
                    width .75em
                    max-width 100%
                    height 30px
                    line-height @height
                    font-size 14px
        .p-select-search-triangle
            position absolute
            top 8px
            right 8px
            svg
                transition transform .3s
            .p-select-search-triangle-rotate
                transform rotate(180deg)
    .p-select-drop-down-box
        position absolute
        top 100%
        left 0
        width 100%
        transform translateY(8px)
        z-index 99
        .p-select-drop-down-not
            padding 16px 12px
            background-color #fff
            border 1px solid $grey-300
            border-radius 4px
            box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
            color $grey-400
            font-size 14px

</style>