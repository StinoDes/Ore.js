import mediator from './core/mediator'
import quarry from './core/quarry'
import torch from './core/torch'
import ease from './core/easings'
import oven from './core/oven'
import mapper from './mapping'
import depot from './depot'
import util from './util'
import vars from './vars'
import { mine } from './core/core'

/*
Bootstrapping code into a exportable api
 */

mediator.installTo(mapper, quarry, util, vars, torch, oven)
mapper.setDefault()
mapper.subscribe('doMap', mapper.doMap, true)
util.subscribe('util', util.useTool, true)
vars.subscribe('getVar', vars.get, true)
quarry.subscribe('mineMineral', quarry.mineMineral, true)
mediator.subscribe('ease', ease, true)

const api = {
  mapper,
  quarry,
  torch,
  util,
  vars,
  oven,
  bake  : oven.bake,
  depot : depot(mediator.publish),
  mine  : mine(mediator.publish),
}

module.exports = api
