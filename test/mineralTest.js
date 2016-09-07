import 'jsdom-global/register'
import chai, { expect } from 'chai'


describe('Minerals', () => {

    let api = require('../src/')

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
        it('the element will append children', () => {
            const mineral = api.mine(document.createElement('div'))
              .labor({
                  append: [
                    document.createElement('h1'),
                    document.createElement('p'),
                  ]
              })
            expect(mineral.getElement().children)
              .to.have.property('length', 2)
        })
        it('the element will prepend children', () => {
            const mineral = api.mine(document.createElement('div'))
              .labor({
                  append: document.createElement('h1'),
                  prepend: document.createElement('nav')
              })
            expect(mineral.getElement().children.item(0))
              .to.have.property('tagName', 'NAV')
        })
        it('the element will modify its classes', () => {
            const mineral = api.mine(document.createElement('div'))
              .labor({
                  addClass: 'test'
              })
            expect(mineral.getElement().classList.contains('test'))
              .to.be.ok

            mineral.labor({
                removeClass: 'test'
            })
            expect(mineral.getElement().classList.contains('test'))
              .to.not.be.ok

            mineral.labor({
                toggleClass: ['test', 'class']
            })
            expect(mineral.getElement().classList.contains('test') && mineral.getElement().classList.contains('class'))
              .to.be.ok
        })
    })
    describe('On retrieve', () => {
        it('Should return the set properties', () => {
            const element = document.createElement('div'),
              mineral = api.mine(element)
                .labor({
                    background: 'red',
                    height: '20px'
                }),
              retrieval = mineral.retrieve()
            expect(retrieval.get(['styles', 'height']))
              .to.equal('20px')
            expect(retrieval.get('styles').background)
              .to.equal('red')
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
    describe('On routine', () => {
        it('Should execute the passed function when passed in config', done => {
            let test = 'test'
            const element = document.createElement('div'),
              mineral = api.mine(element)
                .routine({
                    test (newTest, callback) {
                        test = newTest
                        callback()
                    }
                })
                .labor({
                    test: ['newvar', () => {
                        expect(test)
                          .to.equal('newvar')
                        done()
                    }]
                })
        })
    })
})