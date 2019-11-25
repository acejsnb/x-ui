### Shake

<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tabs组件</h1>
            <Shake :activate="activate">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake activate="New">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake :activate="activateNum">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Button type="primary" @click="handleClick">按钮</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                activate: false,
                activateNum: 25
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            handleClick() {
                this.activate=!this.activate;
            },
            setCountNum() {
                //window.clearInterval(this.timer);
                clearInterval(this.timer);
                this.activateNum=0;
                //this.timer=window.setInterval(() => {
                this.timer=setInterval(() => {
                    //const num=parseInt(10*window.Math.random());
                    const num=parseInt(10*Math.random());
                    if (this.activateNum<111) this.activateNum+=num;
                    else this.setCountNum();
                }, 5000)
            }
        }
    }
</script>

```vue
<template>
    <div class="toggleView">
        <div class="component component-padding">
            <h1>Tabs组件</h1>
            <Shake :activate="activate">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake activate="New">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Shake :activate="activateNum">
                <span style="font-size: 20px;color: red;">抖动</span>
            </Shake>
            <br><br>
            <Button type="primary" @click="handleClick">按钮</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabsView",
        data() {
            return {
                activate: false,
                activateNum: 25
            }
        },
        mounted() {
            this.setCountNum();
        },
        methods: {
            handleClick() {
                this.activate=!this.activate;
            },
            setCountNum() {
                window.clearInterval(this.timer);
                this.activateNum=0;
                this.timer=window.setInterval(() => {
                    const num=parseInt(10*window.Math.random());
                    if (this.activateNum<111) this.activateNum+=num;
                    else this.setCountNum();
                }, 5000)
            }
        }
    }
</script>

```

### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| activate    | 传入的值，用于判断是否抖动，当该值为true时，会一直抖动 | String,Number,Boolean | -- | Yes     |