<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Badge组件</h1>
            <Badge>
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :count="9">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :count="10" bgColor="#4eb1fd">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :count="100">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :count="'New'">
                <span class="avatar">
                    <img src="http://upload.jianshu.io/users/upload_avatars/11576163/f8c67791-cf2f-42ef-86dc-68a974830f8f.png?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120" alt="">
                </span>
            </Badge>
            <Badge :count="'Hot'">
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
            <Badge :count="25">
                <Button type="default">按钮1</Button>
            </Badge>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BadgeView"
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
