if (!window.requestAnimFrame)
  window.requestAnimFrame = (() =>
    window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )()

const glimmer = (initConfig = {}) => (() => {

  let delay           = 0,
    progress          = 0,
    previousTimestamp = null,
    configuration     = {}
  const delta = () => configuration.to - configuration.from,
    value     = () => configuration.from + glimmerApi.publish('ease', progress,
      configuration.easing ?
        configuration.easing : 'LINEAR') * delta(),
    onEnd     = () => {
      if (configuration.onEnd)
        configuration.onEnd.call(glimmerApi, configuration.to)
    },
    /**
     * The animation loop. Keeps going as long as play is truthy.
     * @returns {undefined}
     */
    loop      = () => {
      calculate()
      if (progress < 1) {
        if (configuration.set)
          configuration.set.do.call(glimmerApi, value(), configuration.mineral)
      }
      else {
        if (configuration.set)
          configuration.set.do.call(glimmerApi, configuration.to, configuration.mineral)
        reset()
        onEnd()
      }
      if (configuration.play)
        window.requestAnimFrame(loop)
    },
    reverse   = () => {
      const reversed = {
        to   : configuration.from,
        from : configuration.to,
      }
      configuration = {
        ...configuration,
        ...reversed,
      }
    },
    reset     = () => {
      progress = 0
      delay = 0
      previousTimestamp = 0
      configuration.play = false
    },
    /**
     * Calculates the current progress (from 0 to 1).
     * @returns {undefined}
     */
    calculate = () => {
      const currentTimestamp = Date.now()
      if (!previousTimestamp)
        previousTimestamp = currentTimestamp

      if (delay < 1)
        delay += (currentTimestamp - previousTimestamp) / configuration.delay
      else
        progress += (currentTimestamp - previousTimestamp) / configuration.duration
      previousTimestamp = currentTimestamp
    },
    /**
     * Applies the config to the glimmer.
     * @param {object} config - Config to be passed
     * @return {glimmer} - Returns itself for chaining purposes.
     */
    labor = function (config = {}) {
      const playAfter = !configuration.play && config.play,
        mappedConfig = glimmerApi.publish('doMap', 'glimmer', config)
      if (mappedConfig.reverse)
        reverse()
      if (mappedConfig.reset)
        reset()
      configuration = {
        ...configuration,
        ...mappedConfig,
      }
      if (playAfter)
        loop()
      return glimmerApi
    },
    glimmerApi = function (config) {
      return labor(config)
    }

  glimmerApi.isGlimmer = () => true

  if (configuration.play)
    loop()

  return glimmerApi

})()

export default glimmer
