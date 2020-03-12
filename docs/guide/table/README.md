### Table 表格

<template>
    <div class="component component-padding">
        <h1>Table组件</h1>
        <br />
        <h6>基础表格</h6>
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
            ></Table>
        </div>
        <br />
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :group="groupMsg"
                height="100%"
                :selectWidth="180"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <h5>多选</h5>
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :checkAble="true"
                height="100%"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <h6>可配表格</h6>
        <br />
        <div>
            <Table
                :head="headList1"
                :source="sourceComputed[page-1]"
                selectWidth="180"
                :setColumnWidth="true"
                align="left"
                height="500"
                :checkAble="true"
                :group="groupMsg"
                :pagination="true"
                :pageCount="source.length"
                :columnSet="true"
                :toolButtons="toolBtns"
                :filtersList="filters"
                :reloadPage="true"
                @check-change="tableCheckChange"
                @page-size-change="pageSizeChange"
                @reload-page="reloadPageHandle"
                @column-set-change="submitColumnSet"
                @column-set-resume="resumeDefault"
                @order-change="sourceOrder"
                @tool-button-click="buttonClickHandle"
                @group-change="groupMsgChange"
                @filter-change="filterChange"
                @delete="deleteTableRow"
                @download="download"
                @row-click="rowClickHandle"
            >
                <span
                    slot="tag"
                    slot-scope="{col, row}"
                >
                    <Tag
                        size="big"
                        v-for="(tag,i) in row._tags"
                        v-if="tag.key === col.key"
                        :key="i"
                        type="dot"
                        :status="tag.tag"
                    >
                        {{row[col.key]}}
                    </Tag>
                </span>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableView",
    data() {
        return {
            toggle: false,
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            t: "1",
            tt: [
                {
                    id: "1",
                    name: "aaa"
                },
                {
                    id: "2",
                    name: "bbb"
                },
                {
                    id: "3",
                    name: "ccc"
                },
                {
                    id: "4",
                    name: "ddd"
                },
                {
                    id: "5",
                    name: "eee"
                }
            ],
            headList2: [
                {
                    title: "设备状态", // 列的名称
                    key: "state", // 列的标识
                    show: true // 是否显示该列
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            headList1: [
                {
                    title: "设备状态",
                    key: "state",
                    show: true
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true,
                    isOrder: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            // 默认表格数据
            defaultSource: [
                {
                    id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                    state: "闲置", // 数据字段，与headList2中字段对应
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
            ],
            // 可配表格数据
            source: [
                {
                    id: "1",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                 {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
            ],
            // 分组信息 （非必需）
            groupMsg: {
                key: "all", // 当前选中的分组条件的id值，'all'为内置的key,代表无分组
                isGroup: true, // 是否分组
                // 分组条件列表，参考Select组件数据要求
                options: [
                    {
                        id: "all",
                        name: "全部"
                    },
                    {
                        id: "state",
                        name: "设备状态"
                    },
                    {
                        id: "purchaseType",
                        name: "采购类型"
                    }
                ]
            },
            // 操作按钮组 (非必填)
            toolBtns: [
                {
                    icon: "edit", // 按钮的icon
                    name: "编辑", // 按钮名称
                    disabled: true // 是否禁用
                },
                {
                    icon: "copy",
                    name: "复制"
                },
                {
                    icon: "request",
                    name: "申请"
                },
                {
                    icon: "update",
                    name: "修改"
                },
                {
                    icon: "download",
                    name: "下载"
                },
                {
                    icon: "use",
                    name: "应用"
                }
            ],
            // 条件筛选列表
            filters: [
                {
                    title: "状态:", // 筛选条件的名称
                    key: "state", // 条件标识
                    value: "all", // 当前选中的条件id值
                    // 条件列表，参考Select组件数据要求
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "闲置"
                        },
                        {
                            id: "1",
                            name: "检测中"
                        }
                    ]
                },
                {
                    title: "专业:",
                    key: "job",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "强电"
                        },
                        {
                            id: "1",
                            name: "弱电"
                        }
                    ]
                },
                {
                    title: "采购:",
                    key: "purchaseType",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "试用"
                        },
                        {
                            id: "1",
                            name: "购买"
                        }
                    ]
                },
                {
                    title: "部门:",
                    key: "department",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "物业部"
                        },
                        {
                            id: "1",
                            name: "维修部"
                        }
                    ]
                },
                {
                    title: "系统:",
                    key: "system",
                    value: "",
                    source: [
                        {
                            id: "0",
                            name: "照明系统"
                        },
                        {
                            id: "1",
                            name: "空调系统"
                        }
                    ]
                }
            ],
            defaultPage: 1,
            defaultPageSize: 20,
            page: 1,
            pageSize: 20,
        };
    },
    computed: {
        /**
         * 默认表格分页数据
         */
        defaultSourceComputed() {
            const len = this.defaultSource.length;
            let pagecount = Math.ceil(len / this.defaultPageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.defaultPageSize || j === 0) && j <= i*this.defaultPageSize-1) {
                        temp.push(this.defaultSource[j])
                    }
                }
                source.push(temp);
            }
            return source;
        },
        /**
         * 可配置表格计算数据
         */
        sourceComputed() {
            const len = this.source.length;
            let pagecount = Math.ceil(len / this.pageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.pageSize || j === 0) && j <= i*this.pageSize-1) {
                        temp.push(this.source[j])
                    }
                }
                source.push(temp);
            }
            return source;
        }
    },
    methods: {
        rowClickHandle(obj) {
            console.log(obj)
        },
        tableCheckChange(data) {
            console.log(data);
        },
        submitColumnSet(data) {
            console.log(data);
        },
        /**
         * 默认表格切换页码或者改变每页条数
         */
        pageSizeChange2(pageSize) {
            this.defaultPage = pageSize.newPage;
            this.defaultPageSize = pageSize.newPageSize;
        },
        /**
         * 可配置表格切换页码或者改变每页条数
         */
        pageSizeChange(pageSize) {
            this.page = pageSize.newPage;
            this.pageSize = pageSize.newPageSize;
        },
        resumeDefault() {
            console.log("恢复默认");
        },
        sourceOrder(data) {
            console.log(data);
        },
        resetPagination() {
            console.log("重置分页器");
        },
        buttonClickHandle(value) {
            console.log(value);
        },
        groupMsgChange(value) {
            console.log(value);
        },
        filterChange(val) {
            console.log(val);
        },
        reloadPageHandle(page) {
            console.log(page);
        },
        /**
         * 删除已选行回调
         * @param {Array} rows 已勾选的行数据
         */
        deleteTableRow(rows) {
            const ids = rows.map(row => row.id);
            this.source = this.source.filter(row => !ids.includes(row.id));
        },
        /**
         * 下载事件回调
         * @param {Array} rows 已勾选的行数据
         */
        download(rows) {
            console.log(rows);
        }
    },
};
</script>

