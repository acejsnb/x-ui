<template>
    <div class="p-transfer">
        <div class="p-transfer-main">
            <div class="p-transfer-main-child p-transfer-left">
                <section class="p-transfer-left-input">
                    <Input iconType="search" placeholder="搜索" v-model="inputVal" />
                </section>
                <section class="p-transfer-left-content" v-show="!inputVal">
                    <!--树形结构数据-->
                    <Tree
                            v-if="flat==='mt'"
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :data="mulData"
                            @change="treeChange"
                    />
                    <!--一维多选列表-->
                    <SelectOptionMultiple
                            v-else
                            :data="mulData"
                            @change="optionChange"
                    />
                </section>
                <section class="p-transfer-left-content" v-show="inputVal">
                    <!--搜索数据列表-->
                    <SelectOptionMultiple
                            v-if="notFound"
                            :data="searchData"
                            @change="optionSearchChange"
                    />
                    <div class="p-transfer-left-content-none" v-else>Not found</div>
                </section>
            </div>
            <div class="p-transfer-main-child p-transfer-right">
                <section :class="['p-transfer-right-title', shadowShow&&'p-transfer-right-title-border']">
                    <article class="p-transfer-right-title-text">已选择</article>
                    <article class="p-transfer-right-clear">清空</article>
                </section>
                <section class="p-transfer-selected">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <span @mouseenter="itemEnter">{{sd.name}}</span>
                        <IconClear @click="removeItem(i, sd.id)" />
                    </article>
                </section>
                <section :class="['p-transfer-btn', shadowShow&&'p-transfer-btn-shadow']">
                    <Button type="default" size="small" @click="handleCancel">取消</Button>
                    <Button :type="setConfirmBtnType" size="small" @click="handleConfirm">确定</Button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import Input from '../input';
    import Tree from '../tree';
    import Button from '../button';
    import IconClear from '../static/iconSvg/clear2.svg';
    import SelectOptionMultiple from '../selectOptionMultiple/SelectOptionMultiple';
    import { TileTool, FilterTool, ChangeStatus, GetParentIdById } from '../static/utils/TreeTool';

    export default {
        name: "Transfer",
        components: {
            Input, Tree, Button,
            IconClear,
            SelectOptionMultiple
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            // 上下级联动
            linkage: {
                type: Boolean,
                default: true
            },
            // 只能选择末级
            lastStage: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                inputVal: '', // 输入的值
                selectedData: [], // 选中的数据
                searchData: [], // 搜索出的数据
            }
        },
        computed: {
            /*
            *   mt-多选树形结构
            *   mn-多选一维结构
            */
            flat() {
                const tree=this.data.some(item => item.children && item.children.length); // 判断数组是一维还是多维 返回true表示多维
                if (tree) return 'mt';
                else return 'mn'
            },
            // 是否显示空状态
            notFound() {
                return this.searchData.length
            },
            // 树形结构数据
            mulData: {
                get() {
                    return this.data;
                },
                set(newData) {
                    return newData;
                }
            },
            // 设置按钮区是否显示投影
            shadowShow() {
                return this.selectedData.length > 8
            },
            // 确定按钮状态
            setConfirmBtnType() {
                return this.selectedData.length ? 'primary' : 'disabled'
            }
        },
        watch: {
            // 监听搜索框输入的内容
            inputVal(n, o) {
                if (n === o) return;
                if (n) {
                    this.setSearchData(n);
                } else {
                    this.searchData=[];
                }
            }
        },
        methods: {
            // 鼠标hover
            itemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择的项
            treeChange({id, checkedIds, obj}) {
                // console.log('选择的项::::', id, checkedIds, obj);
                if (this.linkage) {
                    // 联动
                    this.selectedData=this.setSelectedData([], this.mulData);
                } else {
                    // 不联动
                    /**
                     * lastStage为true表示只能选择末级，处理方式与不联动一样
                     */
                    const { checked, name }=obj;
                    if (checked === 'checked') {
                        this.selectedData.push({id, name})
                    } else {
                        this.selectedData=this.selectedData.filter(d => d.id !== id)
                    }
                }
            },
            /**
             * 联动-设置选中的数据
             * @param data 接收的结果
             * @param tree 遍历列表
             */
            setSelectedData(data, tree) {
                tree.forEach(d => {
                    if (d.checked==='checked') {
                        data.push({id: d.id, name: d.name});
                    }
                    if (d.children && d.children.length) this.setSelectedData(data, d.children);
                });

                return data;
            },
            /**
             * 移除选中项
             * @param i 索引
             * @param id id
             */
            removeItem(i, id) {
                this.selectedData.splice(i, 1);
                this.mulData=this.removeChecked(id, this.mulData);
                // 取消搜索的数据被选中
                const sd=this.searchData;
                if (sd && sd.length) {
                    if (this.flat === 'mt') {
                        this.searchData=this.removeSearchDataChecked(id, 'lId', sd);
                    } else {
                        this.searchData=this.removeSearchDataChecked(id, 'id', sd);
                    }
                }
            },
            /**
             * 取消树形结构选中的项
             * @param id 需要取消选中的id
             * @param mulData 数据
             * @return {*}
             */
            removeChecked(id, mulData) {
                if (this.flat === 'mt') {
                    if (this.linkage) {
                        /* 上下级联动 */
                        return this.linkageSetUpperAndLowerStatus(mulData, id, 'uncheck');
                    } else {
                        // 上下级不联动
                        return mulData.map(d => {
                            if (d.id === id) {
                                d.checked='uncheck';
                            } else {
                                if (d.children && d.children.length) this.removeChecked(id, d.children);
                            }
                            return d;
                        });
                    }
                } else {
                    return mulData.map(d => {
                        if (d.id === id) d.selected=false;
                        return d;
                    });
                }
            },
            /**
             * 联动-设置上下级状态
             * @param mulData 需要遍历的数据
             * @param id 当前被移除选中的id
             * @param cStatus 需要设置的子集状态
             */
            linkageSetUpperAndLowerStatus(mulData, id, cStatus) {
                const tileData=TileTool([], JSON.parse(JSON.stringify(mulData)), '-1');
                // 通过子级id查找父级数据
                const parentIds=GetParentIdById([], id, tileData);

                // 设置子项取消选中
                const data=this.recursionMulData(mulData, id, cStatus);
                // 接收父级数据
                const pArr=this.getParentData([], data, parentIds);
                // 设置父级checked状态
                pArr.forEach(d => {
                    if (d.children && d.children.length) {
                        d.checked=ChangeStatus(d.children);
                    }
                });
                // 设置选中的数据
                this.selectedData=this.setSelectedData([], data);
                return data;
            },
            /**
             * 不联动-设置上下级状态
             * @param mulData 需要遍历的数据
             * @param id 当前被移除选中的id
             * @param cStatus 需要设置的子集状态
             */
            notLinkageSetUpperAndLowerStatus(mulData, id, cStatus) {
                return mulData.map(d => {
                    if (d.id === id) {
                        d.checked=cStatus;
                    } else {
                        if (d.children && d.children.length) d.children=this.notLinkageSetUpperAndLowerStatus(d.children, id, cStatus);
                    }
                    return d;
                });
            },
            /**
             * 联动-设置子项取消选中
             * @param data 需要遍历的数据
             * @param id 当前被移除选中的id
             * @param cStatus 需要设置的子集状态
             */
            recursionMulData(data, id, cStatus) {
                return data.map(d => {
                    if (d.id === id) {
                        // 设置当前id的子级选中状态
                        d.checked=cStatus;
                        if (d.children && d.children.length) d.children=this.removeChildChecked(d.children, cStatus);
                    } else {
                        if (d.children && d.children.length) d.children=this.recursionMulData(d.children, id, cStatus);
                    }
                    return d;
                });
            },
            /**
             * 联动-查找父级数据
             * @param pArr 接收找到的数据
             * @param data 需要遍历的数据
             * @param pIds 父级id组
             */
            getParentData(pArr, data, pIds) {
                data.forEach(d => {
                    if (pIds.includes(d.id)) {
                        pArr.unshift(d);
                        if (d.children && d.children.length) this.getParentData(pArr, d.children, pIds);
                    }
                });

                return pArr;
            },
            /**
             * 联动-设置子项取消选中
             * @param data 需要遍历的数据
             * @param cStatus 需要设置的子集状态
             */
            removeChildChecked(data, cStatus) {
                return data.map(d => {
                    d.checked=cStatus;
                    if (d.children && d.children.length) this.removeChildChecked(d.children, cStatus);
                    return d;
                })
            },
            /**
             * 设置搜索数据取消选中
             * @param id 需要取消选中的id
             * @param flag 需要取消选中的id的key
             * @param data 需要遍历的数据
             */
            removeSearchDataChecked(id, flag, data) {
                return data.map(d => {
                    if (d[flag] === id) d.selected=false;
                    return d;
                })
            },
            // 设置树形结构全部取消选中
            setMulDataUncheck(data) {
                return data.map(d => {
                    d.checked='uncheck';
                    if (d.children && d.children.length) d.children=this.setMulDataUncheck(d.children);
                    return d;
                })
            },
            // 设置一维结构全部取消选中
            setMulDataUnSelected(data) {
                return data.map(d => {
                    d.selected=false;
                    return d;
                })
            },
            /**
             * 一维多选列表
             * @param selected 被选中的项
             * @param unselect 被取消的项
             * @param cb 当取新增/消选中时，执行的回调
             */
            optionChange(selected, unselect, cb) {
                if (selected && selected.selected) {
                    // 增加选中项
                    const {id, name}=selected;
                    const n=name.replace(/<[^<>]+>/g, '');
                    this.selectedData.push({id, name: n});
                    if (cb) cb(id, true);
                } else {
                    // 减少选中项
                    const {id}=unselect;
                    this.selectedData=this.selectedData.filter(d => d.id !== id);
                    if (cb) cb(id, false);
                }
            },
            /**
             * 搜索列表
             * @param selected 被选中的项
             * @param unselect 被取消的项
             */
            optionSearchChange(selected, unselect) {
                // console.log('搜索列表:::', selected, unselect);
                if (this.flat === 'mt') {
                    let cStatus='', id='';
                    if (selected && selected.selected) {
                        cStatus='checked';
                        id=selected.lId;
                    } else {
                        cStatus='uncheck';
                        id=unselect.lId;
                    }
                    if (this.linkage) {
                        /* 上下级联动 */
                        this.mulData=this.linkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
                    } else {
                        /* 上下级不联动/只能选择末级 */
                        const data=this.notLinkageSetUpperAndLowerStatus(this.mulData, id, cStatus);
                        this.selectedData=this.setSelectedData([], data);
                    }
                } else {
                    this.optionChange(selected, unselect, (id, status) => {
                        this.mulData=this.mulData.map(d => {
                            if (d.id === id) d.selected=status;
                            return d;
                        });
                    });
                }
            },
            /**
             * 搜索列表
             * @param v 搜索框输入的值
             */
            setSearchData(v) {
                const md=JSON.parse(JSON.stringify(this.mulData));
                const re=new RegExp(v, 'g');
                if (this.flat === 'mt') {
                    // 得到平铺的数据
                    const tileData=TileTool([], md, '-1');
                    if (this.lastStage) {
                        /* 只能选择末级 */
                        // 筛选出包涵有搜索字符的数据
                        const fData=tileData.filter(d => {
                            const hasChild=tileData.find(fd => fd.parentId===d.id); // 查看是否还有子级
                            if (!hasChild && d.name.includes(v)) {
                                d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                                return d;
                            }
                        });
                        // 得到筛选后的数据 一维数据列表
                        this.searchData=FilterTool([], tileData, fData);

                    } else {
                        /* 上下级联动/上下级不联动 */
                        // 筛选出包涵有搜索字符的数据
                        const fData=tileData.filter(d => {
                            if (d.name.includes(v)) {
                                d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                                return d;
                            }
                        });
                        // 得到筛选后的数据 一维数据列表
                        this.searchData=FilterTool([], tileData, fData);
                    }
                } else {
                    this.searchData=md.filter(d => {
                        if (d.name.includes(v)) {
                            d.name=d.name.replace(re, `<span style="color: #0091ff;font-size: 14px;">${v}</span>`);
                            return d;
                        }
                    })
                }
            },
            // 点击取消
            handleCancel() {
                if (this.flat === 'mt') this.mulData=this.setMulDataUncheck(this.mulData);
                else this.mulData=this.setMulDataUnSelected(this.mulData);

                this.selectedData=[];
                this.searchData=[];
                this.inputVal='';
            },
            // 点击确定
            handleConfirm() {
                const ids=this.selectedData.map(d => d.id);
                this.$emit('confirm', ids);
            }
        }
    }
