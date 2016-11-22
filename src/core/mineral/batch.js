const batch = (elements) => (() => {
  const minerals = elements.map(el => el.isMineral ? el : el.mine),

    batchApi = function (config = false) {
      if (!config)
        return minerals.map(m => m())
      minerals.forEach(m => m(Object.assign({}, config)))
      return batchApi
    }

    batchApi[Symbol.iterator] = function* () {
      let i = 0
      while(true)
        yield minerals[i++]
    }

    return batchApi
})()

export default batch
