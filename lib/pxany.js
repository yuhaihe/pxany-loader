const css = require('css') // css字符串转换ast，ast在转为css代码
// const fs = require('fs')
// const path = require('path')

const defaultConfig = {
  screenWidth: 375, // 设计稿屏幕宽度
  precision: 4, // 保留小数点精度
  extendSuffix: ['px'], // 支持的转换单位， 默认 ['px']
  minPx: 1
}

class Px2rem {
  constructor(config) {
    this.options = Object.assign(defaultConfig, config)

    const suffixStr = this.options.extendSuffix.join('|')
    this.regExp = new RegExp(`\\b(\\d+(\\.\\d+)?)(${suffixStr})\\b`)  // 转换字符串的正则匹配
  }

  generateRem(source) {
    // css转换为ast
    const astObj = css.parse(source)
    // css-ast格式文件本地查看
    // fs.writeFile(path.join(__dirname, '.expmale/ast.json'), JSON.stringify(astObj), () => {
    //   console.log('write Sucess')
    // })
    const processRules = (rules) => {
      for (let index = 0; index < rules.length; index++) {
        // 一个css样式组
        const rule = rules[index]
        // 数据声明集合
        const declarations = rule.declarations

        if (declarations) {
          for (let j = 0; j < declarations.length; j++) {
            const declaration = declarations[j];
            // 正则匹配成功进入
            // console.log(this.regExp, declaration.value, this.regExp.test(declaration.value))
            if (declaration.type === 'declaration' && this.regExp.test(declaration.value)) {
              const nextDeclaration = declarations[j + 1]
              // 检查下一个是不是注释，如果是注释检查是否等于no，no则不转换rem
              if (nextDeclaration && nextDeclaration.type === 'comment') {
                if (nextDeclaration.comment.trim() === 'no') {
                  break
                } else {
                  declaration.value = this._getCalcValue(declaration.value)
                }
              } else {
                declaration.value = this._getCalcValue(declaration.value)
              }
            }

          }
        }

      }
    }
    // 转换ast
    processRules(astObj.stylesheet.rules);
    // 生成ast
    const targetSource = css.stringify(astObj)
    return targetSource;
  }

  _getCalcValue(value) {
    // console.log(value)
    const { type, screenWidth, precision, remUnit, minPx } = this.options;
    const unit = remUnit || screenWidth / 10
    // if(+value <= minPx) return value + 'px' // 默认不转换1px以下单位
    
    return value.replace(this.regExp, (_, $1) => {
      if(+$1 <= minPx) return $1 + 'px' // 默认不转换1px以下单位
      let val = (parseFloat($1) / unit).toFixed(precision);
      // console.log(val + type)
      return val + type;
    })
  }
}

module.exports = Px2rem