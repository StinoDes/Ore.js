import 'jsdom-global/register'
import chai, { expect } from 'chai'

describe('Glimmers:', () => {

  let api = require('../src/')

  describe('created glimmers', () => {

    it('should be returned from torch', () => {
      expect(api.torch.catchGlimmer())
        .to.include.keys('labor')
    })

    it('should start playing correctly', done => {
      api.torch.catchGlimmer()
        .labor({
          from: 0,
          to: 200,
          duration: 200,
          set: v => { expect(v).to.be.within(0, 200) },
          onEnd: v => { done() },
          play: true
        })
    })

    it('should be executed on a mineral', done => {
      const mineral = api.mine('newdiv')
      api.torch.catchGlimmer()
        .labor({
          mineral,
          from: 0,
          to: 200,
          duration: 200,
          styles: {
            opacity: v => v / 200
          },
          set: v => { expect(v).to.be.within(0, 200) },
          onEnd: v => {
            expect(mineral
              .getElement().style.opacity)
              .to.equal('1')
            done()
          },
          play: true
        })
    })

    it('should reverse when passed reverse flag', done => {
      const glimmer = api.torch.catchGlimmer()
        .labor({
          from: 0,
          to: 200,
          duration: 20,
          onEnd: v1 => {
            expect(v1)
              .to.equal(200)
            glimmer.labor({
              reverse: true,
              play: true,
              onEnd: v2 => {
                expect(v2)
                  .to.equal(0)
                done()
              }
            })
          },
          play: true
        })
    })

  })

  describe('glimmerMap', () => {

    it('should map a valid root config', () => {
      let mapped
      mapped = api.torch.publish('doMap', 'glimmer', {
        from: 300,
        to: 200,
        duration: 2000,
        delay: 300,
        easing: 'bounceOut',
        play: false,
      })
      expect(mapped)
        .to.eql({
          from: 300,
          to:200,
          duration: 2000,
          delay: 300,
          easing: 'bounceOut',
          play: false,
        })
    })

    it('should map a invalid typed root config', () => {
      let mapped
      mapped = api.torch.publish('doMap', 'glimmer', {
        from: '300',
        to: 200,
        duration: '2000',
        delay: 300,
        easing: v => v,
        play: 'false',
      })
      expect(mapped)
        .to.eql({
        to:200,
        delay: 300,
      })
    })

    it('should map the set property correctly', () => {
      let mapped
      mapped = api.torch.publish('doMap', 'glimmer', {
        mineral: api.mine('newdiv'),
        styles: 'background',
        set: v => v
      })
      expect(mapped)
        .to.have.deep.property('set.background')
        .that.is.a('function')
      expect(mapped)
        .to.have.deep.property('set.functions')
        .that.is.an('array')
      expect(mapped.set.background('value'))
        .to.equal('value')

      mapped = api.torch.publish('doMap', 'glimmer', {
        mineral: api.mine('newdiv'),
        styles: ['background', 'color'],
        set: v => v
      })
      expect(mapped)
        .to.have.deep.property('set.background')
        .that.is.a('function')
      expect(mapped)
        .to.have.deep.property('set.color')
        .that.is.a('function')
      expect(mapped)
        .to.have.deep.property('set.functions')
        .that.is.a('array')

      mapped = api.torch.publish('doMap', 'glimmer', {
        mineral: api.mine('newdiv'),
        styles: {'background': v => v*2, 'color': v => v+2}
      })
      expect(mapped)
        .to.have.deep.property('set.background')
        .that.is.a('function')
      expect(mapped)
        .to.have.deep.property('set.color')
        .that.is.a('function')
      expect(mapped.set.background(3))
        .to.equal(6)
      expect(mapped.set.color(3))
        .to.equal(5)
    })

  })

})