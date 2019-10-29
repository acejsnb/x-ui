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
    require: [path.join(__dirname, './src/assets/stylus/main.styl')],
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