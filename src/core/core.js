export const mine = publish =>
  /**
   * Returns a mineral for the passed element/selector or creates a new mineral
   * @param {object|string} selector - An element you want converted to a mineral
   * or a selector to retrieve a mineral with. If the selector has the form of 'new<tagname>',
   * it will instead create a new mineral of said tag.
   * @param {object} [config] - A config to be passed when creating a new mineral.
   * @returns {*}
   */
  (selector, config = {}) => {

    if (selector.tagName || (selector.length && typeof selector !== 'string'))
      return publish('mineMineral', selector)

    else if (typeof selector === 'string') {

      if (/^(new[a-zA-Z]+(?::\d+)?)$/.test(selector)) {
        const tag = selector.match(/^new([a-zA-Z]+)(?::\d+)?$/)[1]
        let element
        if (/^new[a-zA-Z]+(:\d+)$/.test(selector)) {
          const n = parseInt(selector.match(/^new[a-zA-Z]+:(\d+)$/)[1])
          return publish('mineMineral',
            Array.from(Array(n)).map(v => document.createElement(tag))
          )(config)
        }
        return publish('mineMineral', document.createElement(tag))(config)
      }

      const elements = document.querySelectorAll(selector)
      return publish('mineMineral', elements.length === 1 ? elements[0] : elements)(config)
    }

    return false
  }
