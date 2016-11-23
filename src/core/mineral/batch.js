const batch = (elements) => (() => {
  const minerals = [...elements].map(el => el.isMineral ? el : el.mine),

    batchApi = function (config = false) {
      if (!config)
        return minerals.map(m => m())
      if (typeof config === 'object')
        minerals.forEach((m, i) =>
          m(Object.assign({}, config.constructor === Array ? config[i] : config))
        )
      return batchApi
    }

    batchApi[Symbol.iterator] = function* () {
      let i = 0
      while(i < minerals.length)
        yield minerals[i++]
      return true
    }

    batchApi.isBatch = () => true

    return batchApi
})()

export default batch
