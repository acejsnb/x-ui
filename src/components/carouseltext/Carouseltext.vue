<template>
    <div class="p-carousel" @mouseenter="stopTimer" @mouseleave="setTimer">
        <i class="p-carousel-icon"><MessageSvg /></i>
        <div class="p-carousel-msg">
            <transition-group name="slideUp">
                <section
                        v-show="num === i"
                        class="p-carousel-item"
                        v-for="(item, i) in data"
                        :key="item.id"
                        @click="itemClick(item.id)"
                >{{item.text}}</section>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import MessageSvg from '../static/iconSvg/message.svg';
    export default {
        name: "CarouselText",
        components: { MessageSvg },
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
        width 100%
        .p-carousel-icon
            margin-right 8px
            svg
                vertical-align middle
        .p-carousel-msg
            width 100%
            height 24px
            overflow hidden
            .p-carousel-item
                max-width 204px
                height @height
                line-height @height
                font-size 14px
                color $grey-grey-600
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                cursor pointer

</style>