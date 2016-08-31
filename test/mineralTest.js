import 'jsdom-global/register'
import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import api from '../src/'

chai.use(sinonChai)

describe('Minerals', () => {

    describe('From Quarry', () => {

        it('Should be returned when passed an element', () => {

            const element = document.createElement('div'),
                mineral = api.mine(element)

            expect(mineral)
                .to.have.property('getElement')
                .that.is.a('function')
            expect(mineral.getElement())
                .to.eql(element)

        })

        it('Should return from quarry cache on second query', () => {

            const element = document.createElement('div'),
                mineral = api.mine(element)

            expect(api.mine(element))
                .to.equal(mineral)
        })

    })

    describe('On labor', () => {
        it('The element\'s attributes will be modified', () => {

            const element = document.createElement('div'),
              mineral = api.mine(element)

            mineral.labor({
                data: 'some_data',
                attr: {
                    id: 'an_id'
                }
            })

            expect(element.getAttribute('id'))
              .to.equal('an_id')
            expect(element.getAttribute('data'))
              .to.equal('some_data')
        })
        it('the element\'s styles will be modified', () => {

            const element = document.createElement('div'),
              mineral = api.mine(element)

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
        it('the element will register events', done => {

            const calledEvents = [],
              handler = e => calledEvents.push(e),
              element = document.createElement('div'),
              mineral = api.mine(element)
                .labor({
                    onClick () {
                        handler('click')
                    },
                    mouseenter () {
                        handler('enter')
                    }
                }),
              events = ['click', 'click', 'mouseenter']
            events.map(e => {
                element.dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click', 'click', 'enter'])
                    done()
                }
            })
        })
        it('the element will register additional events', done => {
            const calledEvents = [],
              handler = e => calledEvents.push(e),
              element = document.createElement('div'),
              mineral = api.mine(element)
                .labor({
                    onClick () {
                        handler('click')
                    },
                    mouseenter () {
                        handler('enter')
                    }
                })
                .labor({
                    events: {
                        click () {
                            handler('click')
                        }
                    }
                }),
              events = ['click', 'click', 'mouseenter']
            events.map(e => {
                element.dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click','click','click','click','enter'])
                    done()
                }
            })
        })
    })
    describe('On retrieve', () => {
        it('Should return the set properties', () => {
            const element = document.createElement('div'),
              mineral = api.mine(element)
                .labor({
                    height: '20px',
                }),
              retrieval = mineral.retrieve()
            expect(retrieval.get(['styles', 'height']))
              .to.equal('20px')
            expect(retrieval.get('styles').height)
              .to.equal('20px')
        })
        it('Should return the set attributes', () => {
            const element = document.createElement('div'),
              mineral = api.mine(element)
                .labor({
                    id: 'element_id',
                }),
              retrieval = mineral.retrieve()
            expect(retrieval.get(['attr', 'id']))
              .to.equal('element_id')
            expect(retrieval.get('attr').id)
              .to.equal('element_id')
        })
    })
})