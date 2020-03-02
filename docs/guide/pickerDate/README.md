### PickerDate 日期选择 内侧中...

<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>
        <h2 class="titleLine">一、单选</h2>
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
        <br><br><br><br>
        <h2 class="titleLine">二、多选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateDoubleNull" :range="true" @change="dateChangeDoubleNull" />
        <br><br>
        <PickerDate :date="dateDoubleNullHm" :range="true" format="hm" @change="dateChangeDoubleNullHm" />
        <br><br>
        <PickerDate :date="dateDoubleNullHms" :range="true" format="hms" @change="dateChangeDoubleNullHms" />
        <br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerDate :date="dateDoubleHm" :range="true" format="hm" @change="dateChangeDoubleHm" />
        <br><br>
        <PickerDate :date="dateDoubleHms" :range="true" format="hms" @change="dateChangeDoubleHms" />
        <br><br>
        <h3>2-1.有默认值-周按照月排序</h3>
        <PickerDate :date="dateDoubleMonth" :range="true" sort="month" @change="dateChangeDoubleMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmMonth" :range="true" sort="month" format="hm" @change="dateChangeDoubleHmMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmsMonth" :range="true" sort="month" format="hms" @change="dateChangeDoubleHmsMonth" />
        <br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateDoubleQuick" :range="true" :quickSwitch="true" @change="dateChangeDoubleQuick" />
        <br><br>
        <PickerDate :date="dateDoubleHmQuick" :range="true" :quickSwitch="true" format="hm" @change="dateChangeDoubleHmQuick" />
        <br><br>
        <PickerDate :date="dateDoubleHmsQuick" :range="true" :quickSwitch="true" format="hms" @change="dateChangeDoubleHmsQuick" />
        <br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateDoubleQuickMonth" :range="true" sort="month" :quickSwitch="true" @change="dateChangeDoubleQuickMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hm" @change="dateChangeDoubleHmQuickMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmsQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hms" @change="dateChangeDoubleHmsQuickMonth" />
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                // 单选
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

                // 多选
                dateDoubleNull: '',
                dateDoubleNullHm: '',
                dateDoubleNullHms: '',

                dateDouble: '2020.01.03-2020.02.28',
                dateDoubleHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleMonth: '2020.01.03-2020.02.28',
                dateDoubleHmMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuick: '2020.01.03-2020.02.28',
                dateDoubleHmQuick: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuick: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuickMonth: '2020.01.03-2020.02.28',
                dateDoubleHmQuickMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuickMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',
            }
        },
        methods: {
            // 单选
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
            },

            // 多选
            dateChangeDoubleNull(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNull=date;
            },
            dateChangeDoubleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHm=date;
            },
            dateChangeDoubleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHms=date;
            },

            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            },
            dateChangeDoubleHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHm=date;
            },
            dateChangeDoubleHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHms=date;
            },

            dateChangeDoubleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleMonth=date;
            },
            dateChangeDoubleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmMonth=date;
            },
            dateChangeDoubleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsMonth=date;
            },

            dateChangeDoubleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuick=date;
            },
            dateChangeDoubleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuick=date;
            },
            dateChangeDoubleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuick=date;
            },

            dateChangeDoubleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuickMonth=date;
            },
            dateChangeDoubleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuickMonth=date;
            },
            dateChangeDoubleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuickMonth=date;
            }
        }
    }
</script>


