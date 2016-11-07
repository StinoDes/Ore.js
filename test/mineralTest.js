import 'jsdom-global/register'
import chai, { expect } from 'chai'


describe('Minerals', () => {

    let api = require('../src/')
    describe('mine', () => {
        it('should create a new mineral if the selector has the correct form', () => {
            const mineral = api.mine('newdiv')
            expect(mineral.getElement().tagName)
              .to.equal('DIV')
        })
        it('should create a new mineral and apply the config', () => {
            const mineral = api.mine('newdiv', {
                class: 'test'
            })
            expect(mineral.getElement().classList.contains('test'))
              .to.be.ok
        })
    })
    describe('From Quarry', () => {

        it('Should be returned when passed an element', () => {

            const  element = document.createElement('div'),
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

            const mineral = api
              .mine('newdiv')
              .labor({
                  data: 'some_data',
                  attr: {
                    id: 'an_id'
                  }
              })

            expect(mineral.getElement().getAttribute('id'))
              .to.equal('an_id')
            expect(mineral.getElement().getAttribute('data'))
              .to.equal('some_data')
        })
        it('the element\'s styles will be modified', () => {

            const mineral = api
              .mine('newdiv')
              .labor({
                styles: {
                    backgroundColor: 'white',
                    height: '20px',
                    display: 'block',
                }
            })
            expect(mineral.getElement().style.backgroundColor)
              .to.equal('white')
            expect(mineral.getElement().style.height)
              .to.equal('20px')
            expect(mineral.getElement().style.display)
              .to.equal('block')
        })
        it('the element will register events', done => {

            const calledEvents = [],
              handler = e => calledEvents.push(e),
              mineral = api.mine('newdiv')
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
                mineral.getElement().dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click', 'click', 'enter'])
                    done()
                }
            })
        })
        it('the element will register additional events', done => {
            const calledEvents = [],
              handler = e => calledEvents.push(e),
              mineral = api.mine('newdiv')
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
                mineral.getElement().dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click','click','click','click','enter'])
                    done()
                }
            })
        })
        it('the element will append children', () => {
            const mineral = api.mine('newdiv')
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
            const mineral = api.mine('newdiv')
              .labor({
                  append: document.createElement('h1'),
                  prepend: document.createElement('nav')
              })
            expect(mineral.getElement().children.item(0))
              .to.have.property('tagName', 'NAV')
        })
        it('the element will clear its children', () => {
            const mineral = api.mine('newdiv')
              .labor({
                  append: [
                      document.createElement('h1'),
                      document.createElement('p'),
                  ]
              })
            expect(mineral.getElement().children)
              .to.have.property('length', 2)

            mineral
              .labor({empty: true})

            expect(mineral.getElement().children)
              .to.have.property('length', 0)
        })
        it('the element will modify its classes', () => {
            const mineral = api.mine('newdiv')
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
        it('the element will change its text', () => {
            expect(
              api
                .mine('newdiv')
                .labor({
                    text: 'This is new text'
                })
                .getElement().textContent
            ).to.equal('This is new text')
        })
    })
    describe('On retrieve', () => {
        it('Should return the set properties', () => {
            const mineral = api.mine('newdiv')
                .labor({
                    background: 'red',
                    height: '20px'
                }),
              retrieval = mineral.retrieve()
            expect(retrieval.get(['styles', 'height']))
              .to.equal('20px')
            expect(retrieval.get('styles').background)
              .to.equal('red')
            expect(retrieval.styles())
              .to.eql({'background': 'red', 'height': '20px'})
        })
        it('Should return the set attributes', () => {
            const mineral = api.mine('newdiv')
                .labor({
                    id: 'element_id',
                }),
              retrieval = mineral.retrieve()
            expect(retrieval.get(['attr', 'id']))
              .to.equal('element_id')
            expect(retrieval.get('attr').id)
              .to.equal('element_id')
            expect(retrieval.attr())
              .to.eql({'id': 'element_id'})
        })
        it('Should return the mineral\'s children', () => {
            const mineral = api.mine('newdiv', {
                append: [
                  api.mine('newdiv'), api.mine('newp')
                ]})
        })
    })
    describe('On routine', () => {
        it('Should execute the passed function when passed in config', done => {
            let test = 'test'
            const mineral = api.mine('newdiv')
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