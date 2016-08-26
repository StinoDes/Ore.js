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

    describe('On labor', () => {

        it('The element\'s attributes will be modified', () => {

            const element = document.createElement('div'),
              mineral = api.quarry.mineMineral(element)

            mineral.labor({
                attr: {
                    id: 'an_id'
                }
            })

            expect(element.getAttribute('id'))
              .to.equal('an_id')
        })

        it('the element\'s styles will be modified', () => {

            const element = document.createElement('div'),
              mineral = api.quarry.mineMineral(element)

            mineral.labor({
                styles: {
                    backgroundColor: 'white',
                    height: '20px',
                    display: 'block',
                }
            })
            expect(element.style.backgroundColor)
              .to.equal('white')
            expect(element.style.height)
              .to.equal('20px')
            expect(element.style.display)
              .to.equal('block')
        })

    })
})