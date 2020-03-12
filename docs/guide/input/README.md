### antd-Input 功能性提示

`该组件使用ant-design-vue，更多使用方式详见ant-design-vue` [Input]](https://www.antdv.com/components/input-cn/)

### 配置方式
1、安装依赖
- `npm i -D less`
- `npm i -D less-loader`
- `npm i -D babel-plugin-import`

2.配置.babelrc
- ```
    "plugins": [
      ["import", { "libraryName": "ant-design-vue", "libraryDirectory": "es", "style": true }]
    ]
  ```
3.配置less颜色覆盖
- ```
    {
        test: /\.less$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
        }, {
            loader: 'less-loader',
            options: {
                modifyVars: {
                    "@font-family": "PingFangSC_boldface",
                    "primary-color": "#0091ff",
                    "link-color": "#0091ff",
                    "success-color": "#34c724",
                    "warning-color": "#ffc60a",
                    "error-color": "#f54e45",
                    "heading-color": "#1f2329",
                    "border-color-base": "#c3c6cb",
                    "tooltip-bg": "rgba(31,36,41,.8)"
                },
                javascriptEnabled: true
            }
        }
        ]
    }
  ```