```vue
<template>
    <div class="component component-padding">
        <h1>PickerDate组件</h1>

        <h2 class="titleLine">一、单选</h2>
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

        <br><br><br><br>

        <h2 class="titleLine">二、多选</h2>
        <h3>1.空状态</h3>
        <PickerDate :date="dateDoubleNull" :range="true" @change="dateChangeDoubleNull" />
        <br><br>
        <PickerDate :date="dateDoubleNullHm" :range="true" format="hm" @change="dateChangeDoubleNullHm" />
        <br><br>
        <PickerDate :date="dateDoubleNullHms" :range="true" format="hms" @change="dateChangeDoubleNullHms" />
        <br><br>
        <h3>2.有默认值</h3>
        <PickerDate :date="dateDouble" :range="true" @change="dateChangeDouble" />
        <br><br>
        <PickerDate :date="dateDoubleHm" :range="true" format="hm" @change="dateChangeDoubleHm" />
        <br><br>
        <PickerDate :date="dateDoubleHms" :range="true" format="hms" @change="dateChangeDoubleHms" />
        <br><br>
        <h3>2-1.有默认值-周按照月排序</h3>
        <PickerDate :date="dateDoubleMonth" :range="true" sort="month" @change="dateChangeDoubleMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmMonth" :range="true" sort="month" format="hm" @change="dateChangeDoubleHmMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmsMonth" :range="true" sort="month" format="hms" @change="dateChangeDoubleHmsMonth" />
        <br><br>
        <h3>3.快速切换</h3>
        <PickerDate :date="dateDoubleQuick" :range="true" :quickSwitch="true" @change="dateChangeDoubleQuick" />
        <br><br>
        <PickerDate :date="dateDoubleHmQuick" :range="true" :quickSwitch="true" format="hm" @change="dateChangeDoubleHmQuick" />
        <br><br>
        <PickerDate :date="dateDoubleHmsQuick" :range="true" :quickSwitch="true" format="hms" @change="dateChangeDoubleHmsQuick" />
        <br><br>
        <h3>3-1.快速切换-周按照月排序</h3>
        <PickerDate :date="dateDoubleQuickMonth" :range="true" sort="month" :quickSwitch="true" @change="dateChangeDoubleQuickMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hm" @change="dateChangeDoubleHmQuickMonth" />
        <br><br>
        <PickerDate :date="dateDoubleHmsQuickMonth" :range="true" sort="month" :quickSwitch="true" format="hms" @change="dateChangeDoubleHmsQuickMonth" />
    </div>
</template>

<script>
    export default {
        name: "PickerDateView",
        data() {
            return {
                // 单选
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

                // 多选
                dateDoubleNull: '',
                dateDoubleNullHm: '',
                dateDoubleNullHms: '',

                dateDouble: '2020.01.03-2020.02.28',
                dateDoubleHm: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHms: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleMonth: '2020.01.03-2020.02.28',
                dateDoubleHmMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuick: '2020.01.03-2020.02.28',
                dateDoubleHmQuick: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuick: '2020.01.03 11:20:22-2020.02.28 20:08:30',

                dateDoubleQuickMonth: '2020.01.03-2020.02.28',
                dateDoubleHmQuickMonth: '2020.01.03 11:20-2020.02.28 20:08',
                dateDoubleHmsQuickMonth: '2020.01.03 11:20:22-2020.02.28 20:08:30',
            }
        },
        methods: {
            // 单选
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
            },

            // 多选
            dateChangeDoubleNull(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNull=date;
            },
            dateChangeDoubleNullHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHm=date;
            },
            dateChangeDoubleNullHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleNullHms=date;
            },

            dateChangeDouble(date) {
                console.log('选择的日期::::', date);
                this.dateDouble=date;
            },
            dateChangeDoubleHm(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHm=date;
            },
            dateChangeDoubleHms(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHms=date;
            },

            dateChangeDoubleMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleMonth=date;
            },
            dateChangeDoubleHmMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmMonth=date;
            },
            dateChangeDoubleHmsMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsMonth=date;
            },

            dateChangeDoubleQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuick=date;
            },
            dateChangeDoubleHmQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuick=date;
            },
            dateChangeDoubleHmsQuick(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuick=date;
            },

            dateChangeDoubleQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleQuickMonth=date;
            },
            dateChangeDoubleHmQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmQuickMonth=date;
            },
            dateChangeDoubleHmsQuickMonth(date) {
                console.log('选择的日期::::', date);
                this.dateDoubleHmsQuickMonth=date;
            }
        }
    }
</script>

```