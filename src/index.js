import mediator from './core/mediator'
import quarry from './core/quarry'
import mapper from './mapping'
import util from './util'

export default (() => {

  mediator.installTo(mapper, quarry, util)
  mapper.registerAction('doMap', mapper.doMap)
  util.registerAction('randomString', util.randomString)

  return {
    mapper,
    quarry,
  }

})()
