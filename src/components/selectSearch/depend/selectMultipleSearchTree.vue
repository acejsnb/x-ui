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
        <transition name="slideDownUp">
            <div class="p-select-drop-down-box" v-show="dropDownShow">
                <div class="p-select-drop-down-not" v-if="notFound">Not found</div>
                <div class="p-select-drop-down-tree" v-show="!notFound">
                    <SelectOptionMultiple
                            v-show="inputValue"
                            ref="selectOption"
                            :selectedIds="selectedIds"
                            :data="searchData"
                            @change="optionClick"
                    />
                    <Tree
                            v-show="!inputValue"
                            :multiple="true"
                            :linkage="linkage"
                            :data="treeData"
                            @change="optionClickTree"
                    />
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import IconCloseSvg from '../../static/iconSvg/icon_close.svg';
    import TriangleSvg from '../../static/iconSvg/triangle.svg';
    import SelectOptionMultiple from './selectOptionMultiple';
    import Tree from '../../tree';

    import {FilterTool, PackageTool, TileTool, Unique} from '../../static/utils/TileTool';

    export default {
        name: "selectMultipleSearchTree",
        components: { IconCloseSvg, TriangleSvg, SelectOptionMultiple, Tree },
        props: {
            // 联动
            linkage: {
                type: Boolean,
                default: true
            },
            // 收纳
            accept: {
                type: Boolean,
                default: true
            },
            // 选中项的id
            selectedIds: {
                type: Array,
                default: []
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
                // 平铺的数据
                tileData: [],
                // 树形结构数据
                treeData: [],
                // 搜索的数据
                searchData: [],
                // 选中的数据
                choiceData: [],
                // 激活关闭
                closeDrop: false,
                // 搜索无内容
                notFound: false
            }
        },
        computed: {
            // 选择的项是否显示更多
            moreChoiceCount() {
                return this.choiceData.length-5;
            }
        },
        watch: {
            // 监听文字输入
            inputValue(n, o) {
                if (n === o) return;
                this.notFound=this.searchData.length===0;
                if (n) {
                    this.setInputWidth(n, this.$refs.inputField);
                } else {
                    this.inputWidth=10;
                }
            },
            // 监听数据改变
            data(n, o) {
                if (n === o) return;
                this.setData(n);
            }
        },
        created() {
            this.setData(this.data);
        },
        methods: {
            // 初始化数据
            setData(data) {
                const d=JSON.parse(JSON.stringify(data));
                const tileData=TileTool([], d, '-1');
                this.tileData=tileData;
                this.treeData=PackageTool(tileData);
                this.notFound=this.treeData.length===0;
            },
            // 点击p-select-search-box使输入框获取焦点
            searchBoxClick() {
                if (this.disabled) return;
                this.$refs.inputField.focus();
                if (this.dropDownShow) return;
                this.dropDownShow=true;
                if (this.pleaseSelect!=='Please select') this.searchPlaceHolder=false;

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
                else this.searchData=this.data,this.notFound=false;
            },
            /**
             * 筛选搜索的收据
             * @param v 搜索框输入的值
             */
            filterSelect(v) {
                const tileData=JSON.parse(JSON.stringify(this.tileData)); // 平铺树形结构

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
            // 设置选中的数据
            setDataNow(id) {
                this.dropDownShow=false;
                this.inputValue='';
                this.searchPlaceHolder=true;
                this.fieldStatus=true;
                this.pleaseSelect=this.setChoiceName(id);
            },
            /**
             * 通过子项id查找父项id-筛选出子集id
             * @param result 结果id
             * @param tileData 平铺的数据
             * @param id 子项id
             */
            getIdByParentId(result, tileData, id) {
                tileData.forEach(d => {
                    if (d.id === id) {
                        result.push(d.parentId);
                    }
                });
            },
            /**
             * 通过子父项id查找子项id
             * @param result 结果id
             * @param tileData 平铺的数据
             * @param id 子项id
             */
            getParentIdById(result, tileData, id) {
                tileData.forEach(d => {
                    if (d.parentId === id) {
                        result.push(d.id);
                        this.getParentIdById(result, tileData, d.id);
                    }
                });
            },
            /**
             * 通过id查找id-筛选出子集id
             * @param result 结果数据id
             * @param tileData 平铺的数据
             * @param id 父项id
             */
            getIdById(result, tileData, id) {
                tileData.forEach(d => {
                    if (d.parentId === id) {
                        result.push(d.id);
                        this.getIdById(result, tileData, d.id);
                    }
                    if (d.id) result.push(d.parentId);
                });
            },
            /**
             * 通过父项id查找子项id-筛选出子集id
             * @param result 结果数据
             * @param tileData 平铺的数据
             * @param id 父项id
             */
            getItemById(result, tileData, id) {
                tileData.forEach(d => {
                    if (d.parentId === id) {
                        result.push({id: d.id, name: d.name});
                        this.getItemById(result, tileData, d.id);
                    }
                });
            },
            // 移除选中的项
            removeChoiceItem(i) {
                const cd=this.choiceData;
                if (!cd || !cd.length) return;
                // 扁平化数据
                const tileData=TileTool([], this.treeData, '-1');
                const cData=this.choiceData;
                const delId=cData.splice(i, 1)[0].id; // 被删除的id
                const fIds=[]; // 筛选出需要删除的id

                if (this.linkage) this.getIdById(fIds, tileData, delId);

                const choiceData=cData.filter(d => !fIds.includes(d.id));
                const ids=choiceData.map(d => d.id);

                this.choiceData=choiceData;
                this.setTreeDataChecked(tileData, ids);

                this.$emit('change', ids);
            },
            /**
             * 多选修改状态
             * @param data
             * @return {string}
             */
            changeStatus(data) {
                let checked='';
                if (data.every(d => d.checked==='checked')) {
                    checked = 'checked';
                } else if (data.every(d => d.checked==='uncheck')) {
                    checked = 'uncheck';
                } else {
                    checked = 'notNull';
                }

                return checked;
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
             * 设置树形结构被选中
             * @param tileData 树形结构数据
             * @param selIds 选中的id
             */
            setTreeDataChecked(tileData, selIds) {
                tileData.forEach(d => {
                    if (selIds.includes(d.id)) {
                        d.checked='checked';
                    } else {
                        d.checked='uncheck';
                    }
                });

                // 树形结构上下级联动
                if (this.linkage) {
                    let sel=[]; // 查找父级id
                    selIds.forEach(d => {
                        let arr=[d];
                        this.getParentItemById(arr, tileData, d);
                        sel.push(arr)
                    });

                    // 查找选中项的父级项，并设置父级项的选中状态
                    for (let i=sel.length; i>=0; i--) {
                        let seli=sel[i];
                        if (seli && seli.length) {
                            for (let j=seli.length; j>=0; j--) {
                                let arr=tileData.filter(d => d.parentId===seli[j]); // 得到选中项
                                if (arr && arr.length) {
                                    tileData.forEach(d => {
                                        if (d.id === arr[0].parentId) d.checked=this.changeStatus(arr);
                                    });
                                }
                            }
                        }
                    }
                }

                this.treeData=PackageTool(tileData);
            },
            /**
             * 通过子项id查找父项数据
             * @param result 查找结果
             * @param tile 平铺的数据
             * @param id 当前子项id
             */
            getParentItemById(result, tile, id) {
                tile.forEach(d => {
                    if (d.id === id){
                        result.unshift(d.parentId);
                        this.getParentItemById(result, tile, d.parentId);
                    }
                });
            },
            /**
             * 提交当前选择的值
             * @param selected 被选中的项
             * @param unselect 被取消的项
             */
            optionClick(selected, unselect) {
                let choiceData=[], cd=[];
                if (selected && selected.id) {
                    // 选中的tag
                    const d=JSON.parse(JSON.stringify(selected));
                    const id=this.setAttr(d.id);
                    const n=d.name.replace(/<[^<>]+>/g, '');
                    const name=this.setAttr(n);
                    const sd = {id, name};
                    cd=Unique([...this.choiceData, sd]);
                } else {
                    const d=JSON.parse(JSON.stringify(unselect));
                    const unId=this.setAttr(d.id);
                    const unIds=[unId];
                    if (this.linkage) this.getParentIdById(unIds, this.tileData, unId);
                    cd=this.choiceData.filter(d => !unIds.includes(d.id));
                }

                if (this.linkage) {
                    let result=[];
                    cd.forEach(d => {
                        this.getItemById(result, this.tileData, d.id);
                    });

                    choiceData=Unique([...cd, ...result]);
                } else {
                    choiceData=cd;
                }

                this.choiceData=choiceData;
                const ids=choiceData.map(d => d.id);
                const tileData=TileTool([], this.treeData, '-1');
                this.setTreeDataChecked(tileData, ids);

                this.$emit('change', ids);
            },
            // 提交当前选择的值
            optionClickTree(selectedData) {
                // { 当前改变的id, 选择的id组, 选择的当前对象, 选择的对象组 }
                const {id, checkedIds, obj, checkedObj}=selectedData;
                let choiceData=[];
                if (checkedObj && checkedObj.length) {
                    const data=JSON.parse(JSON.stringify(checkedObj));
                    choiceData=data.map(d => {
                        const id=this.setAttr(d.id);
                        const n=d.name.replace(/<[^<>]+>/g, '');
                        const name=this.setAttr(n);
                        return {id, name, parentId: d.parentId};
                    });
                }
                this.choiceData=choiceData;

                this.$emit('change', checkedIds);
            }
        }
    }
</script>

<style lang="stylus">
</style>