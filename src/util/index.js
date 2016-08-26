const util = (() => {

  const randomString = function(length, chars) {
      let mask = '',
        result = ''
      if (chars.indexOf('a') > -1)
        mask += 'abcdefghijklmnopqrstuvwxyz'
      if (chars.indexOf('A') > -1)
        mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (chars.indexOf('#') > -1)
        mask += '0123456789'
      if (chars.indexOf('!') > -1)
        mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\'
      for (let i = length; i > 0; i--)
        result += mask[Math.floor(Math.random() * mask.length)]
      return result
    },
    capitalizeFirstLetter = string => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    api = {
      randomString,
      capitalizeFirstLetter,
      useTool(name) {
        const args = Array.prototype.slice.call(arguments, 1)
        return api[name](...args)
      },
    }

  return api

})()

export default util