<style lang="stylus">
.container
    width 1000px
    height 500px
    padding 20px
    border 1px solid #eee
.t
    border 1px solid #333
.e
    height 44px
    display flex
    flex-wrap wrap-reverse
    overflow hidden

</style>

```vue

<template>
    <div class="component component-padding">
        <h1>Table组件</h1>
        <br />
        <h6>基础表格</h6>
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
            ></Table>
        </div>
        <br />
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :group="groupMsg"
                height="100%"
                :selectWidth="180"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <h5>多选</h5>
        <div class="container">
            <Table
                :head="headList2"
                :source="defaultSourceComputed[defaultPage-1]"
                :checkAble="true"
                height="100%"
                :pageCount="defaultSource.length"
                :toolButtons="toolBtns"
                @page-size-change="pageSizeChange2"
            ></Table>
        </div>
        <br />
        <h6>可配表格</h6>
        <br />
        <div>
            <Table
                :head="headList1"
                :source="sourceComputed[page-1]"
                selectWidth="180"
                :setColumnWidth="true"
                align="left"
                height="500"
                :checkAble="true"
                :group="groupMsg"
                :pagination="true"
                :pageCount="source.length"
                :columnSet="true"
                :toolButtons="toolBtns"
                :filtersList="filters"
                :reloadPage="true"
                @check-change="tableCheckChange"
                @page-size-change="pageSizeChange"
                @reload-page="reloadPageHandle"
                @column-set-change="submitColumnSet"
                @column-set-resume="resumeDefault"
                @order-change="sourceOrder"
                @tool-button-click="buttonClickHandle"
                @group-change="groupMsgChange"
                @filter-change="filterChange"
                @delete="deleteTableRow"
                @download="download"
                @row-click="rowClickHandle"
            >
                <span
                    slot="tag"
                    slot-scope="{col, row}"
                >
                    <Tag
                        size="big"
                        v-for="(tag,i) in row._tags"
                        v-if="tag.key === col.key"
                        :key="i"
                        type="dot"
                        :status="tag.tag"
                    >
                        {{row[col.key]}}
                    </Tag>
                </span>
            </Table>
        </div>
    </div>
</template>

<script>
export default {
    name: "TableView",
    data() {
        return {
            toggle: false,
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            t: "1",
            tt: [
                {
                    id: "1",
                    name: "aaa"
                },
                {
                    id: "2",
                    name: "bbb"
                },
                {
                    id: "3",
                    name: "ccc"
                },
                {
                    id: "4",
                    name: "ddd"
                },
                {
                    id: "5",
                    name: "eee"
                }
            ],
            headList2: [
                {
                    title: "设备状态", // 列的名称
                    key: "state", // 列的标识
                    show: true // 是否显示该列
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            headList1: [
                {
                    title: "设备状态",
                    key: "state",
                    show: true
                },
                {
                    title: "设备名称",
                    key: "name",
                    show: true
                },
                {
                    title: "专业",
                    key: "job",
                    show: true
                },
                {
                    title: "所属系统",
                    key: "system",
                    show: false
                },
                {
                    title: "设备类型",
                    key: "type",
                    show: false
                },
                {
                    title: "购置时间",
                    key: "acquisitionTime",
                    show: true,
                    isOrder: true
                },
                {
                    title: "采购类型",
                    key: "purchaseType",
                    show: true
                },
                {
                    title: "所属部门",
                    key: "department",
                    show: true
                },
                {
                    title: "设备位置",
                    key: "position",
                    show: false
                }
            ],
            // 默认表格数据
            defaultSource: [
                {
                    id: "1", // 该条数据id （可以不叫id,只要保证该字段唯一即可）
                    state: "闲置", // 数据字段，与headList2中字段对应
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室"
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房"
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房"
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室"
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室"
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室"
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室"
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房"
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间"
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室"
                },
            ],
            // 可配表格数据
            source: [
                {
                    id: "1",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "2",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "3",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "5",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "6",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "7",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "4",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "8",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "9",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "10",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "11",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "12",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "13",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "14",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "15",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "16",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "17",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "18",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "19",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "20",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                 {
                    id: "21",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "22",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "23",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "24",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "25",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "26",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "27",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "28",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "29",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "30",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                 {
                    id: "31",
                    state: "闲置",
                    name: "佳能-网络视频录像机-315",
                    job: "强电",
                    system: "给排水系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.12",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "办公室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "32",
                    state: "检测中",
                    name: "尼康-摄影机-314",
                    job: "给排水",
                    system: "供配电系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.11",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "processing"
                        }
                    ]
                },
                {
                    id: "33",
                    state: "使用中",
                    name: "尼康-网络视频录像机-313",
                    job: "消防",
                    system: "冷热源系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.10",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "服务用房",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "34",
                    state: "维修中",
                    name: "三菱-中央变频空调-312",
                    job: "电梯",
                    system: "照明系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.09",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "休息室",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "35",
                    state: "封存",
                    name: "三菱-立式空调-311",
                    job: "暖通空调",
                    system: "空调系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.08",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "起居室",
                    _tags: [
                        {
                            key: "state",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "36",
                    state: "已报废",
                    name: "尼康-液晶屏-310",
                    job: "弱电",
                    system: "物业管理系统",
                    type: "通用设备",
                    acquisitionTime: "2018.12.07",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "电气开关室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
                {
                    id: "37",
                    state: "使用中",
                    name: "海尔-吸尘器-315",
                    job: "综合",
                    system: "信息网络系统",
                    type: "专业设备",
                    acquisitionTime: "2018.12.06",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "档案室",
                    _tags: [
                        {
                            key: "state",
                            tag: "completed"
                        }
                    ]
                },
                {
                    id: "38",
                    state: "维修中",
                    name: "联想-智能摄像机-314",
                    job: "安管",
                    system: "有限电视系统",
                    type: "暖通设备",
                    acquisitionTime: "2018.12.05",
                    purchaseType: "租用",
                    department: "资产部",
                    position: "电梯机房",
                    _tags: [
                        {
                            key: "state",
                            tag: "error"
                        }
                    ]
                },
                {
                    id: "39",
                    state: "封存",
                    name: "萤石-智能摄像头-313",
                    job: "环境",
                    system: "公告广播系统",
                    type: "弱电设备",
                    acquisitionTime: "2018.12.04",
                    purchaseType: "购买",
                    department: "维修部",
                    position: "清洁间",
                    _tags: [
                        {
                            key: "purchaseType",
                            tag: "rejected"
                        }
                    ]
                },
                {
                    id: "40",
                    state: "已报废",
                    name: "佳能-打印机-312",
                    job: "安品",
                    system: "电话交换系统",
                    type: "仪器仪表",
                    acquisitionTime: "2018.12.03",
                    purchaseType: "试用",
                    department: "物业部",
                    position: "会议室",
                    _tags: [
                        {
                            key: "state",
                            tag: "remove"
                        }
                    ]
                },
            ],
            // 分组信息 （非必需）
            groupMsg: {
                key: "all", // 当前选中的分组条件的id值，'all'为内置的key,代表无分组
                isGroup: true, // 是否分组
                // 分组条件列表，参考Select组件数据要求
                options: [
                    {
                        id: "all",
                        name: "全部"
                    },
                    {
                        id: "state",
                        name: "设备状态"
                    },
                    {
                        id: "purchaseType",
                        name: "采购类型"
                    }
                ]
            },
            // 操作按钮组 (非必填)
            toolBtns: [
                {
                    icon: "edit", // 按钮的icon
                    name: "编辑", // 按钮名称
                    disabled: true // 是否禁用
                },
                {
                    icon: "copy",
                    name: "复制"
                },
                {
                    icon: "request",
                    name: "申请"
                },
                {
                    icon: "update",
                    name: "修改"
                },
                {
                    icon: "download",
                    name: "下载"
                },
                {
                    icon: "use",
                    name: "应用"
                }
            ],
            // 条件筛选列表
            filters: [
                {
                    title: "状态:", // 筛选条件的名称
                    key: "state", // 条件标识
                    value: "all", // 当前选中的条件id值
                    // 条件列表，参考Select组件数据要求
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "闲置"
                        },
                        {
                            id: "1",
                            name: "检测中"
                        }
                    ]
                },
                {
                    title: "专业:",
                    key: "job",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "强电"
                        },
                        {
                            id: "1",
                            name: "弱电"
                        }
                    ]
                },
                {
                    title: "采购:",
                    key: "purchaseType",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "试用"
                        },
                        {
                            id: "1",
                            name: "购买"
                        }
                    ]
                },
                {
                    title: "部门:",
                    key: "department",
                    value: "all",
                    source: [
                        {
                            id: "all",
                            name: "全部"
                        },
                        {
                            id: "0",
                            name: "物业部"
                        },
                        {
                            id: "1",
                            name: "维修部"
                        }
                    ]
                },
                {
                    title: "系统:",
                    key: "system",
                    value: "",
                    source: [
                        {
                            id: "0",
                            name: "照明系统"
                        },
                        {
                            id: "1",
                            name: "空调系统"
                        }
                    ]
                }
            ],
            defaultPage: 1,
            defaultPageSize: 20,
            page: 1,
            pageSize: 20,
        };
    },
    computed: {
        /**
         * 默认表格分页数据
         */
        defaultSourceComputed() {
            const len = this.defaultSource.length;
            let pagecount = Math.ceil(len / this.defaultPageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.defaultPageSize || j === 0) && j <= i*this.defaultPageSize-1) {
                        temp.push(this.defaultSource[j])
                    }
                }
                source.push(temp);
            }
            return source;
        },
        /**
         * 可配置表格计算数据
         */
        sourceComputed() {
            const len = this.source.length;
            let pagecount = Math.ceil(len / this.pageSize);
            let source = [];

            for (let i=1; i<=pagecount; i++) {
                const temp = [];
                for (let j=0; j<len; j++) {
                    if ((j > (i-1)*this.pageSize || j === 0) && j <= i*this.pageSize-1) {
                        temp.push(this.source[j])
                    }
                }
                source.push(temp);
            }
            return source;
        }
    },
    methods: {
        rowClickHandle(obj) {
            console.log(obj)
        },
        tableCheckChange(data) {
            console.log(data);
        },
        submitColumnSet(data) {
            console.log(data);
        },
        /**
         * 默认表格切换页码或者改变每页条数
         */
        pageSizeChange2(pageSize) {
            this.defaultPage = pageSize.newPage;
            this.defaultPageSize = pageSize.newPageSize;
        },
        /**
         * 可配置表格切换页码或者改变每页条数
         */
        pageSizeChange(pageSize) {
            this.page = pageSize.newPage;
            this.pageSize = pageSize.newPageSize;
        },
        resumeDefault() {
            console.log("恢复默认");
        },
        sourceOrder(data) {
            console.log(data);
        },
        resetPagination() {
            console.log("重置分页器");
        },
        buttonClickHandle(value) {
            console.log(value);
        },
        groupMsgChange(value) {
            console.log(value);
        },
        filterChange(val) {
            console.log(val);
        },
        reloadPageHandle(page) {
            console.log(page);
        },
        /**
         * 删除已选行回调
         * @param {Array} rows 已勾选的行数据
         */
        deleteTableRow(rows) {
            const ids = rows.map(row => row.id);
            this.source = this.source.filter(row => !ids.includes(row.id));
        },
        /**
         * 下载事件回调
         * @param {Array} rows 已勾选的行数据
         */
        download(rows) {
            console.log(rows);
        }
    },
};
</script>

```


