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
  const eventWrapper = function (event, initFns) {
      let handlers = [].concat(initFns)
      const name   = event,
        fire       = function () {
          handlers.map(fn =>
            fn.apply(mineralApi, arguments)
          )
        },
        /**
         * Adds the array of functions to handle the event.
         * @param {array} newFns - Array of functions to add to handlers.
         * @returns {eventWrapper} - Returns itself
         */
        addHandlers = function (newFns) {
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
    retrieval = function (config = {}) {
      return Object.keys(connectors).reduce((o, key) => {
        o[key] = connectors[key]()
        return o
      }, {})
    },
    routines = {},
    /**
     *
     * @param {object} config - A key-value map of routines and their callbacks.
     * @returns {mineral} - Returns the mineral it was called from.
     */
    routine = function (config = {}) {
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
    execRoutines = function (config = {}) {
      for (const k in config)
        if (routines[k]) {
          if (config[k].constructor === Array)
            routines[k].apply(mineralApi, config[k])
          else
            routines[k].call(mineralApi, config[k])
          delete config[k]
        }
    },
    connectors        = {
      attr: connector(element)({
        flush (el, dirty) {
          if (dirty)
            Object.keys(dirty).forEach(k => el.setAttribute(k, dirty[k]))
          return true
        },
      }),
      styles: connector(element)({
        flush (el, dirty) {
          if (dirty)
            Object.keys(dirty).forEach(k => {
              el.style[k] = dirty[k]
            })
          return true
        },
      }),
      event: connector(element)({
        flush (el, dirty) {
          return true
        },
        clean (clean, dirty) {
          if (dirty)
            Object.keys(dirty).forEach(k => {
              clean[k] ?
                clean[k].addHandlers(dirty[k]) :
                clean[k] = eventWrapper(k, dirty[k])
            })
          return clean
        },
      }),
      text: connector(element)({
        init () {
          return ['', '']
        },
        flush (el, dirty) {
          if (typeof dirty !== 'string')
            return false
          el.textContent = dirty
          return true
        },
      }),
      class: connector(element)({
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
            d.toggle.forEach(v => {
              c.indexOf(v) === -1 ?
                c.push(v) :
                c.splice(c.indexOf(v), 1)
            })
          if (d.remove)
            d.remove.forEach(v => {
              c.indexOf(v) !== -1 ?
                c.splice(c.indexOf(v), 1) :
                null
            })
          if (d.add)
            d.add.forEach(v => {
              c.indexOf(v) === -1 ?
                c.push(v) :
                null
            })
          return c
        },
      }),
      dom: connector(element)({
        init () {
          return [[], {}]
        },
        dirty (d, config) {
          if (config.empty)
            return config
          d.append = [].concat(
            d.append ? d.append : [],
            config.append ? config.append : []
          )
          d.prepend = [].concat(
            d.prepend ? d.prepend : [],
            config.prepend ? config.prepend : []
          )
          return d
        },
        flush(el, dirty) {
          if (dirty.empty)
            while (el.firstChild)
              el.removeChild(el.firstChild)
          if (dirty.prepend)
            dirty.prepend.forEach(child => el.insertBefore(child.element(), el.firstChild))
          if (dirty.append)
            dirty.append.forEach(child => el.appendChild(child.element()))
          return true
        },
        clean(c, d) {
          if (d.empty)
            c = []
          let {
            prepend,
            append,
          } = d
          c = mineralApi.publish('mineMineral', [].concat(prepend || [], [...c], append || []))
          return c
        },
        diff(a, b) {
          const aArr  = [...a],
            bArr      = [...b],
            areSame   = aArr.every(
              (v, i) => v.element().tagName === bArr[i].element().tagName
            )
          return areSame ? b() : b
        }
      }),
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
    labor = function (config = {}) {
      const mappedConfig = mineralApi.publish('doMap', 'labor', config)
      execRoutines(mappedConfig)
      connectors.attr(mappedConfig.attr)
      connectors.styles(mappedConfig.styles)
      connectors.event(mappedConfig.events)
      connectors.class(mappedConfig.class)
      connectors.text(mappedConfig.text)
      connectors.dom(mappedConfig.dom)
      return mineralApi
    },
    /**
     * The mineral-API, wrapping all functionality minerals have to offer.
     * It in itself is a function, with some methods to add further functionality (routines).
     * @param {object} [config] - An optional parameter. Whether or not you passed it, will decide
     * what the mineral will do.
     * When nothing is passed, a data-object will be returned for you to retrieve data.
     * When a config is passed, it will be executed on the contained HTMLElement, and return itself.
     * @returns {mineral|retrieval} - returns either a data object or itself depending on whether
     * a config was present or not
     */
    mineralApi = function (config = false) {
      if (!config)
        return retrieval()
      labor(config)
      return mineralApi
    }

  Object.defineProperty(mineralApi, '_connector', {
    configurable  : false,
    enumerable    : false,
    writable      : false,
    value         : name => connectors[name]
  })
  Object.defineProperty(mineralApi, '_connected', {
    configurable  : false,
    enumerable    : false,
    writable      : false,
    value         : () => Object.keys(connectors)
  })
  mineralApi.add        = routine
  mineralApi.isMineral  = () => true
  mineralApi.element    = () => element
  mineralApi.get        = () => element

  return mineralApi
})()

export default mineral
