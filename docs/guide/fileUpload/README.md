### FileUpload 文件上传组件

<template>
	<div class="FileUpload">
		<h1>FileUploadView组件</h1>
		<div class="component component-padding">
			<h2>组件类型 可选【 base drop 】</h2>
			<div class="upload">
				<section class="list">
					<FileUpload
						hosts='http://47.95.122.141:8205/domita/backend'
						action="/base/attachment/uploadX"
						:multiple="true"
						@change="changeFile"
						:maxNumber='10'
					/>
				</section>
				<section class="list">
					<FileUpload
						type="drop"
						:maxNumber='7'
						hosts='http://47.95.122.141:8205/domita/backend'
						action="/base/attachment/uploadX"
						:multiple="true"
						@change="changeFile"
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "FileUploadView",
		data() {
			return {
				//  音频类
				// 	*.3gpp，*.ac3，*.asf，*.au，*.mp2，*.mp3，*.aac，*.adpcm，*.amr，
				// 	*.dsd，*.mp1，*.pcm，*.wma，*.wax
				// 	视频类
				// 	*.mp4，*.mpeg，*.mpg，*.avi，*.flv，*.m3u8，*.asf，*.wmv，*.mkv，
				// 	*.mov，*.ts，*.webm，*.3gp
				// 	文档类
				// 	*.css，*.csv，*.doc，*.dot，*.dtd，*.pdf，*.pot，*.pps，*.ppt，*.rtf，
				// 	*.txt，*.wps，*.xlc，*.xlm，*.xls，*.xlsm，*.xlsx，*.docx，*.pptx，*.odt，
				// 	*.xlsb，*.one，*.onetoc2，*.ppsm，*.ppsx，*.pptm，*.docm，*.dotm，
				// 	*.dotx，*.ods，
				// 	图片类
				// 	*.gif，*.jp2，*.jpe，*.jpeg，*.jpg，*.png，*.svf，*.tif，*.tiff，*.bmp，*.ai，
				// 	*.psd，*.eps
				// 	压缩文件
				// 	*.zip，*.rar
				// 	AutoCAD
				// 	*.dwg，*.dxf，*.dwt，*.dws
				// 	三维图纸格式
				// 	*.step，*.stp，*.part
				/**
				 * 可上传的文件数
				 */
				maxNumber:4,
				/**
				 * 接受上传的文件类型  
				 */
				accept: {
					type: Array,
					default: () => ['3gpp','ac3','asf','au','mp2','mp3','aac','adpcm','amr','dsd','mp1','pcm','wma','wax','mp4','mpeg','mpg',
							'avi','flv','m3u8','asf','wmv','mkv','mov','ts','webm','3gp','css','csv','doc','dot','dtd','pdf','pot','pps','ppt','rtf','txt',
							'wps','xlc','xlm','xls','xlsm','xlsx','docx','pptx','odt','xlsb','one','onetoc2','ppsm','ppsx','pptm','docm','dotm','dotx',
							'ods','gif','jp2','jpe','jpeg','jpg','png','svf','tif','tiff','bmp','ai','psd','eps','zip','rar','dwg','dxf','dwt','dws','step',
							'stp','part']
				},
				/**
				 * 上传是否可以选择多个
				 */
				multiple: {
					type: Boolean,
					default: true
				},
			}
		},
		methods: {
			changeFile(data) {
				console.log(data)
			}
		}
    }
</script>

<style lang="stylus" scoped>
.FileUpload
	.upload
		margin-top 20px
		display flex
		.list
			margin-right 20px
</style>


### 代码演示

