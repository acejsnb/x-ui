<template>
    <div class="ComponentLists">
        <List :data="listData" />
    </div>
</template>

<script>
    import List from './List'
    export default {
        name: 'ComponentLists',
        components: { List },
        data() {
            return {
                listData: [
                    {title: 'Button', more: '按钮', url: 'buttonView'},
                    {title: 'Modal', more: '弹窗', url: 'ModalView'},
                    {title: 'Drawer', more: '抽屉', url: 'drawerView'},
                    {title: 'Toggle', more: '开关', url: 'toggleView'},
                    {title: 'Dropdown', more: '下拉菜单', url: 'dropdownView'},
                    {title: 'DropGroup', more: '下拉菜单组', url: 'dropGroupView'},
                    {title: 'Select', more: '下拉列表', url: 'selectView'},
                    {title: 'Badge', more: '徽标', url: 'badgeView'},
                    {title: 'Divider', more: '分割线', url: 'dividerView'},
                    {title: 'CarouselText', more: '文字轮播', url: 'carouselTextView'},
                    {title: 'Tabs', more: '标签页', url: 'tabsView'},
                    {title: 'Breadcrumb', more: '面包屑', url: 'breadcrumbView'},
                    {title: 'PickerTime', more: '时分秒选择', url: 'pickerTimeView'},
                    {title: 'PickerDay', more: '日选择', url: 'pickerDayView'},
                    {title: 'PickerWeek', more: '周选择', url: 'pickerWeekView'},
                    {title: 'PickerMonth', more: '月选择', url: 'pickerMonthView'},
                    {title: 'PickerYear', more: '年选择', url: 'pickerYearView'},
                    {title: 'Tree', more: '树形结构', url: 'treeView'},
                    {title: 'Shake', more: '抖动', url: 'shakeView'},
                    {title: 'Stick', more: '抖动', url: 'stickView'},

                    {title: 'Headers', more: '头部title', url: 'headersView'},

                    {title: 'Message', more: '信息提示', url: 'messageView'}
                ],
            }
        }
    }
</script>

<style lang="stylus" scoped>
</style>
