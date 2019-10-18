<template>
    <div class="p-carousel" @mouseenter="stopTimer" @mouseleave="setTimer">
        <i class="icon"><MessageSvg /></i>
        <div class="p-carousel-msg">
            <transition-group name="slideUp">
                <section v-show="num === i" class="p-carousel-item" v-for="(item, i) in data" :key="item.id" @click="itemClick(item.id)">{{item.text}}</section>
            </transition-group>
        </div>
    </div>
</template>

<script>
    import MessageSvg from 'icon/message.svg';
    export default {
        name: "Carouseltext",
        components: { MessageSvg },
        props: {
            data: {
                type: Array,
                default: []
            },
            // 定时器时间,单位s（秒）
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
                this.timer=setInterval(() => {
                    if (this.num < this.data.length-1) this.num++;
                    else this.num=0;
                }, this.time*1000)
            },
            stopTimer() {
                clearInterval(this.timer);
                //this.num=0;
            },
            // 点击某项
            itemClick(id) {
                this.$emit('click', id)
            }
        },
        beforeDestroy() {
            this.stopTimer();
        }
    }
</script>

<style lang="stylus" scoped>

@import "~stylus/tools.styl"
@import "~stylus/animate/slideUp.styl"

.p-carousel
    display flex
    align-items center
    width 100%
    .icon
      margin-right 8px
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