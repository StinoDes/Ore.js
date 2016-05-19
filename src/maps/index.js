import glimmerMaps from './glimmer';
import coreMaps from './core';
export default {...coreMaps,...glimmerMaps,
    _doAddon: function (config) { return {...glimmerMaps._doAddon(config)}},
    _extractAddon: function (config) { return { ...glimmerMaps._extractAddon(config)}}
};