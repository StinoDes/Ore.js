const brick = (_name, c) => (() => {

  const name = _name,

    /**
     * Lifecycle methods
     * @param {object} config - Configuration containing hooks
     * @return {object} - Brick's lifecycle-hooks
     */
    setConfiguration = config => {
      const lifecycles = {
          init        : config.init,
          willMount   : config.willMount,
          didMount    : config.didMount,
          willBuild   : config.willBuild,
          build       : config.build,
          didBuild    : config.didBuild,
          willUnmount : config.willUnmount,
        },
        lifecycleWrapper = fn => args => fn ? fn.apply(configuration, args) : null,
        init = lifecycleWrapper(lifecycles.init),
        willMount = lifecycleWrapper(lifecycles.willMount),
        didMount = lifecycleWrapper(lifecycles.didMount),
        willBuild = lifecycleWrapper(lifecycles.willBuild),
        build = lifecycleWrapper(lifecycles.build),
        didBuild = lifecycleWrapper(lifecycles.didBuild),
        willUnmount = lifecycleWrapper(lifecycles.willUnmount)

      delete config.init,
        config.willMount,
        config.didMount,
        config.willBuild,
        config.build,
        config.didBuild,
        config.willUnmount

      return {
        init,
        willMount,
        didMount,
        willBuild,
        build,
        didBuild,
        willUnmount,
        configuration: config,
      }

    },
    {
      configuration,
      init,
      willMount,
      didMount,
      build,
      willBuild,
      didBuild,
      willUnmount,
    } = setConfiguration(c),
    /**
     * Transactional methods.
     */
    refs = {
      virtual : null,
      actual  : null,
    },
    renderVirtual = config => build([config]),
    compare = () => {
      const virtual = refs.virtual,
        actual      = refs.actual,
        comparation = {}

      virtual._connected().forEach(v => {
        const o = virtual._connector(v).diff(actual._connector(v)(), virtual._connector(v)())
        if (o)
          comparation[v] = o
      })
      return comparation
    },
    transact = comparation => {
      const mineral = refs.actual,
        domDiff = comparation.dom
      comparation.dom = null
      mineral(comparation)
      if (domDiff.isBatch)
        mineral({
          empty: true, children: domDiff
        })
      else
        mineral().dom(domDiff)
      didBuild([configuration])
      return mineral
    },

    /**
     * Building methods.
     * @param {object} config - configuration passed for this build
     * @param {array} children - array of child-minerals for this build
     * @return {mineral} - built
     */
    api = (config, children = []) => {
      const mergedConfig = {
        ...configuration,
        ...config,
        append: children,
      }

      !refs.virtual ? willMount([configuration]) : willBuild([configuration])

      refs.virtual = renderVirtual(mergedConfig)

      if (!refs.actual) {
        refs.actual = refs.virtual
        didMount([mergedConfig])
        return refs.virtual
      }
      return transact(compare())
    }

  /**
   * @return {boolean} - returns true.
   */
  api.isBrick = () => true

  init(configuration)

  return api

})()

export default brick
