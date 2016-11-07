import brick from './brick'

const COMPONENT_REGEX = /(^[A-Z\_\$])/,
  oven = (() => {
    const virtual = document.implementation.createHTMLDocument(),
      bricks = {},
      make = () => {

      },

      /**
       *
       * @param {string} tag - The name of the element or component you wish to create a brick for.
       * A name starting with a capital will return a brick, otherwise an element-helper will be returned.
       * @param config - The configuration applied to the eventually returned object. This config has a low priority.
       * @returns {brick}
       */
      bake = (tag, config = {}) => {
        return COMPONENT_REGEX.test(tag) ?
          installMediatorOnBrick(
            brick(tag, config)
          ):
          elementBrick(tag, config)
      },

      elementBrick = (tag, config) =>
        (_config = {}, children = []) =>
          api.publish('mineMineral', document.createElement(tag))
            .labor({
              ...config,
              ..._config,
              append: children,
            }),
      installMediatorOnBrick = function(target) {
        target.publish = api.publish
        return target
      },

      api = {
        make,
        bake,
      }

    return api
  })()

export default oven
