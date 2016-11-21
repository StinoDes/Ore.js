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
    classMap = config => {
      const keysToMap = ['toggleClass', 'addClass', 'removeClass'],
        classConfig = {}
      keysToMap.map(k => {
        if (config[k]) {
          const shortkey = k.substr(0, k.length - 5)
          if (config[k].constructor === Array)
            classConfig[shortkey] = config[k]
          else if (typeof config[k] === 'string')
            classConfig[shortkey] = [config[k]]
          delete config[k]
        }
      })
      if (typeof config.class === 'object')
        Object.keys(config.class).map(k => {
          let valToAdd
          if (config.class[k])
            if (config.class[k].constructor === Array)
              valToAdd = config.class[k]
            else if (typeof config.class[k] === 'string')
              valToAdd = [config.class[k]]
          if (classConfig[k])
            classConfig[k] = classConfig[k].concat(valToAdd)
          else
            classConfig[k] = valToAdd
        })
      else if (typeof config.class === 'string' || (config.class && config.class.constructor === Array)) {
        if (typeof config.class === 'string')
          config.class = (/.*\ .*/).test(config.class) ? config.class.split(' ') : [config.class]

        if (classConfig.add)
          classConfig.add = classConfig.add.concat(config.class)
        else
          classConfig.add = config.class
      }

      delete config.class
      return classConfig
    },
    domMap = config => {
      const domConfig = {},
        addTo = (key, obj) => {
          let parsedObj
          if (obj) {
            if (obj.constructor === Array) {
              obj = obj.map(v => {
                return v.hasOwnProperty('element') ? v : publish('mineMineral', v)
              })
              parsedObj = obj
            }
            else if (obj.hasOwnProperty('element'))
              parsedObj = [obj]
            else if (obj.nodeType)
              parsedObj = [publish('mineMineral', obj)]

            if (!domConfig[key])
              domConfig[key] = parsedObj
            else
              domConfig[key] = [...domConfig[key], ...parsedObj]
          }
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
      if (config.empty) {
        domConfig.empty = config.empty
        delete config.empty
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
      styles : stylesMap(config),
      attr   : attrMap(config),
      events : eventsMap(config),
      class  : classMap(config),
      dom    : domMap(config),
      ...rootMap(config),
    })

  return map

}

export default laborMap
