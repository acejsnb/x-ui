## 组件使用

1. Button
    ```
        type必传参数，值为default primary success warning error disabled，
        其中type=disabled是不会执行点击函数的，类型String;
        loading可选参数，true表示显示loading图标，类型Boolean
        size可选参数，可选值large medium(默认值) small，类型String
        
        <template>
            <div class="Button">
                <div class="component component-padding">
                    <h1>Button组件</h1>
                    <div class="btn">
                        <p>size=large</p>
                        <section class="list">
                            <Button type="default" size="large">default</Button>
                            <Button type="primary" size="large">primary</Button>
                            <Button type="success" size="large">success</Button>
                            <Button type="warning" size="large">warning</Button>
                            <Button type="error" size="large">error</Button>
                            <Button type="disabled" size="large">disabled</Button>
                            <Button type="primary" :loading="true" size="large">primary-loading</Button>
                        </section>
                    </div>
                    <div class="btn">
                        <p>size=medium（默认medium）</p>
                        <section class="list">
                            <Button type="default">default</Button>
                            <Button type="primary">primary</Button>
                            <Button type="success">success</Button>
                            <Button type="warning">warning</Button>
                            <Button type="error">error</Button>
                            <Button type="disabled">disabled</Button>
                            <Button type="primary" :loading="true">primary-loading</Button>
                        </section>
                        <section class="list">
                            <Button type="link">default</Button>
                        </section>
                    </div>
                    <div class="btn">
                        <p>size=small</p>
                        <section class="list">
                            <Button type="default" size="small">default</Button>
                            <Button type="primary" size="small">primary</Button>
                            <Button type="success" size="small">success</Button>
                            <Button type="warning" size="small">warning</Button>
                            <Button type="error" size="small">error</Button>
                            <Button type="disabled" size="small">disabled</Button>
                            <Button type="primary" :loading="true" size="small">primary-loading</Button>
                        </section>
                    </div>
                </div>
            </div>
        </template>
        
        <script>
            export default {
                name: "ButtonView"
            }
        </script>
        
        <style lang="stylus" scoped>
        .btn
          margin-bottom 16px
          p
            font-size 16px
            margin-bottom 8px
          .list
            margin-bottom 8px
        
        </style>
    ```
    
2.Modal
    ```
        
        show控制弹窗显示，类型Boolean，必须
        title弹窗标题，类型String，非必须
        iconLoading确定按钮是否显示，费必须
        mode full-全屏显示 default-(默认值)自适应宽高 small-最小对话框，非必须
        @close关闭弹窗回调
        @confirm确定按钮回调
    
        <template>
            <div class="Button">
                <div class="component component-padding">
                    <h1>Modal组件</h1>
                    <Button type="primary" @click="modalShowDefault">modalShowDefault</Button>
                    <Button type="primary" @click="modalShowFull">modalShowFull</Button>
                    <Button type="primary" @click="modalShowSmall">modalShowSmall</Button>
                    <!--
                        组件说明:
                            show
                            title
                            iconLoading
                            mode full-全屏显示 default-(默认值)自适应宽高 small-最小对话框
                            close
                            confirm
                    -->
                    <Modal
                            :show="modalStatusDefault"
                            title="弹窗提示"
                            :iconLoading="true"
                            mode="default"
                            @close="modalClose"
                            @confirm="modalConfirm"
                    >
                        <div style="font-size: 20px; width: 600px">
                            123
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            456
                        </div>
                    </Modal>
                    <Modal
                            :show="modalStatusFull"
                            title="弹窗提示"
                            :iconLoading="true"
                            mode="full"
                            @close="modalClose"
                            @confirm="modalConfirm"
                    >
                        <div style="font-size: 20px; width: 600px">
                            123
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            <br><br><br><br><br><br><br><br>
                            456
                        </div>
                    </Modal>
                    <Modal
                            :show="modalStatusSmall"
                            title="弹窗提示"
                            :iconLoading="true"
                            mode="small"
                            @close="modalClose"
                            @confirm="modalConfirm"
                    >
                        <div style="font-size: 20px;">
                            123
                            456
                        </div>
                    </Modal>
                    <div style="font-size: 16px;">
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                    </div>
                </div>
            </div>
        </template>
                
        <script>
            export default {
                name: 'ModalView',
                data() {
                    return {
                        modalStatusDefault: false,
                        modalStatusFull: false,
                        modalStatusSmall: false,
                    }
                },
                methods: {
                    modalShowDefault() {
                        this.modalStatusDefault=true
                    },
                    modalShowFull() {
                        this.modalStatusFull=true
                    },
                    modalShowSmall() {
                        this.modalStatusSmall=true
                    },
                    modalClose() {
                        this.modalStatusDefault=false;
                        this.modalStatusFull=false;
                        this.modalStatusSmall=false;
                    },
                    modalConfirm() {
                        console.log('alertConfirm')
                    },
                }
            }
        </script>
        
    ```
    
