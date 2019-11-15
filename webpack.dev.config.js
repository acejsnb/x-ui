const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin'); // 自动生成index.html
const MiniCssExtractPlugin=require('mini-css-extract-plugin'); // 文本分离插件，分离js和css
const OptimizeCssAssetsPlugin=require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin'); // 清理垃圾文件

const WebpackBar = require('webpackbar');

const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue加载器
const PostStylus=require('poststylus'); // stylus加前缀
const HappyPack = require('happypack'); // 分块打包
const os=require('os');
const happyThreadPool=HappyPack.ThreadPool({ size: os.cpus().length });


// 获取本机ip
const get_ip=require('./get_ip')();

// 获取时间
const TimeFn=require('./get_time');
console.log(
    `
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\\  =  /O
               ____/\`---'\\____
             .'  \\\\|     |//  \`.
            /  \\\\|||  :  |||//  \\
           /  _||||| -:- |||||-  \\
           |   | \\\\\\  -  /// |   |
           | \\_|  ''\\---/''  |   |
           \\  .-\\__  \`-\`  ___/-. /
         ___\`. .'  /--.--\\  \`. . __
      ."" '<  \`.___\\_<|>_/___.'  >'"".
     | | :  \`- \\\`.;\`\\ _ /\`;.\`/ - \` : | |
     \\  \\ \`-.   \\_ __\\ /__ _/   .-\` /  /
======\`-.____\`-.___\\_____/___.-\`____.-'======
                   \`=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
               ${TimeFn()}
    `
);

/**
 *  css和stylus开发、生产依赖
 *  生产分离css
 */
const cssConfig=[
    'vue-style-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    },
    'postcss-loader'
]
    ,stylusConfig=[
    'vue-style-loader',
    {
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    },
    {
        loader: 'stylus-loader',
        options: {
            sourceMap: true
        }
    },{
        loader: 'style-resources-loader',
        options: {
            injector: 'prepend',
            patterns: path.resolve(__dirname, 'src/assets/stylus/variables.styl')
        }
    }
];

const config={
    entry: {
        index: './src/main.js' // 入口文件
    },
    output: {
        path: path.resolve(__dirname, 'production'),
        filename: '[name].js', // [name] 是entry的key
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:cssConfig
            },
            {
                test: /\.styl(us)?$/,
                use: stylusConfig
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        loaders:{
                            css: cssConfig,
                            stylus: stylusConfig
                        },
                        preserveWhitespace: false // 不要留空白
                    }
                }
            },
            {
                test: /\.js$/,
                use: 'happypack/loader?id=js_vue',
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.svg$/,
                loader: ['babel-loader', 'vue-svg-loader']
            },
            {
                test: /\.(png|jpe?g|gif|bmp)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 配置图片编译路径
                        limit: 8192, // 小于8k将图片转换成base64
                        name: '[name].[ext]?[hash:8]',
                        outputPath: 'images/'
                    }
                },{
                    loader: 'image-webpack-loader', // 图片压缩
                    options: {
                        bypassOnDebug: true
                    }
                }]
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: { // 配置html中图片编译
                        minimize: true
                    }
                }]
            },
            {test: /\.(mp4|ogg)$/,use: ['file-loader']},
            {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader:'url-loader',
                options:{
                    limit:8192,
                    name:'fonts/[name].[ext]?[hash:8]'
                }
            },
            { test: /\.md$/, use: 'text-loader' }
        ]
    },
    resolve: { // 配置路径别名
        extensions: ['.js', '.vue', '.styl', '.md'], // import引入文件的时候不用加后缀
        modules: [
            'node_modules'
            ,path.resolve(__dirname, 'src/assets')
            ,path.resolve(__dirname, 'src/components')
            ,path.resolve(__dirname, 'src/utils')
        ]
    },
    plugins: [
        new webpack.BannerPlugin(`@xs ${TimeFn()}`),
        new VueLoaderPlugin(), // vue加载器
        new HappyPack({
            id: 'js_vue', // id值，与loader配置项对应
            loaders: [{
                loader: `babel-loader?cacheDirectory=true`
            }], // 用什么loader处理
            threadPool: happyThreadPool, // 共享进程池
            verbose: true //允许 HappyPack 输出日志
        }),
        new webpack.LoaderOptionsPlugin({ // stylus加前缀
            options: {
                stylus: {
                    use: [
                        PostStylus(['autoprefixer']),
                    ]
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html') // 引入模版
            ,favicon: path.join(__dirname, 'src/assets/favicon.ico')
            ,filename: 'index.html'
            ,minify: { // 对index.html压缩
                collapseWhitespace: false // 去掉index.html的空格
                ,removeAttributeQuotes: false // 去掉引号
            }
            ,hash: true // 去掉上次浏览器的缓存（使浏览器每次获取到的是最新的html）
            // ,chunks:['vendor','main'] // 在产出的html文件里面引入哪些代码块，里面的名字要跟entry里面key对应(一般用于多文件入口)
            ,inlineSource:  '.(js|css)'
        }),
        new WebpackBar()
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'persagy-ui') // 将 dist 目录下的文件，作为可访问文件。
        , compress: true // 开启Gzip压缩
        // , host: 'localhost' // 设置服务器的ip地址，默认localhost
        , host: get_ip // 设置服务器的ip地址，默认localhost
        , port: 3001 // 端口号
        , open: true // 自动打开浏览器
        , hot: true
        , overlay: { // 当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true
        }
        ,historyApiFallback: { // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 /
            rewrites: [{ from: /./, to: '/' }]
        }
    }
};

module.exports=config;
