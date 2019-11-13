const path = require('path');
/**
 * 判断是生产环境还是开发环境
 * @type {boolean}
 * isProd为true表示生产
 */
const isProd=process.env.NODE_ENV==='production';


module.exports = {
    title: 'persagy-ui', // 文档的标题
    version: '1.1.1',
    components: 'src/components/**/[A-Z]*.vue', // 组件的目录
    defaultExample: true, // 是否使用默认样例
    require: [path.join(__dirname, './src/assets/stylus/main.styl'), path.join(__dirname, './src/assets/stylus/styleguide.styl')],
    sections: [
        {
            name: '使用说明',
            content: './src/docs/Documentation.md',
            description: 'persagy-ui使用说明文档',
        },
        {
            name: 'Components',
            sections: [
                {
                    name: '按钮',
                    components: './src/components/button/Button.vue'
                },
                {
                    name: '面包屑',
                    components: './src/components/breadcrumb/Breadcrumb.vue'
                },
                {
                    name: '徽标',
                    components: './src/components/badge/Badge.vue'
                },
                {
                    name: '右侧拉窗',
                    components: './src/components/drawer/Drawer.vue'
                },
                {
                    name: '标签页',
                    components: './src/components/tabs/Tabs.vue'
                },
                {
                    name: '开关',
                    components: './src/components/toggle/Toggle.vue'
                },
                {
                    name: '树形结构',
                    components: './src/components/tree/Tree.vue'
                },
                {
                    name: '下拉选择',
                    sections: [
                        {
                            name: '点击显示下拉列表',
                            components: './src/components/select/Select.vue'
                        },
                        {
                            name: 'hover显示下拉列表',
                            components: './src/components/dropdown/Dropdown.vue'
                        },
                        {
                            name: 'hover显示下拉列表组',
                            components: './src/components/dropgroup/Dropgroup.vue'
                        }
                    ]
                },
                {
                    name: '弹窗',
                    sections: [
                        {
                            name: '模态框',
                            components: './src/components/modal/Modal.vue'
                        },
                        {
                            name: '消息提示',
                            components: './src/components/message/Message.vue'
                        }
                    ]
                },
                {
                    name: '时间选择组件',
                    sections: [
                        {
                            name: '时分秒选择',
                            components: './src/components/pickertime/Pickertime.vue'
                        },
                        {
                            name: '日选择',
                            components: './src/components/pickerday/Pickerday.vue'
                        },
                        {
                            name: '月选择',
                            components: './src/components/pickermonth/Pickermonth.vue'
                        },
                        {
                            name: '年选择',
                            components: './src/components/pickeryear/Pickeryear.vue'
                        }
                    ]
                },
                {
                    name: '多维组件',
                    sections: [
                        {
                            name: '头部封装',
                            components: './src/components/headers/Headers.vue'
                        }
                    ]
                }
            ],
            sectionDepth: 1
        }
    ],
    //simpleEditor: false, // 文档可编辑
    //pagePerSection: true,
    showSidebar: true,
    /*
    theme: {
        baseBackground: '#fdfdfc',
        link: '#1f2429',
        linkHover: '#0091ff',
        border: '#e0d2de',
        font: ['Helvetica', 'sans-serif']
    },
    */
    minimize: false,
    // ribbon: {
    //     text: 'Back to examples',
    //     url: 'https://vue-styleguidist.github.io/Examples.html'
    // },

    webpackConfig: isProd?require('./webpack.prod.config.js'):require('./webpack.dev.config.js'),


    usageMode: 'expand', // 是否展开用法
    exampleMode: 'expand', // 是否展开示例代码
    editorConfig: {
        // theme: 'solarized'
        // theme: 'night'
        theme: 'solarized dark'
    },
    compilerConfig: {
        target: { ie: 11 }
    },
    styleguideDir: 'persagy-ui', // 打包目录
    styleguidePublicPath: isProd?'./':'/', // 打包目录
    // codeSplit: true, // 代码拆分
    skipComponentsWithoutExample: true,    // 是否跳过没有样例的组件
    serverPort: '7070', // 监听的端口
};