3.Drawer
    ```
    
        参数   说明           默认值   类型   是否必须
        show  控制弹窗隐藏显示 false   Boolean true
        title 弹窗标题  '' String false
        focus 是否自动关闭弹窗 false Boolean false
        iconLoading 点击确定是否出现loading效果 false Boolean false
        bottom 是否固定在底部 false Boolean false
        close 关闭弹窗函数 无  Function true
        confirm 关闭弹窗函数 无  Function false
    
        <template>
            <div class="Button">
                <div class="component component-padding">
                    <h1 @click="drawerShow">Drawer组件</h1>
                    <Button type="primary" @click="drawerShow">drawerShow</Button>
                    <Drawer
                            :show="drawerStatus"
                            title="弹窗提示"
                            :focus="false"
                            :iconLoading="true"
                            :bottom="true"
                            @close="drawerClose"
                            @confirm="drawerConfirm"
                    >
                        <div style="width: 500px;font-size: 20px">
                            123
                            456
                            789
                        </div>
                    </Drawer>
                    <div style="font-size: 16px;">
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                        <br><br><br><br><br><br><br><br>
                    </div>
                </div>
            </div>
        </template>
        
        <script>
            export default {
                name: 'DrawerView',
                data() {
                    return {
                        drawerStatus: false
                    }
                },
                methods: {
                    drawerShow() {
                        this.drawerStatus=true
                    },
                    drawerClose() {
                        this.drawerStatus=false
                    },
                    drawerConfirm() {
                        console.log('alertConfirm')
                    },
                }
            }
        </script>
    
    ```

000000000. Message
    ```
    Message有四个方法：
    1.info：this.$message.info('这是一条消息');
    2.success：this.$message.success('Oh,yes');
    3.warning：this.$message.warning('Oh,no');
    4.error：this.$message.error('Oh,error');
    可单独调用，也可通过传入json对象形势调用，需注意，通过json调用需传入type和message两个属性。
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>Message组件</h1>
                <Button type="default" @touchend="messageInfo">info</Button>
                <Button type="normal" @touchend="messageSuccess">success</Button>
                <Button type="warning" @touchend="messageWarning">warning</Button>
                <Button type="error" @touchend="messageError">error</Button>
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "MessageView",
            methods: {
                messageInfo() {
                    this.$message.info('这是一条消息');
                },
                messageSuccess() {
                    this.$message.success('Oh,yes');
                },
                messageWarning() {
                    this.$message.warning('Oh,no');
                },
                messageError() {
                    this.$message({
                        type: 'error',
                        message: '错了哦，这是一条错误消息'
                    });
                },
            }
        }
    </script>
    ```
000000000. List
    ```
    List组件的data参数类型是Array，格式：[{title: 'xxx'}, more: 'more', url: 'url'],
    其中title是列表显示的名字，必传蚕食、
    more是小标题，可选参数、
    url是要跳转到的路由、可选参数。
    
    <template>
        <div class="Button">
            <div class="component component-padding">
                <h1>List组件</h1>
                <List :data="listData" />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "ListView",
            data() {
                return {
                    listData: [
                        {title: '已支付'},
                        {title: '未支付', more: '更多', url: 'url1'},
                        {title: '售后', more: '查看', url: 'url2'},
                    ],
                }
            }
        }
    </script>
    ```

000000000. Toggle
    ```
    v-model:双向绑定的值
    
    <template>
        <div class="toggleView">
            <div class="component component-padding">
                <h1>Toggle组件</h1>
                <Toggle v-model="toggleVal" />
                <Toggle v-model="toggleVal2" />
            </div>
        </div>
    </template>
    
    <script>
        export default {
            name: "ToggleView",
            data() {
                return {
                    toggleVal: true,
                    toggleVal2: false
                }
            },
            watch: {
                toggleVal(now, old) {
                    if (now !== old) console.log(now);
                }
            }
        }
    </script>
    ```








