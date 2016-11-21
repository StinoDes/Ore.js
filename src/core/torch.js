import glimmer from './glimmer'

const torch = (() => {

  const cache = {},
    genGlimmerId = function () {
      const str = torch.publish('util', 'randomString', 8, 'aA')
      if (cache[str])
        return genGlimmerId()
      return str
    },
    installMediatorOnGlimmer = function (target) {
      target.publish = torch.publish
      return target
    },
    /**
     * Returns a new glimmer object from your config, or an
     * existing one from your id
     * @param {object} [config] - A configuration based on which a glimmer should be created
     * @param {string} [id] - A string that is the id of an existing glimmer
     * @return {glimmer} - returns the desired glimmer
     */
    catchGlimmer = function (config) {
      if (typeof config === 'string') {
        if (cache[config])
          return cache[config]
        return false
      }
      const glimmerId = genGlimmerId()
      cache[glimmerId] = installMediatorOnGlimmer(glimmer(config))
      return cache[glimmerId]
    },
    api = {
      catchGlimmer,
    }

  return api

})()

export default torch
