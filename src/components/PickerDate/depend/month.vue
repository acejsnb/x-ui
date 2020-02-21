<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <ul>
                <li
                        :class="[
                                'p-picker-panel-text',
                                (yearNow===ma.year&&monthNow===ma.month)&&'p-picker-panel-text-current',
                                'p-picker-panel-text-'+ma.multiple,
                                'p-picker-panel-text-'+ma.selected,
                                'p-picker-panel-text-'+ma.disabled
                             ]"
                        v-for="(ma, mai) in monthsArray"
                        :key="'month-'+ma.month+mai"
                        @click="monthClick(ma)"
                >
                    <span>{{ma.monthText}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Month",
        props: {
            yearNow: {
                type: String,
                default: ''
            },
            monthNow: {
                type: String,
                default: ''
            },
            monthsArray: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            monthClick(month) {
                this.$emit('change', month)
            }
        }
    }
</script>
