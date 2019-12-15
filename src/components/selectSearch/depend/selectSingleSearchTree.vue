<template>
    <div class="p-select-search" :style="{width: width+'px'}">
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
                <!--
                @blur="inputBlur"
                -->
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
        <transition name="slideDownUp">
            <div class="p-select-drop-down-box" v-show="dropDownShow">
                <div class="p-select-drop-down-not" v-show="notFound">Not found</div>
                <div class="p-select-drop-down-tree" v-show="!notFound">
                    <SelectOption
                            v-show="inputValue"
                            :selectedId="selectedId"
                            :data="searchData"
                            @click="optionClick"
                    />
                    <Tree
                            v-show="!inputValue"
                            :data="treeData"
                            @change="optionTreeClick"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import IconCloseSvg from '../../static/iconSvg/icon_close.svg';
    import TriangleSvg from '../../static/iconSvg/triangle.svg';
    import SelectOption from '../../selectOption/SelectOption';
    import Tree from '../../tree';

    import {FilterTool, PackageTool, TileTool} from '../../static/utils/TreeTool';

    export default {
        name: "selectSingleSearchTree",
        components: { IconCloseSvg, TriangleSvg, SelectOption, Tree },
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
                default: []
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
                // 树形结构数据
                treeData: [],
                // 搜索的数据
                searchData: [],
                // 搜索无内容
                notFound: false
            }
        },
        watch: {
            // 监听文字输入
            inputValue(n, o) {
                if (n === o) return;
                this.notFound=this.treeData.length===0;
                if (n) {
                    this.setInputWidth(n, this.$refs.inputField);
                } else {
                    this.inputWidth=10;
                }
            }
        },
        created() {
            // 设置option数据
            this.treeData=this.data;
            this.notFound=this.treeData.length===0;
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

            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             * @param dom dom对象
             */
            setInputWidth(v, dom) {
                if (v) {
                    this.fieldStatus=false;
                    const { scrollWidth }=dom;
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
                else this.treeData=this.data,this.notFound=false;
            },
            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             */
            filterSelect(v) {
                const data=JSON.parse(JSON.stringify(this.data));
                const tileData=TileTool([], data, '-1'); // 平铺树形结构

                const re=new RegExp(v, 'g');
                // 筛选出包涵有搜索字符的数据
                const fData=tileData.filter(d => {
                    if (d.name.includes(v)) {
                        d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                        return d;
                    }
                });
                // 得到筛选后的数据 一维数据列表
                const tData=FilterTool([], tileData, fData);
                this.searchData=tData;
                this.notFound=tData.length===0;
            },
            // 关闭选择框
            inputBlur() {
                this.boxFocus=false;
                setTimeout(() => {
                    if (!this.dropDownShow) return;
                    this.dropDownShow=false;
                    this.searchPlaceHolder=true;
                }, 0);
            },
            /**
             * 设置选中的数据
             * @param name 当前选中的name
             * @param time 延迟时间
             */
            setDataNow(name, time=0) {
                this.dropDownShow=false;
                this.searchPlaceHolder=true;
                this.fieldStatus=true;
                this.pleaseSelect=name;
                setTimeout(() => this.inputValue='', time);
            },
            /**
             * 设置树形结构被选中
             * @param arrTree 树形结构数据
             * @param idArr 返回的id组 格式id000/id111/id2222
             * @param id 当前应该被选中的di
             */
            setTreeDataChecked(arrTree, idArr, id) {
                idArr.pop();
                const tileData=TileTool([], arrTree, '-1').map(d => {
                    //else if (idArr.includes(d.id)) d.checked='notNull';
                    if (d.id === id) d.checked='checked';
                    else d.checked='uncheck';
                    return d;
                });
                this.treeData=PackageTool(tileData);
            },
            /**
             * 提交当前选择的值
             * @param idStr 返回的id组 格式id000/id111/id2222
             */
            optionClick(idStr) {
                const idArr=idStr.split('/');
                const id=idArr[idArr.length-1];

                const nameArr=this.searchData.find(d => d.id===idStr).name.replace(/<[^<>]+>/g, '').split('/');
                const name=nameArr[nameArr.length-1];

                this.setDataNow(name, 300);
                this.setTreeDataChecked(this.data, idArr, id);
                this.$emit('change', id);
            },
            /**
             * 提交当前选择的值
             * @param obj 返回的选中的对象
             */
            optionTreeClick(obj) {
                const { id, name }=obj;
                this.setDataNow(name.replace(/<[^<>]+>/g, ''));

                this.$emit('change', id);
            }
        }
    }
</script>

<style lang="stylus">
</style>