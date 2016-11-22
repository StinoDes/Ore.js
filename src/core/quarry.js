import mineral from './mineral/mineral'
import batch from './mineral/batch'

const quarry = (() => {

  let loaded = false

  const cache = {},

    load = function () {
      const self = this
      if (!window.Element.prototype.hasOwnProperty('mine')) {
        Object.defineProperty(window.Element.prototype, 'mine', {
          get () {
            return self.mineMineral(this)
          },
        })
        loaded = true
      }
    },

    genMineId = function () {
      const str = quarry.publish('util', 'randomString', 8, 'aA')
      if (cache[str])
        return genMineId()
      return str
    },

    installMediatorOnMineral = function (target) {
      target.publish = api.publish
      return target
    },

    mineMineral = function (element) {
      if (element.length)
        return batch(element)
      else
      {
        if (element._mineid)
          return cache[element._mineid]
        element._mineid = genMineId()
        cache[element._mineid] = installMediatorOnMineral(mineral(element))
        return cache[element._mineid]
      }
    },

    api = {
      load,
      mineMineral,
    }

  api.load()

  return api

})()

export default quarry
