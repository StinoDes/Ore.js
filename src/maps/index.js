import glimmerMaps from './glimmer';
import coreMaps from './core';
import brickMaps from './brick';
export default {...coreMaps,...glimmerMaps, ...brickMaps,
    _doAddon: function (config) { return {...glimmerMaps._doAddon(config)}},
    _extractAddon: function (config) { return { ...glimmerMaps._extractAddon(config)}}
};