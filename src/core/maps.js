import { constants, validate } from '../utils';

export const _craftConfigMap = (config) => {
    let children = config.children || [],
        text = config.text || null;
    return {
        events: _eventMap({
            ...config,
            ...config.events
        }),
        attr: _attrMap({
            ...config,
            ...config.attr
        }),
        styles: _styleMap({
            ...config,
            ...config.styles
        }),
        children,
        text
    }
};
export const _eventMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.EVENTS) {
            if (validate(constants.FUNC, config[k]))
                obj[k] = config[k];
            else
                console.error(k+' was not a valid '+constants.FUNC+'.');
        }
        else if (/(^on[a-z]+$)/.test(k)) {
            if (validate(constants.FUNC, config[k]))
                obj[k.replace(/^on/, '')] = config[k];
            else
                console.error(k+' was not a valid '+constants.FUNC+'.');
        }
    }
    return obj;
};
export const _attrMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.ATTRIBUTES)
            obj[k] = config[k];
    }
    return obj;
};
export const _styleMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.CSS_PROPERTIES)
            if (validate(constants.CSS_PROPERTIES[k], config[k]))
                obj[k] = config[k];
            else
                console.error(k+' was not a valid '+constants.CSS_PROPERTIES[k]+'.');
    }
    return obj;
};

export default { _craftConfigMap, _eventMap, _attrMap };