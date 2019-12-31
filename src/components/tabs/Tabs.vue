<template>
    <div class="p-tabs" ref="pTabs">
        <section
                :class="['p-tab-item', value===tab.id&&'p-tab-active']"
                v-for="tab in data"
                :key="tab.id"
                @click="tabClick($event, tab.id)"
        >
            <span>{{tab.name}}</span>
        </section>
        <section class="p-tabs-line" :style="{left: left+'px', width: lineWidth+'px'}"/>
    </div>
</template>

<script>
    export default {
        name: "Tabs",
        props: {
            /**
             * 标签页id
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * 标签页数据
             */
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                lineWidth: 0, // 线条宽度
                left: 0 // 线条距离左边位置
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.countWidth(0)
            })
        },
        methods: {
            tabClick(e, id) {
                const ind=this.data.findIndex(d => d.id===id);
                this.lineWidth=e.currentTarget.scrollWidth;
                this.countWidth(ind);
                /**
                 * 提交绑定的值
                 */
                this.$emit('input', id);
            },
            countWidth(ind) {
                if (ind) {
                    const items=this.$refs.pTabs.getElementsByClassName('p-tab-item');
                    let w=0;
                    for (let i=0; i< ind; i++) {
                        w+=items[i].scrollWidth;
                    }
                    this.left=w+(ind*16);
                } else {
                    this.lineWidth=this.$refs.pTabs.firstElementChild.scrollWidth;
                    this.left=0;
                }
            }
        }
    }
</script>

<style lang="stylus">
    .p-tabs
        position relative
        display inline-block
        text-align center
        .p-tab-item
            display inline-block
            padding 12px 16px
            height 48px
            line-height 24px
            font-size 16px
            color $grey-900
            cursor pointer
            transition color .3s
            &+.p-tab-item
                margin-left 16px
            &:hover
                color $blue-500
            span
                display ruby
                font-size 16px
                line-height 24px
        .p-tab-active
            color $blue-500
        .p-tabs-line
            position absolute
            bottom 0
            background $blue-500
            width 100%
            height 2px
            transition left .2s ease-out

</style>