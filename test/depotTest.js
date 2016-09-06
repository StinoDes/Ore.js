import chai, { expect } from 'chai'
import sinon from 'sinon'


describe('Depot', () =>{

  let depot,
    publish

  beforeEach(() => {
    depot = require('../src/depot').default
    publish = (module, name, obj) => require('../src/util').default.clone(obj)
  })

  it('should return a new data object when not instantiated', () => {
    depot = depot(publish)()
    expect(depot.get())
      .to.eql({})
  })
  it('should return a populated data object when instantiated with arguments', () => {
    const testObj = {
      test: 'test',
      object: {
        aValue: 'value'
      }
    }
    depot = depot(publish)(testObj)
    expect(depot.get())
      .to.eql(testObj)
    expect(depot.get('test'))
      .to.eql(testObj.test)
    expect(depot.get('object', 'aValue'))
      .to.eql(testObj.object.aValue)
    expect(depot.get(['object', 'aValue']))
      .to.eql(testObj.object.aValue)
  })
  it('should set data', () => {
    const testObj = {
      test: 'test',
      object: {
        aValue: 'value'
      }
    }
    depot = depot(publish)(testObj)
    depot
      .set('test', 'newValue')
      .set('object', 'aValue', 'anotherNewValue')
    expect(depot.get('test'))
      .to.equal('newValue')
    expect(depot.get('object', 'aValue'))
      .to.equal('anotherNewValue')
    expect(depot.get())
      .to.not.equal(testObj)
  })
  it('should update data using the passed function', () => {
    const testObj = {
      test: 'test',
      object: {
        aValue: 'value'
      }
    }
    depot = depot(publish)(testObj)
    expect(depot.update('test', v => v.toUpperCase()).get('test'))
      .to.equal('TEST')
    expect(depot.update('object', 'aValue', v => v.toUpperCase()).get('object', 'aValue'))
      .to.equal('VALUE')
  })

})