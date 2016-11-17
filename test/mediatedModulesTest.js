import 'jsdom-global/register'
import chai, { expect } from 'chai'


describe('Mediated modules', () => {

  let api = require('../src/')
  let mediator = require('../src/core/mediator').default

  describe('Util', () => {
    it ('Returns a random string when triggered', () => {
      const randomString = mediator.publish('util', 'randomString', 8, 'a')
      expect(randomString).match(/([a-z]{8})/)
    })
  })

  describe('Mapper', () => {
    it('Returns a mapped config when triggered', () => {
      api.mapper.registerMap('test', publish => config => {
        return {
          test: config.toBeMapped
        }
      })
      expect(
            mediator.publish('doMap', 'test', {toBeMapped: 'test'})
      )
            .to.eql({test: 'test'})
    })
  })

  describe('Quarry', () => {
    it('Returns a mineral-object when triggered', () => {

    })
  })

  describe('Vars', () => {
    it('Returns the correct value from the constants-maps', () => {
      expect(mediator.publish('getVar', 'css', 'width'))
        .to.equal('LENGTH')
    })
  })

  describe('Mine', () => {
    it('Returns a mineral containing the passed element', () => {
      const element = document.createElement('div')
      expect(api.mine(element))
        .to.be.a('function')
      expect(api.mine(element).element())
        .to.eql(element)
    })
    it('Returns a mineral containing the element matching the selector', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)
      expect(api.mine('div').element())
        .to.eql(element)
    })
  })

})