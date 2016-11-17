import 'jsdom-global/register'
import chai, { expect } from 'chai'


describe('Minerals', () => {

    let api = require('../src/')
    describe('mine', () => {
        it('should create a new mineral if the selector has the correct form', () => {
            const mineral = api.mine('newdiv')
            expect(mineral.element().tagName)
              .to.equal('DIV')
        })
        it('should create a new mineral and apply the config', () => {
            const mineral = api.mine('newdiv', {
                class: 'test'
            })
            expect(mineral.element().classList.contains('test'))
              .to.be.ok
        })
    })
    describe('From Quarry', () => {

        it('Should be returned when passed an element', () => {

            const  element = document.createElement('div'),
              mineral = api.mine(element)

            expect(mineral)
                .to.have.property('element')
                .that.is.a('function')
            expect(mineral.element())
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
              .mine('newdiv')({
                  data: 'some_data',
                  attr: {
                    id: 'an_id'
                  }
              })

            expect(mineral.element().getAttribute('id'))
              .to.equal('an_id')
            expect(mineral.element().getAttribute('data'))
              .to.equal('some_data')
        })
        it('the element\'s styles will be modified', () => {

            const mineral = api
              .mine('newdiv')({
                styles: {
                    backgroundColor: 'white',
                    height: '20px',
                    display: 'block',
                }
            })
            expect(mineral.element().style.backgroundColor)
              .to.equal('white')
            expect(mineral.element().style.height)
              .to.equal('20px')
            expect(mineral.element().style.display)
              .to.equal('block')
        })
        it('the element will register events', done => {

            const calledEvents = [],
              handler = e => calledEvents.push(e),
              mineral = api.mine('newdiv')({
                    onClick () {
                        handler('click')
                    },
                    mouseenter () {
                        handler('enter')
                    }
                }),
              events = ['click', 'click', 'mouseenter']
            events.map(e => {
                mineral.element().dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click', 'click', 'enter'])
                    done()
                }
            })
        })
        it('the element will register additional events', done => {
            const calledEvents = [],
              handler = e => calledEvents.push(e),
              mineral = api.mine('newdiv')({
                    onClick () {
                        handler('click')
                    },
                    mouseenter () {
                        handler('enter')
                    }
                })({
                    events: {
                        click () {
                            handler('click')
                        }
                    }
                }),
              events = ['click', 'click', 'mouseenter']
            events.map(e => {
                mineral.element().dispatchEvent(new Event(e))
                if (events.indexOf(e) == events.length - 1) {
                    expect(calledEvents).to.eql(['click','click','click','click','enter'])
                    done()
                }
            })
        })
        it('the element will append children', () => {
            const mineral = api.mine('newdiv')({
                  append: [
                    document.createElement('h1'),
                    document.createElement('p'),
                  ]
              })
            expect(mineral.element().children)
              .to.have.property('length', 2)
        })
        it('the element will prepend children', () => {
            const mineral = api.mine('newdiv')({
                  append: document.createElement('h1'),
                  prepend: document.createElement('nav')
              })
            expect(mineral.element().children.item(0))
              .to.have.property('tagName', 'NAV')
        })
        it('the element will clear its children', () => {
            const mineral = api.mine('newdiv')({
                  append: [
                      document.createElement('h1'),
                      document.createElement('p'),
                  ]
              })
            expect(mineral.element().children)
              .to.have.property('length', 2)

            mineral({empty: true})

            expect(mineral.element().children)
              .to.have.property('length', 0)
        })
        it('the element will modify its classes', () => {
            const mineral = api.mine('newdiv')({
                  addClass: 'test'
              })
            expect(mineral.element().classList.contains('test'))
              .to.be.ok

            mineral({
                removeClass: 'test'
            })
            expect(mineral.element().classList.contains('test'))
              .to.not.be.ok

            mineral({
                toggleClass: ['test', 'class']
            })
            expect(mineral.element().classList.contains('test') && mineral.element().classList.contains('class'))
              .to.be.ok
        })
        it('the element will change its text', () => {
            expect(
              api
                .mine('newdiv')({
                    text: 'This is new text'
                })
                .element().textContent
            ).to.equal('This is new text')
        })
    })
    describe('On retrieve', () => {
        it('Should return the set properties', () => {
            const mineral = api.mine('newdiv')({
                    background: 'red',
                    height: '20px'
                }),
              retrieval = mineral()
            expect(retrieval.get(['styles', 'height']))
              .to.equal('20px')
            expect(retrieval.get('styles').background)
              .to.equal('red')
            expect(retrieval.styles())
              .to.eql({'background': 'red', 'height': '20px'})
        })
        it('Should return the set attributes', () => {
            const mineral = api.mine('newdiv')({
                    id: 'element_id',
                }),
              retrieval = mineral()
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
            // todo
        })
    })
    describe('On routine', () => {
        it('Should execute the passed function when passed in config', done => {
            let test = 'test'
            const mineral = api.mine('newdiv')
                .add({
                    test (newTest, callback) {
                        test = newTest
                        callback()
                    }
                })({
                    test: ['newvar', () => {
                        expect(test)
                          .to.equal('newvar')
                        done()
                    }]
                })
        })
    })
})