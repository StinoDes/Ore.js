import glimmer from './glimmer'

const torch = (() => {

  const cache = {},
    genGlimmerId = function() {
      const str = quarry.publish('util', 'randomString', 8, 'aA')
      if (cache[str])
        return genGlimmerId()
      return str
    },
    installMediatorOnGlimmer = function(target) {
      target.publish = api.publish
      return target
    },
    /**
     * Returns a new glimmer object from your config, or an
     * existing one from your id
     * @param {object} [config] - A configuration based on which a glimmer should be created
     * @param {string} [id] - A string that is the id of an existing glimmer
     * @returns {glimmer}
     */
    catchGlimmer = function(config) {
      if (typeof config === 'string') {
        if (cache[config])
          return cache[config]
        return false
      }
      let glimmerId = genGlimmerId()
      cache[glimmerId] = installMediatorOnGlimmer(glimmer(config))
      return cache[glimmerId]
    },
    api = {
      catchGlimmer
    }

  return api

})()

export default torch