<template>
    <div class="Button">
        <div class="component component-padding">
            <h1>Select组件</h1>
            <div class="select-display-panel" >
                <div>
                    <h5>禁选状态</h5>
                    <Select  width="300" @change="testClick" :selectdata="dataSelect1"  :placeholder="'请选择'" /> 
                </div>
                <div>
                    <h5>主副双行-默认选中-单选</h5>
                    <Select  width="300" v-model="model"   @change="testClick"  :selectdata="dataSelect2"  :placeholder="'请选择'" /> 
                </div>
                <div>
                    <h5>头像-主副双行-单选-圆角</h5>
                    <Select  width="300"  radius  @change="testClick"  :selectdata="dataSelect3"  :placeholder="'请选择'" /> 
                </div>
                <div>
                    <h5>带标签-单选</h5>
                    <Select  width="300" caption="名称"  @change="testClick"   :selectdata="dataSelect4"  :placeholder="'请选择'" /> 
                </div>
                <div>
                    <h5>标签单选</h5>
                    <Select  width="300"  @change="testClick"  :selectdata="dataSelect4"  :placeholder="'请选择'" /> 
                </div>
            </div>

            <div class="select-display-panel">
                <div>
                    <h5>带分类多选</h5>
                    <Select  width="300"  :selectdata="dataSelect5" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple/> 
                </div>
                <div>
                    <h5>带标题多选</h5>
                    <Select  width="300"  :selectdata="dataSelect6" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple /> 
                </div>
                <div>
                    <h5>头像单行多选</h5>
                    <Select  width="300"   :selectdata="dataSelect7" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple /> 
                </div>
                <div>
                    <h5>头像带分类单行多选</h5>
                    <Select  width="300"   :selectdata="dataSelect8" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple /> 
                </div>
                <div>
                    <h5>头像带分类单行多选</h5>
                    <Select  width="300"   :selectdata="dataSelect8" @confirm="testConfirm" @cancel="testCancel" @change="testClick"   :placeholder="'请选择'" multiple /> 
                </div>
            </div>
             
        </div>
    </div>
</template>

<script>
const src ='http://47.95.122.141:8200/persagy_ui_kit/images/defaultImage.png'
export default {
    name: 'SelectView',
    data() {
        return {
            model:'test3',
            dataSelect1:[
                {id:'test1', name: '总量'},
                {id:'test2', name: '单平米'},
                {id:'test3', name: '下级分项', disabled:true },
                {id:'test4', name: '六个字的情况'},
                {id:'test5', name: '超过六个字的情况'}
            ],
            dataSelect2:[
                {id:'test1', name: '总量',sub:'副标题' },
                {id:'test2', name: '单平米',sub:'副标题' },
                {id:'test3', name: '下级分项',sub:'副标题' },
                {id:'test4', name: '滑动平均滑动平均',sub:'副标题'}
            ],
            dataSelect3: [
                {id:'test1', name: '总量3333', sub: 'hello111' ,src:src},
                {id:'test2', name: '单平米', sub: 'hola111',src:src},
                {id:'test3', name: '下级分项',sub: 'bonjour', src:src,divider:true},
                {id:'test4', name: '滑动平均滑动平均', sub:'hi',src:src}
            ],
            dataSelect4:[
                {id:'test1', name: '总量3333',label:"高级"},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', name: '下级分项', label:"初级"},
                {id:'test4', name: '滑动平均滑动平均', label:"低级"}
            ],
            dataSelect5:[
                {id:'test1', name: '总量3333', label:"高级"},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', name: '下级分项',  label:"初级",divider:true},
                {id:'test4', name: '滑动平均滑动平均',label:"低级"},
                {id:'test5', name: '滑动平均滑动平均',label:"低级"}
            ],
            dataSelect6:[
                {id:'test1', name: '总量3333',label:"高级"},
                {id:'test2', name: '单平米', label:"中级"},
                {id:'test3', classify:'分类一'},
                {id:'test4', name: '下级分项', label:"初级"},
                {id:'test5', classify:'分类二'},
                {id:'test6', name: '滑动平均滑动平均',label:"低级"},
                {id:'test7', name: '滑动平均滑动平均',label:"低级"}
            ],
            dataSelect7: [
                {id:'test1', name: '总量1111',src:src},
                {id:'test2', name: '总量2222',src:src},
                {id:'test3', name: '总量3333',src:src,divider:true},
                {id:'test4', name: '总量4444' ,src:src}
            ],
            dataSelect8: [
                {id:'test1', name: '总量3333',src:src},
                {id:'test2', name: '单平米', divider:true,src:src},
                {id:'test3', name: '六个字的情况',src:src, divider:true},
                {id:'test4', name: '超过六个字的情况' ,src:src},
                {id:'test1', name: '总量3333',src:src},
                {id:'test2', name: '单平米', divider:true,src:src},
                {id:'test3', name: '六个字的情况',src:src, divider:true},
                {id:'test4', name: '超过六个字的情况' ,src:src},
                {id:'test1', name: '总量3333',src:src},
                {id:'test2', name: '单平米', divider:true,src:src},
                {id:'test3', name: '六个字的情况',src:src, divider:true},
                {id:'test4', name: '超过六个字的情况' ,src:src}
            ],
        }
    },
    methods:{
        testClick (data) {
            console.log(data)
        },
        testConfirm (data) {
            console.log(data)
        },
        testCancel () {
            console.log(data)
        }
    }
}
</script>

<style lang="stylus" scoped>
    .select-display-panel
        display flex
        justify-content space-between
        margin-top 40px
        margin-bottom 240px
        padding 20px 60px
        h5
            margin-bottom 20px
</style>
