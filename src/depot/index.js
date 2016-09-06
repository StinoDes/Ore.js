const depotWrapper = (publish, subscribe) => {

  const traders = {},
    notify = (keys, data) => {
      const handlers = {}
      Object.keys(traders).map(tradersKey => {
        traders[tradersKey].map(handler => {
          if (!handlers[handler._id])
            handlers[handler._id] = handler
        })
      })
      Object.keys(handlers).map(keyToExec => {
        handlers[keyToExec].call(data)
      })
    },

    trader = (keys, fn) => {
      return {
        _id: publish('util', 'randomString', 16, 'aA'),
        call(store) {
          let subStore = store
          keys.map(k => { subStore = subStore[k] })
          fn(subStore)
        }
      }
    },

    depot = (obj = {}) => {
      let data,
        dirtyKeys = []

      const addDirtyKeys = keys => {
        if (keys.length && keys[0])
          dirtyKeys.push(keys.join('.'))
        else
          dirtyKeys.push('')
      }

      if (typeof obj === 'object')
        data = publish('util', 'clone', obj)
      else
        data = { data: obj }

      return {
        /**
         * Returns the requested deep-nested value.
         * @param {string[]|...string} [key] - An array of keys, or the first key.
         * @returns {*}
         */
        get (key = false) {
          let returnVal = publish('util', 'clone', data),
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
          let clone = publish('util', 'clone', data),
            editValue = clone,
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
          data = clone
          addDirtyKeys(keys)
          return this
        },
        /**
         * Updates a deep-nested value using a function.
         * @param {string[]|...string} [key] - An array of keys, or the first key.
         * @param {function} fn - The function that will perform the update. Should always be the last argument and return something.
         * @returns {depot} - Is chainable.
         */
        update (key, fn) {
          let clone = publish('util', 'clone', data),
            editValue = clone,
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
          editValue[lastKey] = Array.prototype.pop.call(arguments)(editValue[lastKey])
          data = clone
          addDirtyKeys(keys)
          return this
        },
        /**
         * Calls traders to be executed.
         * @returns {depot} - returns itself
         */
        transact () {
          notify(dirtyKeys, data)
          dirtyKeys = []
          return this
        },


        /**
         * Adds a function to handle store changes
         * @param {string[]|...string} [key] - An array of keys, or the first key
         * @param {function} fn - The function to be called
         */
        trade (key, fn) {
        let listenTo = [],
          keystring
        if (typeof key === 'function')
          fn = key
        else if(key.constructor === Array)
          listenTo = key
        else if (arguments.length > 2) {
          listenTo = Array.prototype.slice.call(arguments, 0, arguments.length - 2)
        }
        else if (arguments.length === 2 && key)
          listenTo = [key]
        keystring = listenTo.join('.')
        if (traders[keystring])
          traders[keystring].push(trader(listenTo, fn))
        else
          traders[keystring] = [trader(listenTo, fn)]
        return this
      },
    }
  }
  return depot
}

export default depotWrapper
