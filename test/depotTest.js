import chai, { expect } from 'chai'
import sinon from 'sinon'

describe('Depot', () =>{

  let depot

  beforeEach(() => {
    depot = require('../src/depot').default
  })

  it('should return a new data object when not instantiated', () => {
    depot = depot()()
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
    depot = depot()(testObj)
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
    depot = depot()(testObj)
    depot
      .set('test', 'newValue')
      .set('object', 'aValue', 'anotherNewValue')
    expect(depot.get('test'))
      .to.equal('newValue')
    expect(depot.get('object', 'aValue'))
      .to.equal('anotherNewValue')
  })

})