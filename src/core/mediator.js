const mediator = (() => {

  const channels = {},
        actions = {},
        subscribe = function (channel, fn) {
    if (!channels[channel]) channels[channel] = []
    channels[channel].push({
      context: this,
      callback: fn
    })
    return this
  },

        publish = function (channel) {
    if (!channels[channel]) return false
    let args = Array.prototype.slice.call(arguments, 1)
    for (var i in channels[channel]) {
      let subscription = channels[channel][i]
      subscription.callback.apply(subscription.context, args)
    }
    return this
  },

       registerAction  = function (action, fn) {
    actions[action] = {
      action,
      callback: fn,
      context: this,
    }
    return this
  },

      doFor = function (action) {
    if (!actions[action]) return false
    let args = Array.prototype.slice.call(arguments, 1)
    return actions[action].callback.apply(actions[action].context, args)
  },

      installMultiple = function (arr) {
    for(let k in arr)
      installSingle(arr[k])
  },

      installSingle = function (module) {
      module.subscribe = subscribe
      module.publish = publish
      module.registerAction = registerAction
      module.doFor = doFor
  }


  return {
    channels,
    actions,
    subscribe,
    publish,
    registerAction,
    doFor,
    installTo (module) {
      if (arguments.length > 1)
        installMultiple(Array.prototype.slice.call(arguments))
      installSingle(module)
      return this
    },
  }

})()

export default mediator