</script>

<style lang="stylus">

.p-transfer
    display inline-block
    .p-transfer-main
        display inline-flex
        background-color #fff
        border-radius 4px
        box-shadow 0 2px 10px 0 rgba(31,35,41,.1)
        width 600px
        height 480px
        .p-transfer-main-child
            padding 24px 16px
            width 50%
            height 100%
        .p-transfer-left
            border-right 1px solid $grey-200
            .p-transfer-left-input
                margin-bottom 8px
                width 100%
            .p-transfer-left-content
                width 100%
                height 392px
                overflow-y auto
                .p-transfer-left-content-none
                    padding-top 100px
                    width 100%
                    text-align center
                    color #c3c7cb
                    font-size 14px
                    user-select none
        .p-transfer-right
            .p-transfer-right-title
                display flex
                justify-content space-between
                align-items center
                padding-bottom 4px
                border-bottom 1px solid transparent
                line-height 22px
                &.p-transfer-right-title-border
                    border-bottom-color $grey-200
                > article
                    font-size 14px
                .p-transfer-right-title-text
                    color $grey-500
                .p-transfer-right-clear
                    color $blue-500
                    cursor pointer
                    transition color .3s
                    &:active
                        color $blue-600
            .p-transfer-selected
                margin-top 8px
                width 100%
                height 353px
                overflow-y auto
                color $grey-500
                font-size 14px
                .p-transfer-selected-item
                    display inline-flex
                    justify-content space-between
                    align-items center
                    //margin-top 8px
                    padding 5px 16px
                    width 100%
                    height 40px
                    &:hover
                        background-color $grey-200
                    > span
                        display inline-block
                        width calc(100% - 16px)
                        color $grey-900
                        line-height 22px
                        white-space nowrap
                        overflow hidden
                        text-overflow ellipsis
                    > svg
                        cursor pointer
                        path
                            transition fill .3s
                        &:hover
                            path
                                fill $blue-500
            .p-transfer-btn
                position relative
                padding-top 20px
                padding-bottom 20px
                width 100%
                text-align right
                &.p-transfer-btn-shadow
                    box-shadow 0 -2px 10px 0 rgba(31,35,41,.15)
                &::before
                    position absolute
                    top 0
                    left -16px
                    display block
                    background-color #fff
                    width 16px
                    height 100%
                    content ''
                &::after
                    position absolute
                    top 0
                    right -16px
                    display block
                    background-color #fff
                    width 16px
                    height 100%
                    content ''

</style>