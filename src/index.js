import mediator from './core/mediator'
import quarry from './core/quarry'
import mapper from './mapping'
import util from './util'
import vars from './vars'

export default (() => {

  mediator.installTo(mapper, quarry, util, vars)
  mapper.setDefault()
  mapper.subscribe('doMap', mapper.doMap, true)
  util.subscribe('util', util.useTool, true)
  vars.subscribe('getVar', vars.get, true)

  return {
    mapper,
    quarry,
    util,
    vars,
  }

})()
