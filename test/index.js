const expect = require('chai').expect
const loader = require('../index')

const options = {
  query: {
    type: 'rem',
    screenWidth: 375,
    precision: 2,
    extendSuffix: ['px', 'rpx'],
    minPx: 5
  }
}

describe('Loader', function () {

  it('should transform px value into rem', function () {
    const output = loader.call(options, 'body {width: 750px}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  width: 20.00rem;\n}')
  })

  it('should transform rpx value into rem', function () {
    const output = loader.call(options, 'body {width: 750rpx}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  width: 20.00rem;\n}')
  })

  it('should no transform pt value into rem', function () {
    const output = loader.call(options, 'body {width: 750pt}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  width: 750pt;\n}')
  })
})

describe('Transform Value Comment', function () {

  it('should support `no` transform value comment', function () {
    const output = loader.call(options, 'body {width: 750px; /* no */}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  width: 750px;\n}')
  })

})

describe('should no transform px', function () {
  it('should no transform 1px', function () {
    const output = loader.call(options, 'body {border: 1px solid #ccc;}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  border: 1px solid #ccc;\n}')
  })

  it('should no transform 5px', function () {
    const output = loader.call(options, 'body {border: 5px solid #ccc;}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  border: 5px solid #ccc;\n}')
  })

  it('should transform 37.5px', function () {
    const output = loader.call(options, 'body {border: 37.5px solid #ccc;}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  border: 1.00rem solid #ccc;\n}')
  })
})

describe('should remUnit be greater than screenWidth/10', function() {
  
  it('should transform px value into rem by remUnit', function() {
    const query = Object.assign(options.query, { remUnit: 75})
    const output = loader.call({ query }, 'body {border: 750px solid #ccc;}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  border: 10.00rem solid #ccc;\n}')
  })

  it('should transform rpx value into rem by remUnit', function() {
    const output = loader.call(options, 'body {border: 750rpx solid #ccc;}')
    expect(output).is.a('string')
    expect(output).to.equal('body {\n  border: 10.00rem solid #ccc;\n}')
  })
})