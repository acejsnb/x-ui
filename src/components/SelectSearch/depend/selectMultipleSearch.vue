<template>
    <div
            class="p-select-search"
            :style="{width: width+'px'}"
            @mouseenter="selectOptionEnter"
            @mouseleave="selectOptionLeave"
    >
        <div :class="['p-select-search-box', boxFocus&&'p-select-search-box-focus', disabled&&'p-select-search-box-disabled']" @click="searchBoxClick">
            <section
                    v-show="fieldStatus&&(!choiceData||!choiceData.length)"
                    :class="[
                     'p-select-search-field-text',
                     (pleaseSelect!=='Please select' && searchPlaceHolder)&&'p-select-choice-name'
                    ]"
            >{{pleaseSelect}}</section>
            <section :class="['p-select-search-field', !accept&&'p-select-search-field-accept']">
                <article class="p-select-field-item" v-for="(cd, cdi) in choiceData" :key="cd.id+'-'+cdi" v-show="accept?cdi < 5:true">
                    <span class="p-select-choice" :title="cd.name">{{cd.name}}</span>
                    <span class="p-select-choice-clear" @click="removeChoiceItem(cdi)"><IconCloseSvg /></span>
                </article>
                <article class="p-select-field-item" v-show="moreChoiceCount>0 && accept">
                    <span class="p-select-choice p-select-choice-more">{{`+ ${moreChoiceCount}...`}}</span>
                </article>
                <article class="p-select-field-item">
                    <!--
                    -->
                    <input
                            type="text"
                            class="p-select-search-input"
                            :style="{width: inputWidth+'px'}"
                            ref="inputField"
                            v-model="inputValue"
                            @input="searchInput"
                            @keydown.8="inputKeydown"
                            @blur="inputBlur"
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
                <SelectOptionMultiple
                        ref="selectOption"
                        :selectedIds="selectedIds"
                        :data="searchData"
                        @change="optionClick"
                />
            </div>
        </transition>
    </div>
</template>

<script>
    import IconCloseSvg from '../../static/iconSvg/icon_close.svg';
    import TriangleSvg from '../../static/iconSvg/triangle.svg';
    import SelectOptionMultiple from '../../SelectOptionMultiple/SelectOptionMultiple';

    export default {
        name: "SelectSingleSearch",
        components: { IconCloseSvg, TriangleSvg, SelectOptionMultiple },
        props: {
            // 收纳
            accept: {
                type: Boolean,
                default: true
            },
            // 选中项的id
            selectedIds: {
                type: Array,
                default: () => []
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
                // 选中的数据
                choiceData: [],
                // 激活关闭
                closeDrop: false
            }
        },
        computed: {
            // 搜索无内容
            notFound() {
                return this.searchData.length===0;
            },
            // 选择的项是否显示更多
            moreChoiceCount() {
                return this.choiceData.length-5;
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
                    setTimeout(() => {
                        this.setSelectedData(this.data, this.selectedIds);
                    }, 0);
                }
            }
        },
        created() {
            // 设置option数据
            this.setSelectedData(this.data, this.selectedIds);
            // 设置选中的数据
            this.choiceData=this.data.filter(d => this.selectedIds.includes(d.id));
        },
        methods: {
            // 点击p-select-search-box使输入框获取焦点
            searchBoxClick() {
                if (this.disabled) return;
                this.$refs.inputField.focus();
                if (this.dropDownShow) return;
                this.dropDownShow=true;
                if (this.pleaseSelect!=='Please select') this.searchPlaceHolder=false;

                this.boxFocus=true;
            },
            // 设置输入框宽度
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
                this.setInputWidth(v, e.target);
            },
            setSelectedData(data, ids) {
                const dataArr=JSON.parse(JSON.stringify(data));
                this.searchData = dataArr.map(d => {
                    d.selected = !!ids.includes(d.id);
                    return d;
                });
            },
            // 筛选
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
            // 监听退格键
            inputKeydown(e) {
                const v=e.target.value;
                if (v) return;
                this.removeChoiceItem(this.choiceData.length-1);
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
            // 移除选中的项
            removeChoiceItem(i) {
                const choiceData=this.choiceData;
                if (!choiceData || !choiceData.length) return;
                choiceData.splice(i, 1);
                const ids=choiceData.map(d => d.id);
                this.choiceData=choiceData;
                this.$emit('change', ids);
            },
            /**
             * 设置参数
             * @param str
             * @return {*}
             */
            setAttr(str) {
                const strArr=str.split('/');
                return strArr.pop();
            },
            /**
             * 提交当前选择的值
             * @param selected 被选中的项
             * @param unselect 被取消的项
             */
            optionClick(selected, unselect) {
                let choiceData=[];
                if (selected && selected.id) {
                    const data=JSON.parse(JSON.stringify(selected));
                    const id=this.setAttr(data.id);
                    const n=data.name.replace(/<[^<>]+>/g, '');
                    const name=this.setAttr(n);
                    const cdNow={id, name};

                    choiceData=Array.from(new Set([...this.choiceData, cdNow]));
                } else {
                    const unId=unselect.id;
                    choiceData=this.choiceData.filter(d => d.id !== unId);
                }
                this.choiceData=choiceData;

                const ids=choiceData.map(d => d.id);
                this.$emit('change', ids);
            }
        }
    }
</script>

<style lang="stylus">
</style>