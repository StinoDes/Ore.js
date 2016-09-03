import chai, { expect } from 'chai'
import sinon from 'sinon'

describe('Mapper', () => {

  let mapper = require('../src/mapping').default

  it('Registers new mapping', () => {

    mapper.registerMap('testMap', publish => config => {
      return {
        test: config.valueToMap
      }
    })
    expect(mapper.doMap('testMap', {
      valueToMap: 'test'
    }))
          .to.deep.equal({test: 'test'})
  })

})