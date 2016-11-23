import 'jsdom-global/register'
import chai, { expect } from 'chai'

describe('Oven', () => {

  let api = require('../src/')

  it('should have mediator installed correctly', () => {
    expect(api.oven.publish).to.not.be.undefined
  })

  describe('returns correct type for', () => {
    it('html-elements', () => {

      const div = api.bake('div')

      expect(() => div.isBrick()).to.throw(TypeError)

    })
    it('brick', () => {
      const div = api.bake('div'),
        brick = api.bake('Test')

      expect(() => brick.isBrick()).to.not.throw(Error)
    })
  })
  describe('returns rendering functions', () => {
    it('html-elements', () => {

      const div = api.bake('div')

      expect(div().element().tagName).to.equal('DIV')

    })
    it('brick', () => {

      const div = api.bake('div'),
        brick = api.bake('Test', {
          build () {
            return div()
          }
        })

      expect(brick().element().tagName).to.equal('DIV')

    })
    it('with children', () => {

      const div = api.bake('div')

      expect(
        div({}, [
          div(),
          div()
        ])
          .element()
          .children.length
      ).to.equal(2)

    })
  })
  describe('bricks', () => {
    it('rerenders when needed', () => {
      const div = api.bake('div'),
        brick   = api.bake('Brick', {
          build (config) {
            return div(config, [])
          }
        })
      const firstbuild = brick().element()
      const secondBuild= brick({styles: { color: 'red'}}).element()

      expect(firstbuild).to.equal(secondBuild)
      expect(secondBuild.style.color).to.equal('red')
    })
    it('changes child-elements on rerender', () => {
      const div = api.bake('div'),
        brick   = api.bake('Brick', {
          build (config) {
            return div({}, [
              div(config.firstDiv, []),
              div(config.secondDiv, []),
              div(config.thirdDiv, []),
            ])
          }
        }),
        built   = brick({
          firstDiv  : {},
          secondDiv : {},
          thirdDiv  : {},
        })
      expect([...built().dom].length).to.equal(3)

      const secondBuilt = brick({
        firstDiv  : {'class': 'first'},
        secondDiv : {'class': 'second'},
        thirdDiv  : {'class': 'third'},
      })

      secondBuilt().dom().forEach(v => {
        expect(v.class.length).to.equal(1)
      })

    })
  })
})