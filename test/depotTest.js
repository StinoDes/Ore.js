import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)


describe('Depot', () =>{

  let depot,
    trade

  beforeEach(() => {
    const publish = (module, name, obj) => {
      if (module === 'util', name === 'randomString')
        return Math.random().toString(8)
      else if (module === 'util', name === 'clone')
        return require('../src/util').default.clone(obj)
    }
    depot = require('../src/depot').default(publish)
  })

  it('should return a new data object when not instantiated', () => {
    depot = depot()
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
    depot = depot(testObj)
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
    depot = depot(testObj)
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
    depot = depot(testObj)
    expect(depot.update('test', v => v.toUpperCase()).get('test'))
      .to.equal('TEST')
    expect(depot.update('object', 'aValue', v => v.toUpperCase()).get('object', 'aValue'))
      .to.equal('VALUE')
  })
  it('should fire a callback when store changed', done => {
    const testObj = {
        test: 'test',
        object: {
          aValue: 'value'
        }
      },
      handler = store => {
        expect(store)
          .to.equal('newVal')
        done()
      }
    depot = depot(testObj)
    depot.trade('test', handler)
    depot.set('test', 'newVal')
      .transact()
  })
  it('should fire multiple callbacks on the same substore when store changed', () => {
    const testObj = {
        test: 'test',
        object: {
          aValue: 'value'
        }
      },
      handler = sinon.spy()
    depot = depot(testObj)
    depot
      .trade('object', handler)
      .trade('object', handler)
      .set('object', 'aValue', 'newValue')
      .transact()
    expect(handler)
      .to.have.been.calledWith({aValue: 'newValue'})
    expect(handler)
      .to.have.been.calledTwice

  })

})