```vue

<template>
	<div class="FileUpload">
		<h1>FileUploadView组件</h1>
		<div class="component component-padding">
			<h2>组件类型 可选【 base drop 】</h2>
			<div class="upload">
				<section class="list">
					<FileUpload
						hosts='http://47.95.122.141:8205/domita/backend'
						action="/base/attachment/uploadX"
						:multiple="true"
						@change="changeFile"
						:maxNumber='10'
					/>
				</section>
				<section class="list">
					<FileUpload
						type="drop"
						:maxNumber='7'
						hosts='http://47.95.122.141:8205/domita/backend'
						action="/base/attachment/uploadX"
						:multiple="true"
						@change="changeFile"
					/>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		name: "FileUploadView",
		data() {
			return {
				//  音频类
				// 	*.3gpp，*.ac3，*.asf，*.au，*.mp2，*.mp3，*.aac，*.adpcm，*.amr，
				// 	*.dsd，*.mp1，*.pcm，*.wma，*.wax
				// 	视频类
				// 	*.mp4，*.mpeg，*.mpg，*.avi，*.flv，*.m3u8，*.asf，*.wmv，*.mkv，
				// 	*.mov，*.ts，*.webm，*.3gp
				// 	文档类
				// 	*.css，*.csv，*.doc，*.dot，*.dtd，*.pdf，*.pot，*.pps，*.ppt，*.rtf，
				// 	*.txt，*.wps，*.xlc，*.xlm，*.xls，*.xlsm，*.xlsx，*.docx，*.pptx，*.odt，
				// 	*.xlsb，*.one，*.onetoc2，*.ppsm，*.ppsx，*.pptm，*.docm，*.dotm，
				// 	*.dotx，*.ods，
				// 	图片类
				// 	*.gif，*.jp2，*.jpe，*.jpeg，*.jpg，*.png，*.svf，*.tif，*.tiff，*.bmp，*.ai，
				// 	*.psd，*.eps
				// 	压缩文件
				// 	*.zip，*.rar
				// 	AutoCAD
				// 	*.dwg，*.dxf，*.dwt，*.dws
				// 	三维图纸格式
				// 	*.step，*.stp，*.part
				/**
				 * 可上传的文件数
				 */
				maxNumber:4,
				/**
				 * 接受上传的文件类型  
				 */
				accept: {
					type: Array,
					default: () => ['3gpp','ac3','asf','au','mp2','mp3','aac','adpcm','amr','dsd','mp1','pcm','wma','wax','mp4','mpeg','mpg',
							'avi','flv','m3u8','asf','wmv','mkv','mov','ts','webm','3gp','css','csv','doc','dot','dtd','pdf','pot','pps','ppt','rtf','txt',
							'wps','xlc','xlm','xls','xlsm','xlsx','docx','pptx','odt','xlsb','one','onetoc2','ppsm','ppsx','pptm','docm','dotm','dotx',
							'ods','gif','jp2','jpe','jpeg','jpg','png','svf','tif','tiff','bmp','ai','psd','eps','zip','rar','dwg','dxf','dwt','dws','step',
							'stp','part']
				},
				/**
				 * 上传是否可以选择多个
				 */
				multiple: {
					type: Boolean,
					default: true
				},
			}
		},
		methods: {
			changeFile(data) {
				console.log(data)
			}
		}
    }
</script>

<style lang="stylus" scoped>
.FileUpload
	.upload
		margin-top 20px
		display flex
		.list
			margin-right 20px
</style>

```

### Attributes


| 参数     | 说明  | 类型    | 默认值  | 必须    |
| ------- | ---- | ------ | ------- | ------ |
| type    | 组件类型可选【 base drop 】 | String | base | No |
| hosts    | 文件请求服务根地址 | String | 无 | Yes |
| action    | 文件上传请求的接口 | String | 无 | Yes |
| maxNumber    | 可上传文件数【最大为9】 | number | 4 | No |
| multiple    | 上传是否可以选择多个 | Boolean | true | No |
| accept    | 接受上传的文件类型 【默认值里选】 | Array | 见下表 | No |
| @change    | 文件列表改变 | Function | -- | No |

### Attributes
| 默认值/可选值  | 
| ------- | 
| ['3gpp','ac3','asf','au','mp2','mp3','aac','adpcm','amr','dsd','mp1','pcm','wma','wax','mp4',mpeg','mpg','avi','flv','m3u8','asf','wmv','mkv','mov','ts','webm','3gp','css','csv','doc','dot','dtd','pdf','pot','pps','ppt','rtf','txt',
'wps','xlc','xlm','xls','xlsm','xlsx','docx','pptx','odt','xlsb','one','onetoc2','ppsm','ppsx','pptm','docm','dotm','dotx','ods','gif','jp2','jpe','jpeg','jpg','png','svf','tif','tiff','bmp','ai','psd','eps','zip','rar','dwg','dxf','dwt','dws','step','stp','part']|