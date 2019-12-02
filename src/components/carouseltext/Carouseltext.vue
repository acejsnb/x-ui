<template>
    <div class="p-carousel" @mouseenter="stopTimer" @mouseleave="setTimer">
        <transition-group name="slideUp">
            <div class="p-carousel-msg"
                 v-show="num === i"
                 v-for="(item, i) in data"
                 :key="item.id"
                 @click="itemClick(item.id)"
                 :title="item.text"
            >
                <i class="p-carousel-icon">
                    <CommissionSvg v-if="num === 0" />
                    <ExecutorySvg v-if="num === 1" />
                    <PendingSvg v-if="num === 2" />
                </i>
                <section class="p-carousel-item">{{item.text}}</section>
            </div>
        </transition-group>
    </div>
</template>

<script>
    import CommissionSvg from '../static/iconSvg/commission.svg';
    import ExecutorySvg from '../static/iconSvg/executory.svg';
    import PendingSvg from '../static/iconSvg/pending.svg';

    export default {
        name: "CarouselText",
        components: { CommissionSvg, ExecutorySvg, PendingSvg },
        props: {
            /**
             * 文字轮播列表
             */
            data: {
                type: Array,
                default: []
            },
            /**
             * 定时器时间,单位s（秒）
             */
            time: {
                type: Number,
                default: 3
            }
        },
        data() {
            return {
                num: 0
            }
        },
        mounted() {
            this.setTimer();
        },
        methods: {
            setTimer() {
                this.timer=window.setInterval(() => {
                    if (this.num < this.data.length-1) this.num++;
                    else this.num=0;
                }, this.time*1000)
            },
            stopTimer() {
                window.clearInterval(this.timer);
                this.num=0;
            },
            /**
             * 点击某项执行的函数
             * @param id
             */
            itemClick(id) {
                this.$emit('click', id)
            }
        },
        beforeDestroy() {
            this.stopTimer();
        }
    }
</script>

<style lang="stylus">

    @import "../static/stylus/animate/slideUp.styl"

    .p-carousel
        display flex
        align-items center
        justify-content flex-end
        width 100%
        height 24px
        overflow hidden
        .p-carousel-msg
            display flex
            align-items center
            justify-content flex-end
            width 100%
            height @height
            .p-carousel-icon
                margin-right 8px
                padding-top 4px
                background-color $red-400
                border-radius 11px
                width 22px
                height @width
                text-align center
                svg
                    vertical-align middle
            .p-carousel-item
                max-width calc(100% - 30px)
                height @height
                line-height @height
                font-size 14px
                color $grey-600
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                cursor pointer

</style>