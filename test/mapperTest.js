//Test imports
import chai, { expect } from 'chai'
import sinon from 'sinon'

//Tested imports
import mapper from '../src/mapping'

describe('Mapper', () => {

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