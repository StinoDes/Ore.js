const brick = (name, c) => (() => {

  const name = name,

    /**
     * Lifecycle methods
     */
    setConfiguration = config => {
      const lifecycles = {
          init:         config.init,
          willMount:    config.willMount,
          didMount:     config.didMount,
          willBuild:    config.willBuild,
          build:        config.build,
          didBuild:     config.didBuild,
          willUnmount:  config.willUnmount
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
      willUnmount
    } = setConfiguration(c),
    /**
     * Transactional methods.
     */
    refs = {
      virtual: null,
      actual: null
    },
    renderVirtual = config => build(config),
    compare = () => {
      return {}
    },
    transact = comparation => {
      const mineral = refs.actual
        .labor(comparation)
      didBuild([configuration])
      return mineral
    },

    /**
     * Building methods.
     */
    api = (config, children) => {
      !refs.virtual ? willMount([configuration]) : willBuild([configuration])

      refs.virtual = renderVirtual({
        ...configuration,
        ...config,
        append: children
      })

      //todo delete
      refs.actual = null
      if (!refs.actual) {
        refs.actual = refs.virtual
        didMount([configuration])
        return refs.virtual
      }
      else
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
