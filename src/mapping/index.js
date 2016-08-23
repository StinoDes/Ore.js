const mapper = (() => {

  const maps = {},
    registerMap = (name, fn) => {
      if (maps[name])
        throw new Error(`There's already a registered mapping with name "${name}".`)
      maps[name] = fn
      return mapper
    },
    removeMap = (name) => {
      if (!maps[name])
        throw new Error(`There is no mapping with name "${name}" to delete`)
      delete maps[name]
      return mapper
    },
    setDefault = () => {
      // todo
    },
    api = {
      registerMap,
      removeMap,
      setDefault,
      doMap(name) {
        const arg = Array.prototype.slice.call(arguments, 1)
        if (!maps[name])
          throw new Error(`There is no mapping with name "${name}" to execute`)
        return maps[name](...arg)
      },
    }

  api.setDefault()

  return api

})()

export default mapper
