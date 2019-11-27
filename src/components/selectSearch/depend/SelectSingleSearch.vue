<template>
    <div class="p-select-search" :style="{width: width+'px'}">
        <div class="p-select-search-box" @click="searchBoxClick">
            <section class="p-select-search-field-text" v-if="searchPlaceHolder&&!choiceName">{{pleaseSelect}}</section>
            <section class="p-select-search-field">
                <article class="p-select-field-item" v-show="!dropDownShow&&choiceName&&pleaseSelect==='Please select'">
                    <span class="p-select-choice p-select-choice-name">{{choiceName}}</span>
                </article>
                <article class="p-select-field-item">
                    <input
                            type="text"
                            class="p-select-search-input"
                            v-model="inputValue"
                            @input="searchInput"
                            @blur="hideSelect"
                            ref="inputField"
                            :style="{width: inputWidth+'px'}"
                    >
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
    import SelectOption from '../../selectOption/SelectOption';

    export default {
        name: "SelectSingleSearch",
        components: { IconCloseSvg, TriangleSvg, SelectOption },
        props: {
            // 选中项的id
            selectedId: {
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
                pleaseSelect: 'Please select', // 请搜索占位符
                searchPlaceHolder: true, // 请搜索是否显示
                inputValue: '', // 输入框输入的值
                inputWidth: 10, // 输入框的宽度
                // 下拉框是否显示
                dropDownShow: false,
                // 搜索的数据
                searchData: [],
                // 选中的数据
                choiceName: '',
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
                    this.filterSelect(n);
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
                if (this.dropDownShow) return;
                this.dropDownShow=true;
                if (this.choiceName) {
                    this.pleaseSelect=this.choiceName;
                    this.choiceName='';
                }

                this.$refs.inputField.focus();
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                this.searchPlaceHolder = !e.target.value;
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
            hideSelect() {
                setTimeout(() => this.dropDownShow=false, 300);
            },
            // 提交当前选择的值
            optionClick(id) {
                this.inputValue='';
                this.dropDownShow=false;
                this.searchPlaceHolder=true;
                this.pleaseSelect='Please select';
                this.choiceName=this.setChoiceName(id);

                this.$emit('click', id);
            }
        }
    }
</script>

<style lang="stylus">
</style>