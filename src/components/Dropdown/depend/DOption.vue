<template>
    <transition name="selectDownUpExtend">
        <section
                tabindex="-1"
                ref="dropOption"
                :class="['p-drop-option', 'p-drop-option-'+position]"
                v-show="optionStatus"
                @blur="dropOptionBlur"
        >
            <article
                    :class="['p-drop-option-item', value===item.id&&'option-selected', item.disabled&&'p-drop-option-disable']"
                    v-for="item in data"
                    :key="item.id"
                    @click="optionClick(item.id, item.disabled)"
                    @mouseenter="optionEnter"
            >
                <i class="p-drop-option-svg" v-if="item.icon" v-html="item.icon"/>
                <span>{{item.name}}</span>
            </article>
        </section>
    </transition>
</template>

<script>
    export default {
        name: "DOption",
        data() {
            return {
                optionStatus: false, // 下拉菜单状态
                value: '',
                data: [],
                position: 'left'
            }
        },
        watch: {
            optionStatus(n) {
                if (n) {
                    this.$nextTick(() => {
                        this.$refs.dropOption.focus()
                    })
                }
            }
        },
        methods: {
            /**
             * 提交当前选择的值
             * @param id 返回值
             * @param disabled 是否禁用点击
             */
            optionClick(id, disabled) {
                if (disabled) return;
                this.$emit('change', id);
            },
            optionEnter(e) {
                const target=e.target;
                const {clientWidth, scrollWidth, title}=target;
                if (!title && scrollWidth > clientWidth) target.title=target.innerText;
            },
            // 鼠标数去焦点
            dropOptionBlur() {
                this.optionStatus=false;
            }
        }
    }
</script>
