<template>
	<section
			tabindex="-1"
			ref="popover"
			@blur="hidePopover"
			:class="['p-popover']"
	>
		<div
				class="p-popover-tag"
				@mouseenter="showPopover"
				@mouseleave="leavePopover"
				@click="clickShowPopover"
		>
			<slot></slot>
		</div>
		<transition name="selectDown">
			<div
					:class="['p-popover-wrap', `p-popover-wrap-${type}`, `p-popover-wrap-${placement}`]"
					ref="popoverWrap"
					@mouseleave="popoverLeave"
					@mouseenter="popoverEnter"
					v-show="popoverStatus"
			>
				<div class="p-popover-content">
					<div v-if="titleText !== ''" class="p-popover-title">{{titleText}}</div>
					<div :class="['p-popover-arrow', `p-popover-arrow-${placement}`]"></div>
					<slot name="content" />
				</div>
				<div class="p-popover-button" v-if="type === 'confirm'">
					<Button type="default" @click.native="cancelEvent" size="small">{{cancelText}}</Button>
					<Button type="primary" @click.native="confirmEvent" size="small">{{confirmText}}</Button>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
	import Button from '../Button'
	export default {
		name: 'Popover',
		components: {
			Button
		},
		props: {
			/**
			 * 类型可选【base confirm】
			 */
			type: {
				type: String,
				default: 'base'
			},
			/**
			 * popover框title文字
			 */
			titleText: {
				type: String,
				default: ''
			},
			/**
			 * 确认按钮提示文字
			 */
			confirmText: {
				type: String,
				default: '确认'
			},
			/**
			 * 取消按钮提示文字
			 */
			cancelText: {
				type: String,
				default: '取消'
			},
			/**
			 * popover框的对齐位置
			 * 默认居中
			 * 可选【top-center，top-left，top-right，bottom-left，bottom-center，bottom-right】
			 */
			placement: {
				type: String,
				default: 'top-center'
			}
		},
		data() {
			return {
				popoverStatus: false,			// popover显示状态
			}
		},
		watch: {
			popoverStatus(newVal, oldVal) {
				if(newVal !== oldVal) this.calcPopoverPosition()
			}
		},
		methods: {
			popoverEnter() {
				if(this.type === 'base') {
					this.popoverStatus = true
				}
			},
			popoverLeave(event) {
				if(this.type === 'base') {
					this.hidePopover()
				}
			},
			hidePopover() {
				this.popoverStatus = false
			},
			// 取消按钮点击
			cancelEvent(e) {
				this.hidePopover()
				this.$emit('cancelEvent',e)
			},
			// 确定按钮点击
			confirmEvent(e) {
				this.hidePopover()
				this.$emit('confirmEvent',e)
			},
			// 点击显示popover
			clickShowPopover() {
				if(this.type === 'base') return false
				this.popoverStatus = true
			},
			// 触发器hover显示popover
			showPopover() {
				if(this.type === 'confirm') return false
				this.$refs['popover'].focus()
				this.popoverStatus = true
			},
			// 离开触发器
			leavePopover() {
				if(this.type === 'confirm') return false
				this.hidePopover()
			},
			// 计算popover位置
			calcPopoverPosition() {
				this.$nextTick(() => {
					let popoverBox = this.$refs['popoverWrap'],
							parentBox = this.$refs['popover'],
							flag = this.placement.split('-'),
							positionObj = {
								left: parentBox.offsetLeft,
								right: parentBox.offsetLeft - popoverBox.clientWidth + parentBox.clientWidth
							}
					if(this.popoverStatus) {
						if(flag[0] === 'top') {
							popoverBox.style.top = parentBox.offsetTop - (popoverBox.clientHeight / 2) + 'px'
							popoverBox.style.top = parentBox.offsetTop - (popoverBox.clientHeight + 10) + 'px'
						} else {
							popoverBox.style.top = parentBox.offsetTop + (parentBox.clientHeight / 2) + 'px'
							popoverBox.style.top = parentBox.offsetTop + (parentBox.clientHeight + 10) + 'px'
						}
						if(flag[1] === 'center') {
							popoverBox.style.transform = `translate(calc(-50% + ${parentBox.clientWidth / 2}px))`
						} else {
							popoverBox.style.left = positionObj[flag[1]] + 'px'
						}
						popoverBox.style.zIndex = 1000
						popoverBox.style.opacity = 1
					} else {
						popoverBox.style.zIndex = -1
						popoverBox.style.opacity = 0
						if(flag[0] === 'top') {
							popoverBox.style.top = parentBox.offsetTop - (popoverBox.clientHeight / 2) + 'px'
						} else {
							popoverBox.style.top = parentBox.offsetTop + (parentBox.clientHeight / 2) + 'px'
						}
					}
				})
			}
		}
	}
</script>

<style lang="stylus">
	$bottomShadow = 3px 3px 7px rgba(31,35,41,0.1)
	$bottomBorder = transparent $white $white transparent
	.p-popover
		display: inline-block
		.p-popover-wrap
			position: fixed
			width: auto
			background: $white
			box-shadow: $box-shadow-bottom
			border: 1px solid $grey-300
			border-radius: 4px
			transition-property: top,bottom,opacity
			transition-duration: 0.3s
			z-index 1000
			&::after
				content ''
				position absolute
				bottom -10px
				left 0
				display inline-block
				width 100%
				height 10px
				z-index -1
			.p-popover-content
				width: auto
				min-width: 246px
				max-width: 370px
				max-height: 394px
				overflow-y: auto
				color: $grey-600
				line-height: 22px
				.p-popover-title
					display: inline-block
					margin-bottom: 4px
					font-size: 14px
					font-weight: 600
					color: $grey-900
					line-height: 22px
				.p-popover-arrow
					position: absolute
					width: 8px
					height: @width
					box-shadow: -2px -2px 5px rgba(31,35,41,0.1)
					border-color: $white transparent transparent $white
					border-width: 4px
					background: $white
					transform: rotate(45deg)
				.p-popover-arrow-bottom-center
					left: 50%
					top: -4px
				.p-popover-arrow-bottom-left
					left: 13%
					top: -4px
				.p-popover-arrow-bottom-right
					right: 13%
					top: -4px
				.p-popover-arrow-top-center
					left: 50%
					bottom: -4px
					box-shadow: $bottomShadow
					border-color: $bottomBorder
				.p-popover-arrow-top-left
					left: 13%
					bottom: -4px
					box-shadow: $bottomShadow
					border-color: $bottomBorder
				.p-popover-arrow-top-right
					right: 13%
					bottom: -4px
					box-shadow: $bottomShadow
					border-color: $bottomBorder
			.p-popover-button
				display: flex
				justify-content: flex-end
				margin-top: 16px
		.p-popover-wrap-base
			padding: 12px 16px
		.p-popover-wrap-confirm
			padding: 20px 24px

</style>
