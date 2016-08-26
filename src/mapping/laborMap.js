const laborMap = publish => {

  const attrMap = config => {
      const attrConf = {}
      for (const k in config)
        if (publish('getVar', 'attribute', k) !== false)
          attrConf[k] = config[k]
      return {
        ...{},
        ...attrConf,
        ...config.attr,
      }
    },
    stylesMap = config => {
      const stylesConf = {}
      for (const k in config)
        if (publish('getVar', 'attribute', k) !== false)
          stylesConf[k] = config[k]
      return {
        ...{},
        ...stylesConf,
        ...config.styles,
      }
    },
    eventsMap = config => {
      const eventsConf = {}
      for (const k in config) {
        const onE = `on${publish('util', 'capitalizeFirstLetter', k)}`
        if (publish('getVar', 'event', k) !== false || k === onE)
          eventsConf[k] = config[k]
      }
      return {
        ...{},
        ...eventsConf,
        ...config.events,
      }
    },
    map = config => ({
      ...{},
      attr: attrMap(config),
      styles: stylesMap(config),
      events: eventsMap(config),
    })

  return map

}

export default laborMap
