import mediator from './core/mediator'
import quarry from './core/quarry'
import mapper from './mapping'

export default (() => {

  mediator.installTo(mapper)
  mapper.registerAction('doMap', mapper.doMap)

  return {
    mapper,
    quarry,
  }

})()
