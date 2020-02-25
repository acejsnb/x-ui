### PickerDate 日期选择 内侧中...

<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <h3>1.空状态</h3>
        <PickerDate :date="dateSingleNull" @change="dateChangeSingleNull" />
        <br><br>
        <PickerDate :date="dateSingleNullHm" format="hm" @change="dateChangeSingleNullHm" />
        <br><br>
        <PickerDate :date="dateSingleNullHms" format="hms" @change="dateChangeSingleNullHms" />
        <br><br><br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerDate :date="dateSingleHm" format="hm" @change="dateChangeSingleHm" />
        <br><br>
        <PickerDate :date="dateSingleHms" format="hms" @change="dateChangeSingleHms" />
        <br><br><br><br>
        <h3>2-1.有默认值-周按照月排序</h3>
        <PickerDate :date="dateSingleMonth" sort="month" @change="dateChangeSingleMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmMonth" sort="month" format="hm" @change="dateChangeSingleHmMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmsMonth" sort="month" format="hms" @change="dateChangeSingleHmsMonth" />
        <br><br><br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateSingleQuick" :quickSwitch="true" @change="dateChangeSingleQuick" />
        <br><br>
        <PickerDate :date="dateSingleHmQuick" :quickSwitch="true" format="hm" @change="dateChangeSingleHmQuick" />
        <br><br>
        <PickerDate :date="dateSingleHmsQuick" :quickSwitch="true" format="hms" @change="dateChangeSingleHmsQuick" />
        <br><br><br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateSingleQuickMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleQuickMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmQuickMonth" :quickSwitch="true" sort="month" format="hm" @change="dateChangeSingleHmQuickMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmsQuickMonth" :quickSwitch="true" sort="month" format="hms" @change="dateChangeSingleHmsQuickMonth" />
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                dateSingleNull: '',
                dateSingleNullHm: '',
                dateSingleNullHms: '',

                dateSingle: '2020.02.24',
                dateSingleHm: '2020.02.24 12:12',
                dateSingleHms: '2020.02.24 12:12:25',

                dateSingleMonth: '2020.02.24',
                dateSingleHmMonth: '2020.02.24 12:12',
                dateSingleHmsMonth: '2020.02.24 12:12:25',

                dateSingleQuick: '2020.02.24',
                dateSingleHmQuick: '2020.02.24 12:12',
                dateSingleHmsQuick: '2020.02.24 12:12:25',

                dateSingleQuickMonth: '2020.02.24',
                dateSingleHmQuickMonth: '2020.02.24 12:12',
                dateSingleHmsQuickMonth: '2020.02.24 12:12:25',
            }
        },
        methods: {
                    dateChangeSingleNull(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNull=date;
                    },
                    dateChangeSingleNullHm(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNullHm=date;
                    },
                    dateChangeSingleNullHms(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNullHms=date;
                    },
        
                    dateChangeSingle(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingle=date;
                    },
                    dateChangeSingleHm(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHm=date;
                    },
                    dateChangeSingleHms(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHms=date;
                    },
        
                    dateChangeSingleMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleMonth=date;
                    },
                    dateChangeSingleHmMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmMonth=date;
                    },
                    dateChangeSingleHmsMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsMonth=date;
                    },
        
                    dateChangeSingleQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleQuick=date;
                    },
                    dateChangeSingleHmQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmQuick=date;
                    },
                    dateChangeSingleHmsQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsQuick=date;
                    },
        
                    dateChangeSingleQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleQuickMonth=date;
                    },
                    dateChangeSingleHmQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmQuickMonth=date;
                    },
                    dateChangeSingleHmsQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsQuickMonth=date;
                    }
                }
    }
</script>


```vue
<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <h3>1.空状态</h3>
        <PickerDate :date="dateSingleNull" @change="dateChangeSingleNull" />
        <br><br>
        <PickerDate :date="dateSingleNullHm" format="hm" @change="dateChangeSingleNullHm" />
        <br><br>
        <PickerDate :date="dateSingleNullHms" format="hms" @change="dateChangeSingleNullHms" />

        <br><br><br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateSingle" @change="dateChangeSingle" />
        <br><br>
        <PickerDate :date="dateSingleHm" format="hm" @change="dateChangeSingleHm" />
        <br><br>
        <PickerDate :date="dateSingleHms" format="hms" @change="dateChangeSingleHms" />

        <br><br><br><br>
        <h3>2-1.有默认值-周按照月排序</h3>
        <PickerDate :date="dateSingleMonth" sort="month" @change="dateChangeSingleMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmMonth" sort="month" format="hm" @change="dateChangeSingleHmMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmsMonth" sort="month" format="hms" @change="dateChangeSingleHmsMonth" />

        <br><br><br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateSingleQuick" :quickSwitch="true" @change="dateChangeSingleQuick" />
        <br><br>
        <PickerDate :date="dateSingleHmQuick" :quickSwitch="true" format="hm" @change="dateChangeSingleHmQuick" />
        <br><br>
        <PickerDate :date="dateSingleHmsQuick" :quickSwitch="true" format="hms" @change="dateChangeSingleHmsQuick" />

        <br><br><br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateSingleQuickMonth" :quickSwitch="true" sort="month" @change="dateChangeSingleQuickMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmQuickMonth" :quickSwitch="true" sort="month" format="hm" @change="dateChangeSingleHmQuickMonth" />
        <br><br>
        <PickerDate :date="dateSingleHmsQuickMonth" :quickSwitch="true" sort="month" format="hms" @change="dateChangeSingleHmsQuickMonth" />

        <br><br><br><br><br><br><br><br>
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                dateSingleNull: '',
                dateSingleNullHm: '',
                dateSingleNullHms: '',

                dateSingle: '2020.02.24',
                dateSingleHm: '2020.02.24 12:12',
                dateSingleHms: '2020.02.24 12:12:25',

                dateSingleMonth: '2020.02.24',
                dateSingleHmMonth: '2020.02.24 12:12',
                dateSingleHmsMonth: '2020.02.24 12:12:25',

                dateSingleQuick: '2020.02.24',
                dateSingleHmQuick: '2020.02.24 12:12',
                dateSingleHmsQuick: '2020.02.24 12:12:25',

                dateSingleQuickMonth: '2020.02.24',
                dateSingleHmQuickMonth: '2020.02.24 12:12',
                dateSingleHmsQuickMonth: '2020.02.24 12:12:25',
            }
        },
        methods: {
                    dateChangeSingleNull(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNull=date;
                    },
                    dateChangeSingleNullHm(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNullHm=date;
                    },
                    dateChangeSingleNullHms(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleNullHms=date;
                    },
        
                    dateChangeSingle(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingle=date;
                    },
                    dateChangeSingleHm(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHm=date;
                    },
                    dateChangeSingleHms(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHms=date;
                    },
        
                    dateChangeSingleMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleMonth=date;
                    },
                    dateChangeSingleHmMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmMonth=date;
                    },
                    dateChangeSingleHmsMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsMonth=date;
                    },
        
                    dateChangeSingleQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleQuick=date;
                    },
                    dateChangeSingleHmQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmQuick=date;
                    },
                    dateChangeSingleHmsQuick(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsQuick=date;
                    },
        
                    dateChangeSingleQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleQuickMonth=date;
                    },
                    dateChangeSingleHmQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmQuickMonth=date;
                    },
                    dateChangeSingleHmsQuickMonth(date) {
                        console.log('选择的日期::::', date);
                        this.dateSingleHmsQuickMonth=date;
                    }
                }
    }
</script>

```