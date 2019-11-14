# persagy-ui：
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/bi-web/persagy-ui-kit.git`

## config
- 所有组件打包到一起 `webpack.config.js`
- 组件单独打包 `webpack.single.config.js`

## components.json
- 组件引用路径

## 安装
- `npm install -S persagy-ui`

## 全局引入
```
    import Pui from 'persagy-ui';
    
    Vue.use(Pui);
```
## 按需引入
- 引入组件 `import { Button } from 'persagy-ui''`
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "camel2Dash": false,
        "styleLibrary": {
          "name": "theme",
          "base": true,
          "path": "[module]/index.css",
          "mixin": true
        }
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
    
