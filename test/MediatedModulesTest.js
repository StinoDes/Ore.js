import jsdom from 'mocha-jsdom'
import chai, { expect } from 'chai'

let api;
import mediator from '../src/core/mediator'

describe('Mediated modules', () => {

  jsdom()

  before(() => {
    api = require('../src/index').default
  })

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

})