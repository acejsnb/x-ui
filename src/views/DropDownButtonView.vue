<template>
  <div class="split-button-view">
    <div class="component component-padding">
      <h1>Button组件</h1>
      <div class="btn">
        <h2>size=large</h2>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="large" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=medium</h2>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value" :disabled="true">Hover me</DropDownButton>
      </div>
      <div class="btn">
        <h2>size=small</h2>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="split-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="tap" :drop-down-list="dropDownList" v-model="value">Click me</DropDownButton>
        <DropDownButton @click="tap" type="default" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" v-model="value">Hover me</DropDownButton>
        <DropDownButton @click="tap" type="primary" size="small" drop-down-type="default-drop" interactive="hover" :drop-down-list="dropDownList" :disabled="true">Hover me</DropDownButton>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DropDownButtonView",
        data () {
            return {
                value: '',
                dropDownList: [
                    {
                        id: '1',
                        name: 'option1',
                        disabled: false
                    },
                    {
                        id: '2',
                        name: 'option2',
                        disabled: false
                    },
                    {
                        id: '3',
                        name: 'option3',
                        disabled: true
                    }
                ]
            }
        },
        watch: {
            value (o, n) {
                console.log(o)
            }
        },
        methods: {
            tap () {
                console.log('click')
            }
        }
    }
</script>

<style scoped>

</style>
