const depotWrapper = (publish, subscribe) => {

  const transactors = {},
    depot = (obj) => {
      let data
      if (typeof obj === 'object')
        data = obj
      else if (typeof obj === 'undefined')
        data = {}
      else
        data = { data: obj }
      return {
        /**
         * Returns the requested deep-nested value.
         * @param {string[]|...string} [key] - An array of keys, or the first key.
         * @returns {*}
         */
        get (key = false) {
          let returnVal = data,
            keys = []
          if (key.constructor === Array)
            keys = key
          else if (arguments.length > 1)
            keys = Array.prototype.slice.call(arguments, 0)
          else if (arguments.length === 1 && key)
            keys = [key]
          keys.map(key =>
            returnVal = returnVal[key]
          )
          return returnVal
        },
        /**
         * Sets the requested deep-nested value.
         * @param {string[]|...string} [key] - An array of keys, or the first key.
         * @param {*} value - The new value to be set. Should always be the last argument.
         * @returns {depot} - Is chainable.
         */
        set (key = false, value) {
          let editValue = data,
            keys = [],
            lastKey
          if (key.constructor === Array)
            keys = key
          else if (arguments.length > 2) {
            keys = Array.prototype.slice.call(arguments)
            keys.pop()
          }
          else if (arguments.length === 2 && key)
            keys = [key]
          lastKey = keys.pop()
          keys.map(key =>
            editValue = editValue[key]
          )
          editValue[lastKey] = Array.prototype.pop.call(arguments)
          return this
        },
        /**
         * Updates a deep-nested value using a function.
         * @param {string[]|...string} [key] - An array of keys, or the first key.
         * @param {function} fn - The function that will perform the update. Should always be the last argument and return something.
         * @returns {depot} - Is chainable.
         */
        update (key, fn) {
          return this
        }
      }
    }
  return depot
}

export default depotWrapper
