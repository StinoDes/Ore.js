//Test imports
import chai, { expect } from 'chai'

//Tested imports
import mapper from '../src/mapping'

describe('Mapper', () => {

  it('Registers new mapping', () => {

    mapper.registerMap('testMap', (config) => {
      return {
        test: config.valueToMap
      }
    })
    expect(mapper.doMap('testMap', {
      valueToMap: 'test'
    }))
          .to.deep.equal({test: 'test'})
  })

  it('Removes a mapping', () => {
    mapper.removeMap('testMap')
    expect(mapper.doMap)
          .to.throw(Error)
  })

})