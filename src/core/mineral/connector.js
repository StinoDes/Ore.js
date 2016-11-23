const connector = (element = false) => (customHooks = {}) => {

  const hooks         = {
      init () {
        return [{}, {}]
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

      diff (a, b) {
        if (typeof a === 'string')
          return a === b ? null : b
        else if (a.constructor === Array)
          return b.every((v, i) => v === a[i]) ? [] : b
        else if (typeof a === 'object') {
          const c = {...a, ...b},
            d     = {}
          Object.keys(c).forEach(v => {
            if(a[v] !== b[v])
              d[v] = b[v]
          })
          return Object.keys(d).length ? d : null
        }
      },

      isEmpty (c) {
        return Object.keys(c).length === 0
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
    retrieve        = () => {
      // return hooks.isEmpty(clean) ? null : clean
      return clean
    },
    connectorApi    = (config = false) => {
      if (!config)
        return retrieve()
      apply(config)
      return connectorApi
    }

  connectorApi.isConnector  = () => true
  connectorApi.diff         = hooks.diff

  let [clean, dirty] = hooks.init()


  return connectorApi
}

export default connector
