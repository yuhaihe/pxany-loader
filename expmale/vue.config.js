module.exports = {

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
}