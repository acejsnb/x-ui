<template>
    <section class="p-select-option" v-show="data&&data.length">
        <article
                :class="[
                'p-select-option-item',
                item.selected&&'p-select-option-item-selected-multiple',
                ]"
                v-for="item in selectData"
                :key="item.id"
                @click="optionClick(item.id)"
                @mouseenter="optionEnter"
                v-html="item.name"
        ></article>
    </section>
</template>

<script>
    export default {
        name: "SelectOptionMultiple",
        props: {
            /**
             * 绑定的v-model值
             */
            selectedIds: {
                type: Array,
                default: ''
            },
            /**
             * 下拉列表数据
             */
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                // 格式化好的数据
                selectData: []
            }
        },
        watch: {
            selectedIds: {
                handler(n, o) {
                    if (n === o) return;
                    this.setSelectData(this.data, n);
                },
                deep: true
            },
            data: {
                handler(n, o) {
                    if (n === o) return;
                    this.setSelectData(n, this.selectedIds);
                },
                deep: true
            }
        },
        created() {
            this.setSelectData(this.data, this.selectedIds);
        },
        methods: {
            // 设置数据
            setSelectData(data, selectedIds) {
                this.selectData=data.map(d => {
                    if (d.id.includes('/')) {
                        const idArr=d.id.split('/');
                        const id=idArr.pop();
                        d.selected = !!selectedIds.includes(id);
                    } else {
                        d.selected = !!selectedIds.includes(d.id);
                    }
                    return d;
                });
            },
            // 移除摸一个选中的
            removeOption(id) {
                this.selectData=this.selectData.map(d => {
                    if (d.id === id) d.selected=false;
                    return d;
                });
            },
            // 提交当前选择的值
            optionClick(id) {
                let selectedData={}, unselectData={};
                this.selectData=this.selectData.map(d => {
                    if (d.id === id) {
                        d.selected=!d.selected;
                        if (d.selected) selectedData=d;
                        else unselectData=d;
                    }
                    return d;
                });
                this.$emit('change', selectedData, unselectData);
            },
            // 子项鼠标移入
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            }
        }
    }
</script>

<style lang="stylus">

@import "../../static/stylus/select/selectOption.styl"

.p-select-option
    .p-select-option-item
        &.p-select-option-item-selected-multiple
            position relative
            &::after
                position absolute
                top 12px
                right 12px
                display block
                border-left 2px solid $blue-500
                border-bottom 2px solid $blue-500
                width 10px
                height 5px
                content ''
                transform rotate(-45deg)

</style>