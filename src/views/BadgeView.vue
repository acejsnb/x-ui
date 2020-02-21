<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Badge组件</h1>
            <Badge>
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :content="countNum">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :content="10" bgColor="#4eb1fd">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :content="100">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :content="'New'">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :content="'Hot'">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge dot>
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge dot>
                <Button type="primary">按钮</Button>
            </Badge>
            <Badge :content="25">
                <Button type="default">按钮1</Button>
            </Badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BadgeView",
        data() {
            return {
                countNum: 9
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            setCountNum() {
                clearInterval(this.timer);
                this.countNum=0;
                this.timer=setInterval(() => {
                    if (this.countNum<111) this.countNum+=parseInt(10*Math.random());
                    else this.setCountNum();
                }, 3000)
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .avatar
        display inline-block
        vertical-align middle
        img
            width 28px
            height @width

</style>
