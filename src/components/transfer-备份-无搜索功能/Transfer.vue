<template>
    <div class="p-transfer">
        <div class="p-transfer-main">
            <div class="p-transfer-main-child p-transfer-left">
                <section class="p-transfer-left-input">
                    <Input iconType="search" placeholder="搜索" />
                </section>
                <section class="p-transfer-left-content">
                    <Tree
                            :multiple="true"
                            :linkage="linkage"
                            :lastStage="lastStage"
                            :data="mulData"
                            @change="treeChange"
                    />
                </section>
            </div>
            <div class="p-transfer-main-child p-transfer-right">
                <section :class="['p-transfer-right-title', shadowShow&&'p-transfer-right-title-border']">已选择</section>
                <section class="p-transfer-selected">
                    <article class="p-transfer-selected-item" v-for="(sd, i) in selectedData" :key="'sd-'+sd.id">
                        <span @mouseenter="itemEnter">{{sd.name}}</span>
                        <IconClear @click="removeItem(i)" />
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

    export default {
        name: "Transfer",
        components: {
            Input, Tree, Button,
            IconClear
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            linkage: {
                type: Boolean,
                default: true
            },
            lastStage: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                selectedData: [] // 选中的数据
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
        methods: {
            // 鼠标hover
            itemEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 选择的项
            treeChange({id, checkedIds, obj}) {
                console.log('选择的项::::', id, checkedIds, obj);
                if (this.linkage) {
                    // 联动
                    const arr=[];
                    this.setSelectedData(arr, this.mulData);
                    this.selectedData=arr;
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
                })
            },
            /**
             * 移除选中项
             * @param i 索引
             */
            removeItem(i) {
                const data=this.selectedData.splice(i, 1);
                const id=data[0].id;
                this.mulData=this.removeChecked(id, this.mulData);
            },
            /**
             * 取消树形结构选中的项
             * @param id 需要取消选中的id
             * @param mulData 数据
             * @return {*}
             */
            removeChecked(id, mulData) {
                return mulData.map(d => {
                    if (d.id === id) {
                        d.checked='uncheck';
                    } else {
                        if (d.children && d.children.length) this.removeChecked(id, d.children);
                    }
                    return d;
                });
            },
            // 设置树形结构全部取消选中
            setMulDataUncheck(data) {
                return data.map(d => {
                    d.checked='uncheck';
                    if (d.children && d.children.length) d.children=this.setMulDataUncheck(d.children);
                    return d;
                })
            },
            // 点击取消
            handleCancel() {
                this.mulData=this.setMulDataUncheck(this.mulData);
                this.selectedData=[];
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
        box-shadow 0 20px 30px 0 rgba(31,35,41,.15)
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
        .p-transfer-right
            .p-transfer-right-title
                padding-bottom 4px
                border-bottom 1px solid transparent
                line-height 22px
                color $grey-500
                font-size 14px
                &.p-transfer-right-title-border
                    border-bottom-color $grey-200
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