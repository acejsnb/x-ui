
### 使用说明
# persagy-ui：
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/bi-web/persagy-ui-kit.git`

## 安装
- `npm install -S persagy-ui`

## 全局引入
```text
    import Pui from 'persagy-ui';
    
    Vue.use(Pui);
```
## 按需引入
- 引入组件 `import { Button } from 'persagy-ui''`
- 安装依赖包   `npm i -D babel-plugin-component`

- 在 .babelrc中的plugins里添加
```text
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
