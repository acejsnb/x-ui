### 示例
```vue
<template>
    <div>
        <Carouseltext :data="carData" :time="5" @click="handleCarousel" />
    </div>
</template>

<script>
    export default {
        name: "CarouseltextView",
        data() {
            return {
                carData: [
                    {id: '111', text: '新中国成立70周年庆祝活动总结会议在京举行'},
                    {id: '222', text: '习近平出访两邻国 看点亮点都在这'},
                    {id: '333', text: '金正恩骑白马登上白头山 俯瞰山峦'},
                ]
            }
        },
        methods: {
            handleCarousel(id) {
                console.log('********handleCarousel:::', id);
            }
        }
    }
</script>

```