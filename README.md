# pxany-loader
px/rpx转rem、vw单位无侵入性方案，支持自定义单位

## Install
`npm install pxany-loader`

## Usage

webpack
```
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            ...
            'css-loader',
            {
              loader: 'pxany-loader',
              options: {
                type: 'rem',
                screenWidth: 375,
              }
            }
          ]
        }
      ]
    },
```
vue-cli chainWebpack
```
  chainWebpack: config => {
    config.module
      .rule('less')
      .test(/\.less$/)
      .oneOf('vue')
      .use('pxany-loader')
      .loader('pxany-loader')
      .before('postcss-loader')
      .options({
        type: 'rem',
        screenWidth: 375,
        extendSuffix: ['px', 'pt'],
        exclude: /src\/components/
      }).end()
  }
```

## Example
```
unit
width: 37.5px; -> width: 1rem; 
width: 37.5rpx; -> width: 1rem; 

no transform
width: 1px; -> width: 1px; 
width: 100px; /* no */ -> width: 100px; 
```

## API
```
    "type": {
      "description": "目标转换单位(rem, vw)",
      "type": "string",
      "link": ""
    },
    <!-- rem模式remUnit优先级最高  -->
    "remUnit": {
      "description": "rem单位，默认screenWidth/10",
      "type": "number",
      "link": ""
    },
    "screenWidth": {
      "description": "设计稿屏幕宽度",
      "type": "number",
      "link": ""
    },
    "precision": {
      "description": "保留小数点精度",
      "type": "number",
      "link": ""
    },
    "extendSuffix": {
      "description": "扩展单位(pz,pt,rpx...)",
      "type": "array",
      "link": ""
    },
    "minPx": {
      "description": "最小单位,不转换",
      "type": "number",
      "link": ""
    },
    "exclude": {
      "description": "不处理文件",
      "instanceof": "RegExp",
      "link": ""
    }
```