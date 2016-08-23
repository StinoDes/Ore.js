import api from '../src'
import mediator from '../src/core/mediator'

import chai, { expect } from 'chai'

describe('Mediated modules', () => {

  it('Should execute callback on event publish', () => {

    api.mapper.registerMap('test', config => {
      return {
        test: config.toBeMapped
      }
    })
    expect(
          mediator.doFor('doMap', 'test', {toBeMapped: 'test'})
    )
          .to.eql({test: 'test'})
  })

})