### Attributes

| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
|  head   | 表格列的配置描述,见下表  |  Array | [] |    True  |
|  source  |  数据数组，见下表  |  Array  |  []  |  No  |
|  group  | 分组信息，见下表 |  Object |  {}  |  No  |
|   selectWidth  |   分组和条件筛选组件的宽度  |   Number\|String   |  180   |  No  |
|    toolButtons    |    操作按钮数组，见下表  |   Array   |   []  |    No  |
|   filtersList  |  筛选条件数组，见下表   |   Array   |   []   |  No   |
|  defaultButtonNumber  |   默认显示的按钮个数  |   Number  |  3   |  No  |
|  width  |  表格宽度  |  String\|Number |  100%  |   No |
|  height  |  表格高度  |  String\|Number |  默认300px  |   No |
|   rowHeight    |    行高    |     Number\|String    |    48px     |   No     |
|  bordered  |  是否展示边框  |  Boolean |  false  |  No  |
|  align  |  文字对齐方式  |  String |  left [left, right, center]   |  No  |
|  fontFamily  | 内容字体   | String  |    |  No  |
|  fontColor  |  内容颜色  |  String |  #1F2329  |  No  |
|  headFontColor  |  表头颜色  | String  |  #646A73  |  No  |
|  headFontSize  |  表头字号  | String  | 12px  |  No  |
|  fontSize  |  内容字号  |  String |  14px  |  No  |
|  fontWeight  |  内容字体宽度  |  String | normal   | No   |
|  headFontWeight  |  表头字体宽度  |  String |   normal | No   |
|  setColumnWidth  |  是否允许列宽设置  |  Boolean |  false  |   No |
|  checkAble  |  是否允许多选  | Boolean  |  false  |  No  |
| columnSet   |  是否允许列的排序和显隐  | Boolean  |   false |  No  |
|  pagination  |   是否展示分页器和进行分页 | Number  | false  |  No  |
|  pageCount  |   source数组长度 | Number  |   |  Yes  |
|  pageCountShow   |  是否展示数据条数   |  Boolean   |   true   |  No    |
|  pageSize  | 每页条数   | String  |  20  |  No  |
| page   |  当前页码  | Number |  1  |  No  |
|  fastStep  |  快速翻页步长  | Number  |  5  |  No  |
|  basePage  |  当前按钮所在的位置  |  Number |   3 |  No  |
|  fast  | 是否使用快速翻页   |  Boolean |  true  | No   |
|  visiblePages  |  默认显示的页码个数  |  Number |  5  | No   |
|  reloadPage  |  是否展示刷新按钮  |  Boolean |  false  |  No |
|  pageSizeSetting  |  是否允许设置每页条数  | Boolean  |   false |  No  |
| simple   |  是否使用简易分页器  |  Boolean |  false  |  No  |


