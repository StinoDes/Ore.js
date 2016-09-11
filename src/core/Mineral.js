// MINERAL OBJ
// todo: add text to labor
const mineral = (element) => (() => {

  /**
   * Creates a wrapper for events, returning a simple api. Binds to the scoped element.
   * Only one function actually handles the event ( fire() ). The custom handlers are called
   * herein.
   * @constructor
   * @param {string} event - The name of the event the wrapper is for.
   * @param {array} initFns - The initial handlers to bind to said event.
   * @returns {object} - A simple API to interact with the event.
   */
  const eventWrapper = function(event, initFns) {
      let handlers = [].concat(initFns)
      const name = event,
        fire = function() {
          handlers.map(fn =>
            fn.apply(mineralApi, arguments)
          )
        },
        /**
         * Adds the array of functions to handle the event.
         * @param {array} newFns - Array of functions to add to handlers.
         * @returns {eventWrapper} - Returns itself
         */
        addHandlers = function(newFns) {
          handlers = handlers.concat(newFns)
          return this
        },
        api = {
          addHandlers,
        }
      element.addEventListener(name, fire)
      return api
    },
    /**
     * Creates a retrieval object for the scoped element.
     * @param {object} config - A config-object to possibly filter by.
     * @returns {retrieval} - An instance of a retrieval object, offering an api to get the contained data.
     */
    retrieval = function(config = {}) {
      const styles = (() => {
          const r = window.getComputedStyle(element, null),
            v = {}
          for (let i = 0; i < r.length; i++) {
            const key = r[i]
              .toLowerCase().replace(/-(.)/g, function(match, group1) {
                return group1.toUpperCase()
              })
            v[key] = r.getPropertyValue(r[i])
          }
          return v
        })(),
        attr = (() => {
          const r = element.attributes,
            v = {}
          for (let i = 0; i < r.length; i++)
            v[ r[i].name ] = element.getAttribute(r[i].name)
          return v
        })(),
        classes = Array.prototype.slice.call(element.classList),
        returnStyles = prop => {
          if (!prop)
            return styles
          return styles[prop]
        },
        returnAttr = name => {
          if (!name)
            return attr
          return attr[name]
        },
        returnClasses = () => {
          return classes
        },
        /**
         * @param {string|array} path - The key or path to the value you want returned.
         * @param {string=} prop - The nested property you want returned.
         *                         Should only be used when not using a path array.
         * @return {var} - Returns the requested property
         */
        get = (path, prop) => {
          path = (path.constructor === Array) ? path : [path, prop]
          switch (path[0]) {
          case 'styles':
            return returnStyles(path[1])
          case 'attr':
            return returnAttr(path[1])
          case 'class':
            return returnClasses()
          default:
            return null
          }
        },
        api = {
          get,
        }
      return api
    },
    routines = {},
    events = {},

    /**
     * @returns {HTMLElement} - returns the enclosed element.
     */
    getElement = function() {
      return element
    },
    /**
     *
     * @param {object} config - A key-value map of routines and their callbacks.
     * @returns {mineral} - Returns the mineral it was called from.
     */
    routine = function(config = {}) {
      for (const name in config)
        if (routines[name])
          console.error('Routine "' + name + '" already exists.')
        else
          if (typeof config[name] === 'function')
            routines[name] = config[name]
          else
            console.error('Routine should be a function.')
      return this
    },
    laborRoutines = function(config = {}) {
      for (const k in config)
        if (routines[k]) {
          if (config[k].constructor === Array)
            routines[k].apply(mineralApi, config[k])
          else
            routines[k].call(mineralApi, config[k])
          delete config[k]
        }
    },
    laborAttributes = function(config = {}) {
      for (const k in config)
        element.setAttribute(k, config[k])
    },
    laborStyles = function(config = {}) {
      for (const k in config)
        element.style[k] = config[k]
    },
    laborEvents = function(config = {}) {
      for (const k in config)
        if (events[k])
          events[k].addHandlers(config[k])
        else
          events[k] = eventWrapper(k, config[k])
    },
    laborText = function(config = null) {
      if (typeof config === 'string')
        element.textContent = config
    },
    laborClasses = function(config = {}) {
      if (config.add)
        config.add.map(c => {
          if (!element.classList.contains(c))
            element.classList.add(c)
        })
      if (config.remove)
        config.remove.map(c => {
          if (element.classList.contains(c))
            element.classList.remove(c)
        })
      if (config.toggle)
        config.toggle.map(c => {
          if (element.classList.contains(c))
            element.classList.remove(c)
          else
            element.classList.add(c)
        })
    },
    laborDom = function(config = {}) {
      if (config.prepend)
        config.prepend.map(child => element.insertBefore(child.getElement(), element.firstChild))
      if (config.append)
        config.append.map(child => element.appendChild(child.getElement()))
    },

    /**
     * The main function for applying changes onto an element.
     * @param {object} config  - The config to apply onto the element. Can only interpret the following:
     * {
     *   events: { <eventname>: [...fn] },
     *   style: { <cssprop>: <cssval> },
     *   attr: { <attribute>: <value> },
     * }
     * @returns {mineral} - Returns itself.
     */
    labor = function(config = {}) {
      const mappedConfig = this.publish('doMap', 'labor', config)
      laborRoutines(mappedConfig)
      laborAttributes(mappedConfig.attr)
      laborStyles(mappedConfig.styles)
      laborEvents(mappedConfig.events)
      laborClasses(mappedConfig.class)
      laborText(mappedConfig.text)
      laborDom(mappedConfig.dom)
      return this
    },
    /**
     * The main function for retrieving changes from an element.
     * @param {object} config - Optional config to limit the data returned. Should look like this:
     * {
     *   style: [ <cssprop> ],
     *   attr: [ <attribute> ],
     * }
     * @returns {retrieval} - Returns a retrieval with the mineral's data.
     */
    retrieve = function(config = {}) {
      const mappedConfig = this.publish('doMap', 'retrieve', config)
      return retrieval(mappedConfig)
    },
    mineralApi = {
      getElement,
      labor,
      routine,
      retrieve,
    }

  return mineralApi
})()

export default mineral
