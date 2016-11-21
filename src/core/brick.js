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
      const virtual = refs.virtual(),
        actual      = refs.actual(),
        comparation = {},
        diff        = (a, b) => {
          if (typeof a === 'string')
            return a === b ? null : b
          else if (a.constructor === Array)
            return b.every((v, i) => v === a[i]) ? [] : b
          else if (typeof a === 'object') {
            const c = {...a, ...b},
              d     = {}
            Object.keys(c).forEach(v => {
              if(a[v] !== b[v])
                d[v] = b[v]
            })
            return Object.keys(d).length ? d : null
          }
        }
      Object.keys(virtual).forEach(v => {
        const o = diff(actual[v], virtual[v])
        if (o)
          comparation[v] = o
      })
      return comparation
    },
    transact = comparation => {
      const mineral = refs.actual(comparation)
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
