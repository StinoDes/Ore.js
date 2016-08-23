//Test imports
import chai, { expect } from 'chai'

//Tested imports
import mediator from '../src/core/mediator'


describe('Mediator', () => {

  const obj = {
    changedVar: 'notChanged',
  }

  it('installs onto an object', () => {
    mediator.installTo(obj)
    expect(obj)
          .to.have.property('subscribe')
          .that.is.a('function')
    expect(obj)
          .to.have.property('publish')
          .that.is.a('function')
  })

  it('allows it to subscribe', () => {
    obj.subscribe('aChannel', function (someVar) {
      this.changedVar = someVar
    })
    expect(mediator)
          .to.have.deep.property('channels.aChannel')
          .that.has.property('length', 1)
  })

  it('allows it to publish', () => {
    obj.publish('aChannel', 'changed')
    expect(obj)
          .to.have.property('changedVar', 'changed')
  })

})