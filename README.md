# x-ui：
- 基于vue的ui库

## config
- 开发预览 `webpack.config.js`
- 开发预览文档 `webpack.dev.config.js`
- 文档打包 `webpack.prod.config.js`
- 所有组件打包 `webpack.components.config.js`
- 单组件打包 `webpack.single.config.js`


## 安装
- `npm install -S xxx`

## 全局引入
```
    import Xx from 'xxx';
    import 'xxx/dist/index.css'；
    
    Vue.use(Pui);
```
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "xxx",
            "camel2Dash": false,
            "libDir": "dist",
            "style": false
          }
    ]
```

## 按需引入
- 引入组件 `import { Button } from 'xxx''`
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```json
    [
          "component",
          {
            "libraryName": "xxx",
            "camel2Dash": false,
            "libDir": "dist",
            "styleLibrary": { "name": "theme", "base": true }
          }
    ]
```

## 启动说明
- npm run dev ` 启动开发预览 `
- npm run prod ` 打包成静态 `
- npm run components ` 打包所有组件 `
- npm run single ` 打包单个组件 `
- npm run styleguide ` 启动开发文档预览 `
- npm run styleguide:build ` 打包文档 `
    
