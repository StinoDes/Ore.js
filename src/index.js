import mediator from './core/mediator'
import quarry from './core/quarry'
import mapper from './mapping'
import depot from './depot'
import util from './util'
import vars from './vars'
import { mine } from './core/core'

const api = (() => {

  mediator.installTo(mapper, quarry, util, vars)
  mapper.setDefault()
  mapper.subscribe('doMap', mapper.doMap, true)
  util.subscribe('util', util.useTool, true)
  vars.subscribe('getVar', vars.get, true)
  quarry.subscribe('mineMineral', quarry.mineMineral, true)

  return {
    mapper,
    quarry,
    util,
    vars,
    depot: depot(mediator.publish),
    mine: mine(mediator.publish),
  }

})()

module.exports = api
