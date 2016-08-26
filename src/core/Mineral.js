const mineral = (element) => (() => {

  const getElement = function() {
      return element
    },
    laborAttributes = function(config) {
      for (const k in config)
        element.setAttribute(k, config[k])
    },
    laborStyles = function(config) {
      for (const k in config)
        element.style[k] = config[k]
    },
    labor = function(config = {}) {
      const mappedConfig = this.publish('doMap', 'labor', config)
      laborAttributes(mappedConfig.attr)
      laborStyles(mappedConfig.styles)
      return this
    },
    api = {
      getElement,
      labor,
    }

  return api
})()

export default mineral
