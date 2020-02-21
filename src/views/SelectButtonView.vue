<template>
    <div class="selectedButton">
        <SelectButton
                ref="selectButton"
                title="已选设备"
                unit="个"
                placeholder="添加设备"
                :triangle="triangle"
                :data="selectedData"
                tipPlace="right"
                @changeTriangle="changeTriangle"
        />
        <!--
            tipPlace:
                top、bottom、left、right
        -->
    </div>
</template>

<script>
    const selectedData=[
        // {"id":"100","name":"乔峰"},{"id":"200","name":"阿三2"},{"id":"300","name":"段誉3"},{"id":"400","name":"阿紫4"},
        // {"id":"100","name":"乔峰"},{"id":"200","name":"阿三2"},{"id":"300","name":"段誉3"},{"id":"400","name":"阿紫4"},
        // {"id":"100","name":"乔峰"},{"id":"200","name":"阿三2"},{"id":"300","name":"段誉3"},{"id":"400","name":"阿紫4"},
        // {"id":"100","name":"乔峰"},{"id":"200","name":"阿三2"},{"id":"300","name":"段誉3"},{"id":"400","name":"阿紫4"},
        ];
    export default {
        name: "SelectButtonView",
        data() {
            return {
                selectedData: selectedData,
                triangle: false
            }
        },
        mounted() {
        },
        methods: {
            changeTriangle(v) {
                this.triangle=v;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.selectedButton
    padding 400px

</style>
