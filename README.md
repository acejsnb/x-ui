# s-vue-ui：
- 基于vue的ui库，github地址 `https://github.com/xiongshuang/persagy-ui.git`

## config
- 所有组件打包到一起 `webpack.config.js`
- 组件单独打包 `webpack.single.config.js`

## components.json
- 组件引用路径

## 安装
- `npm install -S persagy-ui`

## 全局引入
```
    import Sui from 'persagy-ui';
    
    Vue.use(Sui);
```
## 按需引入
- 安装依赖包   `npm i -D babel-plugin-component`
- 在 .babelrc中的plugins里添加
```
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "styleLibrary": {
          "name": "theme",
          "base": false
        }
      }
    ]
```
- 使用
```
    <template>
      <div class="app">
        <Button type="default">default</Button>
        <Button type="primary">normal</Button>
        <Button type="success">warning</Button>
        <Button type="warning">warning</Button>
        <Button type="error">error</Button>
        <Button type="disabled">disabled</Button>
      </div>
    </template>
    
    <script>    
      import { Button } from 'persagy-ui';
      export default {
        name: 'App',
        components: { Button }
      }
    <script>
```
    
