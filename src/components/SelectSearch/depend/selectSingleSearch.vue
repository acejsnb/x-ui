<template>
    <div
            class="p-select-search"
            :style="{width: width+'px'}"
            @mouseenter="selectOptionEnter"
            @mouseleave="selectOptionLeave"
    >
        <div :class="['p-select-search-box', boxFocus&&'p-select-search-box-focus', disabled&&'p-select-search-box-disabled']" @click="searchBoxClick">
            <section
                    v-show="fieldStatus"
                    :class="[
                     'p-select-search-field-text',
                     (pleaseSelect!=='Please select' && searchPlaceHolder)&&'p-select-choice-name'
                    ]"
            >{{pleaseSelect}}</section>
            <section class="p-select-search-field">
                <article class="p-select-field-item">
                    <input
                            type="text"
                            class="p-select-search-input"
                            v-model="inputValue"
                            @input="searchInput"
                            @blur="inputBlur"
                            ref="inputField"
                            :style="{width: inputWidth+'px'}"
                    >
                </article>
            </section>
            <span class="p-select-search-triangle">
                <TriangleSvg :class="[!dropDownShow&&'p-select-search-triangle-rotate']" />
            </span>
        </div>
        <transition name="slideDownUpUi">
            <div class="p-select-drop-down-box" v-show="dropDownShow">
                <div class="p-select-drop-down-not" v-if="notFound">Not found</div>
                <SelectOption
                        :selectedId="selectedId"
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
    import SelectOption from '../../SelectOption/SelectOption';

    export default {
        name: "SelectSingleSearch",
        components: { IconCloseSvg, TriangleSvg, SelectOption },
        props: {
            // 选中项的id
            selectedId: {
                type: String,
                default: ''
            },
            // 是否禁用
            disabled: {
                type: Boolean,
                default: false
            },
            // 盒子宽度
            width: {
                type: [String, Number],
                default: 240
            },
            // 传入的数据
            data: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                pleaseSelect: 'Please select', // 请搜索占位符
                searchPlaceHolder: false, // 控制文字颜色
                fieldStatus: true, // 控制占位符是否显示
                boxFocus: false, // box-focus是否获取焦点
                inputValue: '', // 输入框输入的值
                inputWidth: 10, // 输入框的宽度
                // 下拉框是否显示
                dropDownShow: false,
                // 搜索的数据
                searchData: [],
                // 激活关闭
                closeDrop: false
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
                    this.setInputWidth(n, this.$refs.inputField);
                } else {
                    this.inputWidth=10;
                    setTimeout(() => this.searchData=this.data, 300);
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
                if (this.disabled || this.dropDownShow) return;
                this.dropDownShow=true;
                if (this.pleaseSelect!=='Please select') this.searchPlaceHolder=false;

                this.$refs.inputField.focus();
                this.boxFocus=true;
            },
            setInputWidth(v, obj) {
                if (v) {
                    this.fieldStatus=false;
                    const { scrollWidth }=obj;
                    if (scrollWidth < this.width-24) this.inputWidth=scrollWidth;
                    else this.inputWidth=this.width-24;
                    this.filterSelect(v);
                } else {
                    this.fieldStatus=true;
                }
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                const v=e.data;
                this.fieldStatus = !v;
                if (v) this.setInputWidth(v, e.target);
                else this.searchData=this.data;
            },
            // 设置选中的值
            setChoiceName(id) {
                const d=this.data.find(d => d.id === id);
                if (d && d.name) return d.name.replace(/<[^<>]+>/g, '');
                return '';
            },
            filterSelect(v) {
                const re=new RegExp(v, 'g');
                const data=JSON.parse(JSON.stringify(this.data));
                this.searchData=data.filter(d => d.name.includes(v)).map(d => {
                    d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                    return d;
                });
            },
            // 关闭选择框
            inputBlur() {
                if (!this.closeDrop) return;
                setTimeout(() => {
                    if (!this.dropDownShow) return;
                    this.boxFocus=false;
                    this.dropDownShow=false;
                    this.searchPlaceHolder=true;
                }, 0);
            },
            // 子项鼠标移入
            selectOptionEnter() {
                this.closeDrop=false;
            },
            // 子项鼠标移出
            selectOptionLeave() {
                this.closeDrop=true;
                if (!this.disabled && this.dropDownShow) this.$refs.inputField.focus();
            },
            // 设置选中的数据
            setDataNow(id) {
                this.dropDownShow=false;
                this.inputValue='';
                this.searchPlaceHolder=true;
                this.fieldStatus=true;
                this.pleaseSelect=this.setChoiceName(id);
            },
            // 提交当前选择的值
            optionClick(id) {
                this.setDataNow(id);

                this.$emit('change', id);
            }
        }
    }
</script>

<style lang="stylus">
</style>