// todo: Make styles object for faster retrieving. Add style parsing.
import connector from './connector'
const mineral = element => (() => {

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
      const attr   = attrConnector(),
        styles     = stylesConnector(),
        classes    = classConnector(),
        obj        = {
          attr,
          styles,
          classes
        }

      return obj
    },
    routines = {},
    events = {},
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
      return mineralApi
    },
    execRoutines = function(config = {}) {
      for (const k in config)
        if (routines[k]) {
          if (config[k].constructor === Array)
            routines[k].apply(mineralApi, config[k])
          else
            routines[k].call(mineralApi, config[k])
          delete config[k]
        }
    },
    attrConnector     = connector(element)(
      {
        flush (el, dirty) {
          if (dirty)
            Object.keys(dirty).forEach( k => el.setAttribute(k, dirty[k]))
          return true
        }
      }
    ),
    stylesConnector   = connector(element)(
      {
        flush (el, dirty) {
          if (dirty)
            Object.keys(dirty).forEach( k => el.style[k] = dirty[k])
          return true
        }
      }
    ),
    eventConnector    = connector(element)(
      {
        flush(el, dirty) { return true },
        clean(clean, dirty) {
          if (dirty)
            Object.keys(dirty).forEach( k =>
              clean[k] ?
                clean[k].addHandlers(dirty[k]) :
                clean[k] = eventWrapper(k, dirty[k])
            )
          return clean
        }
      }
    ),
    textConnector     = connector(element)(
      {
        init () {
          return ['', '']
        },
        flush(el, dirty) {
          if (typeof dirty !== 'string')
            return false
          el.textContent = dirty
          return true
        }
      }
    ),
    classConnector    = connector(element)(
      {
        init () {
          return [[], {}]
        },
        flush (el, dirty) {
          if (!dirty)
            return true
          if (typeof dirty === 'string')
            el.classList.add(dirty)
          else if (dirty.constructor === Array)
            el.classList.add.apply(el, dirty)
          else if (typeof dirty === 'object') {
            if (dirty.add)
              dirty.add.forEach(c =>
                !el.classList.contains(c) ?
                  el.classList.add(c) :
                  null
              )
            if (dirty.remove)
              dirty.remove.forEach(c =>
                el.classList.contains(c) ?
                  el.classList.remove(c) :
                  null
              )
            if (dirty.toggle)
              dirty.toggle.forEach(c =>
                el.classList.contains(c) ?
                  el.classList.remove(c) :
                  el.classList.add(c)
              )
          }
          return true
        },
        clean (c, d) {
          if (!d)
            return c

          if (c === null || c.constructor !== Array)
            c = []

          if (d.toggle)
            d.toggle.forEach( v =>
              c.indexOf(v) === -1 ?
                c.push(v):
                c.splice(c.indexOf(v), 1)
            )
          if (d.remove)
            d.remove.forEach( v =>
              c.indexOf(v) === -1 ?
                null:
                c.splice(c.indexOf(v), 1)
            )
          if (d.add)
            d.add.forEach( v =>
              c.indexOf(v) === -1 ?
                c.push(v):
                null
            )
          return d
        }
      }
    ),
    laborDom = function(config = {}) {
      if (config.empty)
        while (element.firstChild) {
          element.removeChild(element.firstChild)
        }
      if (config.prepend)
        config.prepend.forEach(child => element.insertBefore(child.element(), element.firstChild))
      if (config.append) {
        config.append.forEach(child => element.appendChild(child.element()))
      }
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
      const mappedConfig = mineralApi.publish('doMap', 'labor', config)
      execRoutines(mappedConfig)
      attrConnector(mappedConfig.attr)
      stylesConnector(mappedConfig.styles)
      eventConnector(mappedConfig.events)
      classConnector(mappedConfig.class)
      textConnector(mappedConfig.text)
      laborDom(mappedConfig.dom)
      return mineralApi
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
      const mappedConfig = publish('doMap', 'retrieve', config)
      return retrieval(mappedConfig)
    },
    /**
     * The mineral-API, wrapping all functionality minerals have to offer.
     * It in itself is a function, with some methods to add further functionality (routines).
     * @param {object} [ config ] - An optional parameter. Whether or not you passed it, will decide
     * what the mineral will do.
     * When nothing is passed, a data-object will be returned for you to retrieve data.
     * When a config is passed, it will be executed on the contained HTMLElement, and return itself.
     * @returns {mineral|retrieval}
     */
    mineralApi = function(config = false) {
      if (!config)
        return retrieval()
      labor(config)
      return mineralApi
    }

  mineralApi.add        = routine
  mineralApi.isMinreral = () => true
  mineralApi.element    = () => element
  mineralApi.get        = () => element

  return mineralApi
})()

export default mineral
