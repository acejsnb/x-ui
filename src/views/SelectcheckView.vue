<template>
    <div class="component component-padding">
        <h1>Tree组件</h1>
        <div class="treeCom">
            <div>
                <Selectcheck
                        :data="selectData"
                        @change="change"
                />
            </div>
        </div>
        <br><br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    /**
     * @id id String
     *
     * @name name String
     *
     * @checked 参数状态 String
     * uncheck 未选中
     * checked 选中
     * notNull 非空
     *
     */
    const dataArr=[
        {
            id: '1', name: '顶级顶级顶级顶级顶级顶级顶级顶级顶级', checked: 'uncheck',
            children: [
                {id: '21', name: '二级1', checked: 'uncheck'},
                {id: '23', name: '二级3', checked: 'uncheck'}
            ]
        },
        {
            id: '12', name: '顶级', checked: 'uncheck',
            children: [
                {id: '121', name: '二级1', checked: 'uncheck'},
                {id: '122', name: '二级3', checked: 'uncheck'}
            ]
        },
        {
            id: '123', name: '顶级', checked: 'uncheck',
            children: [
                {id: '1231', name: '二级1', checked: 'uncheck'},
                {id: '1232', name: '二级3', checked: 'uncheck'}
            ]
        }
    ];
    export default {
        name: "SelectcheckView",
        data() {
            return {
                selectData: dataArr, // type: Array
            }
        },
        methods: {
            // 选择的项
            change({id}) {
                console.log('选择的项::::', id);
            }
        }
    }
</script>

<style lang="stylus" scoped>

.component-padding
    padding-bottom 200px !important
    //width 240px
    .treeCom
        width 600px
        > div
            width 190px
            margin-right 24px
            overflow-y auto

</style>