### 列数据 head

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
|   key    |   列的标识    |   String    | 
|   title    |   列的名称    |   String    | 
|   show    |   是否显示该列 true:显示；false:不显示   |   Boolean    | 
|   isOrder    |   是否可排序 true:可排序；flase:不可排序   |   Boolean    | 


### 行数据 source

说明：source中的键值，需要与head中的key值对应，如：head:[{title:'状态'，key:'state'}]  source: [{state: '使用中'}]
|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| id | 行的标识，不一定叫做id,需要保证其唯一性 |  | 
| _tags | 单元格的标签属性，[{key:'列的标识'，tag:'标签组件status属性，具体参考Tag组件'}] | Array | 
| _colors | 单元格文字颜色，[{key:'列的标识'，color:'颜色代码，颜色应该从设计规范中选择'}] | Array |


### 分组配置 group

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| key | 选中的分组条件的id值，'all'为内置数据，代表无分组 | String |
| isGroup | 是否使用分组功能 true:使用；false:不使用 | Boolean | 
| options | 分组条件列表，参考Select组件数据要求.例：[{id:'state', name:'状态'}] | Array |


### 操作按钮数组 toolButtons

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| icon | 按钮图标（暂不支持，需等待Icon开发完成后再做支持） | String |
| name | 按钮名称 | String | 
| disabled | 是否禁用 true:禁用；false:可用 | Bolean | 


