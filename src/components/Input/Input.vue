<template>
	<div :class="['p-input', focus&&'p-input-focus']">
		<i class="p-input-icon-search" v-if="iconType">
			<Search />
		</i>
		<label class="p-input-label">
			<span class="p-input-normal p-placeholder" v-if="!inputVal&&fieldStatus">{{placeholder}}</span>
			<input
				class="p-input-normal p-input-text"
				type="text"
				v-model="inputVal"
				@focus="inputFocus"
				@input="searchInput"
				@blur="inputBlur"
			/>
			<i class="p-input-icon-close" v-if="iconClose" @click="$emit('close')">
				<Close />
			</i>
		</label>
	</div>
</template>

<script>
    import Close from '../static/iconSvg/clear2.svg';
    import Search from '../static/iconSvg/sreach.svg';
    export default {
        name: "Input",
        components: { Close, Search },
        props: {
            value: {
                type: String,
                default: ''
            },
            iconType: {
                type: String,
                default: ''
            },
            iconClose: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: 'Please enter'
            }
        },
        data() {
            return {
                focus: false, // 输入框获取焦点
                inputVal: '', // 监听是否正在输入
                fieldStatus: true // 控制占位符是否显示
            }
        },
        watch: {
            value(n, o) {
                if (n === o) return;
                this.inputVal=n;
                if (!n) this.fieldStatus=true;
            },
            inputVal(n, o) {
                if (n === o) return;
                if (this.timer) clearTimeout(this.timer);
                this.timer=setTimeout(() => this.$emit('input', n), 0);
            }
        },
        // created() {
        //     const v=this.value;
        //     if (v) this.inputVal=v;
        // },
        methods: {
            // 输入框获取焦点
            inputFocus() {
                this.focus=true;
            },
            // 输入框失去焦点
            inputBlur() {
                this.focus=false;
            },
            // 输入框有值关闭占位符
            searchInput(e) {
                const v=e.data;
                this.fieldStatus = !v;
            },
        }
    }
</script>

<style lang="stylus">
.p-input
	display: inline-flex
	align-items: center
	border: 1px solid $grey-400
	border-radius: 4px
	width: 100%
	height: 32px
	transition: border 0.3s,box-shadow 0.3s
	&:hover
		border-color: $blue-500
	&.p-input-focus
		border-color: $blue-500
		box-shadow: $box-shadow-blue
	.p-input-icon-search
		display: inline-block
		padding-left: 8px
		width: 24px
		height: 30px
		line-height: @height
		text-align: center
		svg 
			vertical-align: middle
	.p-input-label
		position: relative
		width: calc(100% - 30px)
	.p-input-normal
		display: inline-block
		background: none
		width: 100%
		height: 30px
		line-height: @height
		font-size: 14px
	.p-placeholder
		position: absolute
		left: 8px
		top: 0
		color: $grey-400
		z-index: 1
	.p-input-text
		position: relative
		padding-left: 8px
		padding-right: 20px
		outline: none
		border: 0
		color: $grey-900
		z-index: 2
	.p-input-icon-close
		position: absolute
		top: 7px
		right: 0
		z-index: 3
		cursor pointer
		svg>path 
			transition fill .36s
		&:hover
			svg>path
				fill $blue-500
</style>