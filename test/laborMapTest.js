import chai, { expect } from 'chai'
import chaiThings from 'chai-things'
import sinon from 'sinon'


chai.use(chaiThings);

describe('LaborMap', () => {

  let laborMap

  const getStub = (conf = {}) => {
    return function (name) {
      switch (name) {
        case 'mineMineral':
          return { getElement() { return arguments[1] } }
        case 'getVar':
          switch (arguments[1]) {
            case 'styles':
              return conf['styles'] || false
            case 'attr':
              return conf['attr'] || false
            case 'events':
              return conf['events'] || false
            default:
              return conf['default'] || false

          }
      }
    }
  }

  beforeEach(() => {
    laborMap = require('../src/mapping/laborMap').default(getStub())
  })

  it('maps dom.append correctly', () => {
    const testElement = nodeType => ({nodeType}),
      mapped = laborMap({
        dom: {
          append: [
            testElement('test1'),
            testElement('test2')
          ]
        },
        append: testElement('test3')
      })
    expect(mapped.dom.append.length)
      .to.equal(3)
    expect(mapped.dom.append)
      .to.all.have.property('getElement')

  })
  it('maps dom.prepend correctly', () => {
    const testElement = nodeType => ({nodeType}),
      mapped = laborMap({
        dom: {
          prepend: [
            testElement('test1'),
            testElement('test2')
          ]
        },
        prepend: testElement('test3')
      })
    expect(mapped.dom.prepend.length)
      .to.equal(3)
    expect(mapped.dom.prepend)
      .to.all.have.property('getElement')

  })
  it('maps class actions', () => {
    const mapped = laborMap({
      toggleClass: 'toggledClass',
      addClass: 'addedClass',
      class: {
        remove: ['removedClass', 'anotherRemovedClass']
      }
    })
    expect(mapped.class)
      .to.eql({
        toggle: ['toggledClass'],
        add: ['addedClass'],
        remove: ['removedClass', 'anotherRemovedClass']
    })
  })

})