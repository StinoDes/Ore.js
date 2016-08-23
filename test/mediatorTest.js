//Test imports
import chai, { expect } from 'chai'

//Tested imports
import mediator from '../src/core/mediator'


descibe('Mediator', () => {
  it('installs onto an object', () => {
    const obj = {
      changedVar: 'notChanged',
    }
    mediator.installTo(obj)
    expect(obj).to.have.property('subscribe').that.is.a('function')
    expect(obj).to.have.property('publish').that.is.a('function')
  })
})