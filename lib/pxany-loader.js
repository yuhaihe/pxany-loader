const loaderUtils = require('loader-utils')
const Pxany = require('./pxany')
const { validate } = require('schema-utils')
const schema = require('../schema/schema.json')

function isExclude(reg, file) {
  if (Object.prototype.toString.call(reg) !== '[object RegExp]') {
    throw new Error('options.exclude should be RegExp.');
  }
  return file.match(reg) !== null;
}

function loader(source){
  const options = loaderUtils.getOptions(this); 

  // 入参格式校验
  validate(schema, options)

  // 处理忽略文件
  const exclude = options.exclude; 
  const resource = this.resource; // 获取当前处理的文件路径
  if(exclude){
    if (Object.prototype.toString.call(exclude) === '[object RegExp]') {
      if (isExclude(exclude, resource)) return source;
    } else if (Object.prototype.toString.call(exclude) === '[object Array]') {
      for (let i = 0; i < exclude.length; i++) {
        if (isExclude(exclude[i], resource)) return source;
      }
    } else {
      throw new Error('options.exclude should be RegExp or Array.');
    }
  }

  const pxany = new Pxany(options);

  // 转换px->rem
  const targetSource = pxany.generateRem(source);
  // return targetSource;
  return targetSource;
}
module.exports = loader;