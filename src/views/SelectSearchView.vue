<template>
    <div style="padding: 16px">
        <SelectSearch
                width="240"
                v-model="selectId"
                :data="selectData"
        />
    </div>
</template>

<script>
    const selectData=[
        {id: '100', name: '乔峰'},
        {id: '200', name: '阿三2'},
        {id: '300', name: '段誉3'},
        {id: '400', name: '阿紫4'},
        {id: '500', name: '洪七公5'},
        {id: '600', name: '慕容复6'},
    ];
    export default {
        name: "SelectSearchView",
        data() {
            return {
                selectId: '',
                selectData
            }
        },
        watch: {
            selectId(n) {
                console.log('选中的项：', n);
            }
        }
    }
</script>

<style scoped>

</style>