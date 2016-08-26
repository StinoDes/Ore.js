import laborMap from './laborMap'

const mapper = (() => {

  const maps = {},
    registerMap = (name, fn) => {
      if (maps[name])
        console.error(`There's already a registered mapping with name "${name}".`)
      maps[name] = fn(api.publish)
      return mapper
    },
    removeMap = (name) => {
      if (!maps[name])
        console.error(`There is no mapping with name "${name}" to delete`)
      delete maps[name]
      return mapper
    },
    setDefault = () => {
      // todo
      registerMap('labor', laborMap)
    },
    api = {
      registerMap,
      removeMap,
      setDefault,
      doMap(name) {
        const arg = Array.prototype.slice.call(arguments, 1)
        if (!maps[name]) {
          console.error(`There is no mapping with name "${name}" to execute`)
          return arg[0]
        }
        return maps[name](...arg)
      },
    }

  return api

})()

export default mapper
