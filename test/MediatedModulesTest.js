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
      const randomString = mediator.doFor('randomString', 8, 'a')
      expect(randomString).match(/([a-z]{8})/)
    })
  })

  describe('Mapper', () => {
    it('Returns a mapped config when triggered', () => {
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

  describe('Quarry', () => {
    it('Returns a mineral-object when triggered', () => {

    })
  })

})