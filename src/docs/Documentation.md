
### 使用说明
# persagy-ui：
- 基于vue的ui库，github地址 `ssh://git@101.254.183.198:5522/bi-web/persagy-ui-kit.git`

## 一、安装
- `npm install -S persagy-ui`

## 二、全局引入

```clike
    import Pui from 'persagy-ui';
    Vue.use(Pui);
```

## 三、推荐-按需引入-方式一（不用配置主题色）

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
        "style": true
      }
    ]
```

## 四、按需引入-方式二（自定义主题色）

- ***本项目样式使用stylus开发，需要自定义主题色请按照以下说明配置***
---


1.安装style-resources-loader
 - `npm i -D style-resources-loader`

2.新建variables.styl文件，放在src目录下

```clike
/* base-color -start */
// primary
$primary-blue-900=#004275
$primary-blue-600=#007cdb
$primary-blue-500=#0091ff
$primary-blue-400=#4eb1fd
$primary-blue-300=#82c7fc
$primary-blue-200=#bae0fd
$primary-blue-100=#e1f2ff
$primary-blue-50=#f0f8ff

// success
$success-green-600=#2ea121
$success-green-500=#34c724
$success-green-400=#62d256
$success-green-300=#8ee085
$success-green-100=#eef6c6
$success-green-50=#f0fbef

// success2
$success-turquoise-600=#04b49c
$success-turquoise-500=#00d6b9
$success-turquoise-400=#14e1c6
$success-turquoise-300=#64e8d6
$success-turquoise-200=#a9efe6
$success-turquoise-100=#d5f6f2
$success-turquoise-50=#eafaf8

// secondary
$secondary-cyan-400=#03b5da
//$secondary-cyan
//$secondary-cyan

// warning
$warning-orange-600=#de7802
$warning-orange-500=#ff8800
$warning-orange-400=#ffa53d
$warning-orange-300=#f7dc82
$warning-orange-100=#faf1d1
$warning-orange-50=#fff5eb

// grey
$grey-grey-900=#1f2429
$grey-grey-600=#646c73
$grey-grey-500=#8d9399
$grey-grey-400=#c3c7cb
$grey-grey-300=#e4e5e7
$grey-grey-200=#eff0f1
$grey-grey-100=#f5f6f7

// error
$error-red-600=#d83931
$error-red-500=#f54e45
$error-red-400=#f76b64
$error-red-300=#f9908b
$error-red-200=#eff0f1
$error-red-100=#fde3e2
$error-red-50=#fef2f1

/* base-color -end */
```

3.在config里配置引入色值变量，如下

```clike
    {
        test: /\.styl(us)?$/,
        use: [
            {
                loader: 'stylus-loader',
                options: {
                    sourceMap: !isProd
                }
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

5.安装svg解析器
- `npm i -D vue-svg-loader`