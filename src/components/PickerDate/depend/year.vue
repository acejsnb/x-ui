<template>
    <div class="p-picker-panel-content">
        <div class="p-picker-panel-select">
            <ul>
                <li
                        :class="[
                                'p-picker-panel-text',
                                yearNow===ya.year&&'p-picker-panel-text-current',
                                'p-picker-panel-text-'+ya.multiple,
                                'p-picker-panel-text-'+ya.selected
                             ]"
                        v-for="(ya, yai) in yearsArray"
                        :key="'year-'+ya.year+yai"
                        @click="yearClick(ya)"
                >
                    <span>{{ya.year}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Year",
        props: {
            yearNow: {
                type: String,
                default: ''
            },
            yearsArray: {
                type: Array,
                default: () => []
            }
        },
        methods: {
            yearClick(year) {
                this.$emit('change', year)
            }
        }
    }
</script>