### 筛选条件数组 filtersList

|   参数   | 说明  |  类型   | 
| -------- | ---- | ------ | 
| title |筛选条件的名称 | String |
| key | 条件标识 | String | 
| source | 条件列表，参考Select组件数据要求.例：[{id:'state', name:'闲置'}] | Array | 


### 事件 Events 

| 名称     | 说明  | 参数    | 返回值  |
| ------- | ---- | ------ | ------- |
|  check-change  |   多选事件  |     |   Array [{被选中的行},...]   |
|    page-size-change   |    分页器事件    |      |   Object {newPage: 页码, newPageSize: 每页条数}    |
|   reload-page  |   刷新当前页面数据   |     |   Object {newPage: 页码, newPageSize: 每页条数}  |
|  column-set-resume   |   恢复表格列顺序默认设置   |     |      |
|  column-set-change   |   表格列顺序和显隐改变事件   |     |  Array 经过设置的 head 数组  |
|   order-change  |   数据排序（adc:升序、desc:降序）   |      |     Object { key: 列的key值, orderType: 'desc\|asc' }  |
|   tool-button-click  |   操作按钮点击事件   |      |   String 操作按钮的name   |
|  group-change   |   分组条件改变事件   |      |   String 当前分组条件   |
|   filter-change  |   筛选条件改变事件   |      |   Object {key: 当前筛选条件的key值， value: 筛选条件的value值}   |
|   delete  |   删除已勾选行事件   |      |   Array [{已勾选行数据}, ... ]   |
|   download  |   下载事件   |      |   Array [{已勾选行数据}, ... ]   |
|   row-click  |   行点击事件   |      |   object 返回当前点击的行数据   |
