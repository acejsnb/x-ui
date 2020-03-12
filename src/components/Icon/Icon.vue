<template>
	<div class="p-icon">
		<component :is="handleName"></component>
	</div>
</template>

<script>
	import iconSvg from './iconHandler'
    export default {
		name: 'Icon',
		components: {
			...iconSvg
		},
        props: {
            /**
             * icon名称
             */
            name: {
				type: String,
				required: true
			},
		},
		computed: {
			/**
			 * 处理icon组件名字
			 */
			handleName() {
				let _string = this.name
				return 'Icon' + _string
			},
		},
    }
</script>

<style lang="stylus">
.p-icon
	display: inline-block
	width: 24px
	height: @width
	line-height: @width
	overflow: hidden
	text-align: center
	cursor: pointer
	font-size: 0
</style>
