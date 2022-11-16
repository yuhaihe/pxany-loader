/**
 * 
 * module.exports = {
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
    plugins: [...]
  }
 */
