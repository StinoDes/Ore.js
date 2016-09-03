const laborMap = publish => {

  const attrMap = config => {
      const attrConf = {}
      for (const k in config)
        if (publish('getVar', 'attr', k) !== false) {
          attrConf[k] = config[k]
          delete config[k]
        }
      return {
        ...{},
        ...attrConf,
        ...config.attr,
      }
    },
    stylesMap = config => {
      const stylesConf = {}
      for (const k in config)
        if (publish('getVar', 'css', k) !== false) {
          stylesConf[k] = config[k]
          delete config[k]
        }
      return {
        ...{},
        ...stylesConf,
        ...config.styles,
      }
    },
    eventsMap = config => {
      const eventsConf = {}
      for (const k in config) {
        const onE = k.replace(/(on)/, '').toLowerCase()
        if (publish('getVar', 'event', k) !== false) {
          eventsConf[k] = config[k]
          delete config[k]
        }
        else if (publish('getVar', 'event', onE) !== false) {
          eventsConf[onE] = config[k]
          delete config[k]
        }
      }
      return {
        ...{},
        ...eventsConf,
        ...config.events,
      }
    },
    domMap = config => {
      const domConfig = {},
        addTo = (key, obj) => {
          let parsedObj
          if (obj.constructor === Array) {
            obj = obj.map(v => {
              return v.hasOwnProperty('getElement') ? v : publish('mineMineral', v)
            })
            parsedObj = obj
          }
          else if (obj.hasOwnProperty('getElement'))
            parsedObj = [obj]
          else if (obj.nodeType)
            parsedObj = [publish('mineMineral', obj)]

          if (!domConfig[key])
            domConfig[key] = parsedObj
          else
            domConfig[key] = [...domConfig[key], ...parsedObj]
        },
        mapFor = configToMap => {
          for (const k in configToMap)
            switch (k) {
            case 'append':
              addTo('append', configToMap[k])
              delete configToMap[k]
              break
            case 'prepend':
              addTo('prepend', configToMap[k])
              delete configToMap[k]
              break
            }
        }

      mapFor(config)
      if (config.dom) {
        mapFor(config.dom)
        delete config.dom
      }

      return domConfig
    },

    rootMap = config => {
      const rootConf = {},
        IGNORE_ROOT = ['attr', 'styles', 'events']
      for (const k in config)
        if (typeof config[k] !== 'undefined' && IGNORE_ROOT.indexOf(k) <= -1)
          rootConf[k] = config[k]
      return rootConf
    },
    map = config => ({
      styles: stylesMap(config),
      attr: attrMap(config),
      events: eventsMap(config),
      dom: domMap(config),
      ...rootMap(config),
    })

  return map

}

export default laborMap
