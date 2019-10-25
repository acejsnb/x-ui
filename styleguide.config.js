module.exports = {

    title: 'persagy-ui',
    version: '1.1.1',
    components: 'src/components/**/[A-Z]*.vue',
    defaultExample: true,
    minimize: false,
    // ribbon: {
    //     text: 'Back to examples',
    //     url: 'https://vue-styleguidist.github.io/Examples.html'
    // },

    webpackConfig: require('./webpack.config.js'),


    usageMode: 'expand',
    exampleMode: 'expand',
    editorConfig: {
        theme: 'solarized dark'
    },
    compilerConfig: {
        target: { ie: 11 }
    },
    styleguideDir: 'persagy-ui',
    codeSplit: true // extract compiler and editor to accelerate first load
};