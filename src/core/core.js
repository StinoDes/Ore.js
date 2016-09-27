export const mine = publish =>
  /**
   * Returns a mineral for the passed element/selector or creates a new mineral
   * @param {object|string} selector - An element you want converted to a mineral
   * or a selector to retrieve a mineral with. If the selector has the form of 'new<tagname>',
   * it will instead create a new mineral of said tag.
   * @param {object} [config] - A config to be passed when creating a new mineral.
   * @returns {*}
   */
  (selector, config) => {
    if (selector.nodeType)
      return publish('mineMineral', selector)
    else if (typeof selector === 'string') {
      if (/(new[a-zA-Z]+)/.test(selector)) {
        const element = document.createElement(selector.substr(3, selector.length - 1))
        return publish('mineMineral', element).labor(config)
      }
      const elements = document.querySelectorAll(selector)
      return publish('mineMineral', elements[0]).labor(config)
    }
    return false
  }
