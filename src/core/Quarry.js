const quarry = (() => {

  let loaded = false

  const cache = {},

    load = function() {
      const self = this
      if (!window.Element.prototype.hasOwnProperty('mine')) {
        Object.defineProperty(window.Element.prototype, 'mine', {
          get() {
            return self.mineMineral(this)
          },
        })
        loaded = true
      }
    },

    _genD = function() {
      const str = randomString(8, 'aA')
      if (cache[str])
        return this._genD()
      return str
    },

    mineMineral = function(element) {
      if (element._mineid)
        return cache[element._mineid]
      element._mineid = _genD()
      cache[element._mindeid] = element
      return cache[element._mineid]
    },

    api = {
      load,
      mineMineral,
    }

  api.load()

  return api

})()

export default quarry
