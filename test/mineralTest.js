import jsdom from 'mocha-jsdom'
import chai, { expect } from 'chai'

let api

describe('Minerals', () => {

    jsdom()

    before(() => {
        api = require('../src/index').default
    })

    describe('From Quarry', () => {

        it('Should be returned when passed an element', () => {

            const element = document.createElement('div'),
                mineral = api.quarry.mineMineral(element)

            expect(mineral)
                .to.have.property('getElement')
                .that.is.a('function')
            expect(mineral.getElement())
                .to.eql(element)

        })

        it('Should return from quarry cache on second query', () => {

            const element = document.createElement('div'),
                mineral = api.quarry.mineMineral(element)

            expect(api.quarry.mineMineral(element))
                .to.equal(mineral)

        })

    })
})