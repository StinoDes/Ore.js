const mediator = (() => {

  const channels = {},
    subscribe = function (channel, fn, isSingle) {
      const subscription = {
        context  : this,
        callback : fn,
      }
      if (!isSingle) {
        if (!channels[channel]) channels[channel] = []
        channels[channel].push(subscription)
      }
      else {
        if (channels[channel]) {
          console.error('Channel is already defined. Can\'t redefine as a single channel.')
          return false
        }
        channels[channel] = subscription
      }
      return this
    },

    publish = function (channel) {
      const args = Array.prototype.slice.call(arguments, 1)
      if (!channels[channel]) return false
      if (channels[channel].constructor !== Array) {
        const subscription = channels[channel],
          returnVal = subscription.callback.apply(subscription.context, args)
        if (typeof returnVal === 'undefined')
          return this
        return returnVal
      }
      for (const i in channels[channel]) {
        const subscription = channels[channel][i]
        subscription.callback.apply(subscription.context, args)
      }
      return this
    },

    installMultiple = function (arr) {
      for (const k in arr)
        installSingle(arr[k])
    },

    installSingle = function (module) {
      module.subscribe = subscribe
      module.publish = publish
    }

  return {
    channels,
    subscribe,
    publish,
    installTo (module) {
      if (arguments.length > 1)
        installMultiple(Array.prototype.slice.call(arguments))
      installSingle(module)
      return this
    },
  }

})()

export default mediator
