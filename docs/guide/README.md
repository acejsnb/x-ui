
### 使用说明

::: tip
当前版本：0.7.8<br>
:::

::: warning
注意：此UI组件库并没有专职人员测试，<br>
若在您使用过程中发现bug，请记录下并告知PUD部门的熊双或周忠文。<br>
谢谢合作。
:::

::: danger
该文档不支持IE11及以下浏览器，请使用现代浏览器（如：Chrome）浏览该文档
:::

# persagy-ui：
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/bi-web/persagy-ui-kit.git`

## 一、安装
- `npm install -S persagy-ui`

## 二、全局引入

```clike
    import Pui from 'persagy-ui';
    import 'persagy-ui/dist/index.css'
    Vue.use(Pui);
```

- 在 .babelrc中的plugins里添加

```json
    [
        "component",
        {
          "libraryName": "persagy-ui",
          "camel2Dash": false,
          "libDir": "dist",
          "style": false
        }
    ]
```

## 三、推荐-按需引入-方式一
（不用配置主题色）

- 引入组件 `import { Button } from 'persagy-ui''`
- 安装依赖包 `npm i -D babel-plugin-component`

- 在 .babelrc中的plugins里添加

```json
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "camel2Dash": false,
        "libDir": "dist",
        "styleLibrary": { "name": "theme", "base": true, "path": "[module]/style.css", "mixin": true }
      }
    ]
```

## 四、按需引入-方式二
（自定义主题色）

::: tip
本项目样式使用stylus开发，需要自定义主题色请按照以下说明配置
:::

---

1.新建variables.styl文件，放在src目录下

```stylus
/* base-color -start */
// blue
$blue-900=#004275
$blue-800=#00518f
$blue-700=#0065b3
$blue-600=#007cdb
$blue-500=#0091ff
$blue-400=#4eb1fd
$blue-300=#82c7fc
$blue-200=#bae0fd
$blue-100=#e1f2ff
$blue-50=#f0f9ff

// cyan
$cyan-900=#00647a
$cyan-800=#00758f
$cyan-700=#0088a7
$cyan-600=#009ec1
$cyan-500=#00add4
$cyan-400=#26b9da
$cyan-300=#4dc6e1
$cyan-200=#80d7ea
$cyan-100=#b2e6f2
$cyan-50=#e0f5fa

// turquoise
$turquoise-900=#024b41
$turquoise-800=#036356
$turquoise-700=#078372
$turquoise-600=#04b49c
$turquoise-500=#00d6b9
$turquoise-400=#14e1c6
$turquoise-300=#64e8d6
$turquoise-200=#a9efe6
$turquoise-100=#d5f6f2
$turquoise-50=#eafaf8

// green
$green-900=#124b0c
$green-800=#186010
$green-700=#237b19
$green-600=#2ea121
$green-500=#34c724
$green-400=#62d256
$green-300=#8ee085
$green-200=#b7edb1
$green-100=#eef6c6
$green-50=#f0fbef

// lime
$lime-900=#374200
$lime-800=#495700
$lime-700=#667901
$lime-600=#8fac02
$lime-500=#b3d600
$lime-400=#c3dd40
$lime-300=#d2e76a
$lime-200=#dfee96
$lime-100=#eef6c6
$lime-50=#f6fae5

// yellow
$yellow-900=#5c4700
$yellow-800=#795d01
$yellow-700=#aa8303
$yellow-600=#dcaa04
$yellow-500=#ffc60a
$yellow-400=#fad355
$yellow-300=#f7dc82
$yellow-200=#f8e6ab
$yellow-100=#faf0d1
$yellow-50=#fdf9ed

// orange
$orange-900=#6b3900
$orange-800=#8f4f04
$orange-700=#b26206
$orange-600=#de7802
$orange-500=#f58300
$orange-400=#ffa53d
$orange-300=#ffba6b
$orange-200=#fed4a4
$orange-100=#feead2
$orange-50=#fff6eb

// red
$red-900=#621c18
$red-800=#812520
$red-700=#ac2f28
$red-600=#d83931
$red-500=#f54e45
$red-400=#f76b64
$red-300=#f9908b
$red-200=#eff0f1
$red-100=#fde3e2
$red-50=#fef2f1

// carmine
$carmine-900=#520a33
$carmine-800=#7a0f4b
$carmine-700=#9e1361
$carmine-600=#c71077
$carmine-500=#f01d94
$carmine-400=#f14ba9
$carmine-300=#f57ac0
$carmine-200=#f9aed9
$carmine-100=#fdddef
$carmine-50=#fef1f8

// purple
$purple-900=#460b46
$purple-800=#681268
$purple-700=#8c218c
$purple-600=#b320b3
$purple-500=#d136d1
$purple-400=#db66db
$purple-300=#e58fe5
$purple-200=#efb9ef
$purple-100=#f8def8
$purple-50=#fceefc

// grey
$grey-900=#1f2429
$grey-800=#333940
$grey-700=#454d54
$grey-600=#646c73
$grey-500=#8d9399
$grey-400=#c3c7cb
$grey-300=#e4e5e7
$grey-200=#eff0f1
$grey-100=#f5f6f7
$grey-50=#f8f9fa

/* base-color -end */
```

2.在config里配置引入色值变量，如下

 - 安装style-resources-loader `npm i -D style-resources-loader`

```clike
    {
        test: /\.styl(us)?$/,
        use: [
            {
                loader: 'stylus-loader'
            },{
                loader: 'style-resources-loader',
                options: {
                    injector: 'prepend',
                    patterns: path.resolve(__dirname, 'src/assets/stylus/variables.styl')
                }
            }
        ]
    }
```

4.配置svg解析
- 安装svg解析器 `npm i -D vue-svg-loader`
```clike
     {
         test: /\.svg$/,
         loader: ['babel-loader', 'vue-svg-loader']
     }
```

5.配置.babelrc

```json
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "camel2Dash": false,
        "libDir": "lib",
        "style": false
      }
    ]
```

## 五、在vue cli3.x中使用

- 首先安装依赖包 `npm i -D babel-plugin-component`

1.全局引入

- 配置babel.config.js

```js
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "camel2Dash": false,
        "libDir": "dist",
        "style": false
      }
    ]
  ]
};
```

-.在main.js中添加

```clike
import Pui from "persagy-ui";
import "persagy-ui/dist/index.css";
Vue.use(Pui);

```

2.按需引入

- 配置babel.config.js

```js
module.exports = {
  plugins: [
    [
      "component",
      {
        "libraryName": "persagy-ui",
        "camel2Dash": false,
        "libDir": "dist",
        "styleLibrary": { "name": "theme", "base": true, "path": "[module]/style.css", "mixin": true }
      }
    ]
  ]
};
```

- 在组建中引用

```clike
import { Button, Toggle } from 'persagy-ui';
components: { Button, Toggle }
```