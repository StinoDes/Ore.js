/*
* {
*   [from]: num
*   to: num
*   duration: num
*   [easing]: str, func
*   [delay]: num
*   [set]: func, arr
*   [styles]: str, arr, obj
*   [callback]: func
*   [play]: bool
* }
*/
const glimmerMap = publish => {

  const rootKeys = {
      'from'     : 'number',
      'to'       : 'number',
      'duration' : 'number',
      'mineral'  : 'function',
      'delay'    : 'number',
      'easing'   : 'string',
      'play'     : 'boolean',
      'onEnd'    : 'function',
      'reverse'  : 'boolean',
      'reset'    : 'boolean',
    },
    setMap = config => {
      const set = {}
      let functions = [],
        styles      = {},
        i           = 0

      // Normalise styles to k-v map
      if (config.styles && config.mineral)
        if (typeof config.styles === 'string')
          styles[config.styles] = null
        else if (config.styles.constructor === Array)
          config.styles.map(entry => {
            styles[entry] = null
          })
        else if (typeof config.styles === 'object')
          styles = config.styles

      if (config.set)
        if (typeof config.set === 'function')
          functions['0'] = config.set
        else if (config.set.constructor === Array)
          functions = config.set

      set.functions = []
      functions.forEach(entry => {
        if (!entry)
          return functions.splice(functions.indexOf(entry), 1)
        set.functions[i] = entry
        i++
        return entry
      })
      Object.keys(styles).forEach(key => {
        if (publish('getVar', 'css', key) !== false)
          if (!styles[key])
            set[key] = v => v
          else
            set[key] = styles[key]
      })
      set.do = (v, mineral) => {
        const doStyles = {}
        set.functions.forEach(fn => { fn(v) })
        Object.keys(set).forEach(key => {
          if (key !== 'do' && key !== 'functions')
            doStyles[key] = set[key](v)
        })
        if (Object.keys(doStyles).length)
          mineral({ styles: doStyles })
      }
      delete config.set
      delete config.styles
      return set
    },

    addSetFunction = (mappedConfig, config) => {
      if (config.set || config.styles)
        return {
          set: setMap(config),
          ...mappedConfig,
        }
      return mappedConfig
    },

    rootMap = config => {
      const root = {}
      Object.keys(rootKeys).forEach(k => {
        if (typeof config[k] !== 'undefined' && typeof config[k] === rootKeys[k])
          root[k] = config[k]
      })
      return root
    },

    map = config => addSetFunction({
      ...rootMap(config),
    }, config)

  return map
}

export default glimmerMap
