const mineral = (element) => (() => {

  const events = {},
    createEventWrapper = function(event) {
      let handlers = Array.prototype.slice.call(arguments, 1)
      const name = event,
        fire = function() {
          handlers.map(fn =>
            fn(...arguments)
          )
        },
        addHandlers = function(fns) {
          handlers = handlers.concat(fns)
        },
        api = {
          addHandlers,
        }
      element.addEventListener(name, fire)
      return api
    },
    getElement = function() {
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
    laborEvents = function(config) {
      for (const k in config)
        if (events[k])
          events[k].addHandlers(config[k])
        else
          events[k] = createEventWrapper(k, config[k])
    },
    labor = function(config = {}) {
      const mappedConfig = this.publish('doMap', 'labor', config)
      laborAttributes(mappedConfig.attr)
      laborStyles(mappedConfig.styles)
      laborEvents(mappedConfig.events)
      return this
    },
    api = {
      getElement,
      labor,
    }

  return api
})()

export default mineral
