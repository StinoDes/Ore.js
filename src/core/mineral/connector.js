const connector = (element = false) => (customHooks = {}) => {

  const hooks         = {
      init () {
        const c = {},
          d     = {}
        return [c, d]
      },
      _merge (a, b) {
        if (!b)
          return a
        if (typeof b === 'string')
          return b

        else if (b.constructor === Array)
          return a === null ?
            b :
            a.concat(b)

        else if (typeof b === 'object')
          return a === null ?
            b :
            { ...a, ...b }

        return a
      },
      dirty (d, config) {
        return hooks._merge(d, config)
      },

      flush (el, d) { return true },

      clean (c, d) {
        const v = hooks._merge(c, d)
        d = null
        return v
      },

      fetch (c) {
        return c
      },

      ...customHooks,

    },

    apply           = config => {
      dirty = hooks.dirty(dirty, config)

      if (dirty !== null && hooks.flush(element, dirty)) {
        clean = hooks.clean(clean, dirty)
        dirty = hooks.init()[1]
      }
      else
        console.warn('Connector\'s flush did not return true.')

    },
    connectorApi    = (config = false) => {
      if (!config)
        return hooks.fetch(clean)
      apply(config)
      return connectorApi
    }

  let [clean, dirty] = hooks.init()

  connectorApi.isConnector  = () => true

  return connectorApi
}

export default connector
