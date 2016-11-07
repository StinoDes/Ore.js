const brick = (name, c) => (() => {

  const name = name,
    configuration = c,
    refs = {
      virtual: null,
      actual: null
    },
    /**
     * Transactional methods.
     */
    renderVirtual = config => configuration.build(config),
    compare = () => {
      return {}
    },
    transact = comparation => {
      return refs.actual
        .labor(comparation)
    },

    /**
     * Building methods.
     */
    build = (config, children) => {
      refs.virtual = renderVirtual({
        ...configuration,
        ...config,
        append: children
      })
      if (!refs.actual) {
        refs.actual = refs.virtual
        return refs.virtual
      }
      else
        return transact(compare())
    }

    /**
     * @return {boolean} - returns true.
     */
  build.isBrick = () => true


  return build

})()

export default brick
