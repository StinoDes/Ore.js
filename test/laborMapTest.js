import chai, { expect } from 'chai'
import chaiThings from 'chai-things'
import sinon from 'sinon'

import map from '../src/mapping/laborMap'

chai.use(chaiThings);

describe('LaborMap', () => {

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

  afterEach = () => {
    publishStub.restore()

  }

  it('maps dom correctly', () => {
    const publishStub = getStub()
    let laborMap = map(publishStub)

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

})