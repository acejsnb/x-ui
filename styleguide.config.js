const path = require('path');
module.exports = {

    title: 'persagy-ui',
    version: '1.1.1',
    components: 'src/components/**/[A-Z]*.vue',
    defaultExample: true,
    require: [path.join(__dirname, './src/assets/stylus/main.styl')],
    //simpleEditor: false, // 文档可编辑
    //pagePerSection: true,
    showSidebar: true,
    theme: {
        baseBackground: '#fdfdfc',
        link: '#1f2429',
        linkHover: '#0091ff',
        border: '#e0d2de',
        font: ['Helvetica', 'sans-serif']
    },
    minimize: false,
    // ribbon: {
    //     text: 'Back to examples',
    //     url: 'https://vue-styleguidist.github.io/Examples.html'
    // },

    webpackConfig: require('./webpack.config.js'),


    usageMode: 'expand',
    exampleMode: 'expand',
    editorConfig: {
        // theme: 'solarized'
        // theme: 'night'
        theme: 'solarized dark'
    },
    compilerConfig: {
        target: { ie: 11 }
    },
    styleguideDir: 'persagy-ui', // 打包目录
    codeSplit: true // 代码拆分
};