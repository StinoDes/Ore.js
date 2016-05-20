import { constants, validate } from '../utils';

export const _craftConfigMap = (config) => {
    let append = config.children || [],
        text = config.text || null;
    return {
        events: _doEventMap({
            ...config,
            ...config.events
        }),
        attr: _doAttrMap({
            ...config,
            ...config.attr
        }),
        styles: _doStyleMap({
            ...config,
            ...config.styles
        }),
        class: _doClassMap(config),
        children: { append: { minerals: append, index: null }, prepend: { minerals: [], index: null } },
        text
    }
};
export const _doConfigMap = (config) => {
    let text = config.text || null;
    return {
        events: _doEventMap({
            ...config,
            ...config.events
        }),
        attr: _doAttrMap({
            ...config,
            ...config.attr
        }),
        styles: _doStyleMap({
            ...config,
            ...config.styles
        }),
        class: _doClassMap(config),
        children: _doChildrenMap(config),
        text,
        ..._doReplaceMap(config),
        ...Ore.maps._doAddon(config)
    }
};
export const _extractConfigMap = (config) => {
    let {children, text} = config;
    return {
        attr: _extractAttrMap({
            ...config,
            ...config.attr
        }),
        styles: _extractStyleMap({
            ...config,
            ...config.styles
        }),
        class: _extractClassMap(config),
        children, text,
        ...Ore.maps._extractAddon(config)
    }
};
export const _doReplaceMap = config => {
    let { replace, remove } = config,
        obj = {};
    if (remove !== undefined || remove !== null)
        obj.replace = '';
    if (replace !== undefined || replace !== null)
        obj.replace = replace;
    return obj;
};
export const _doChildrenMap = config => {
    // {
    //   append: {
    //     minerals: [],
    //     index: int
    //   },
    //   prepend: {
    //     minerals: [],
    //     index: int
    //   },
    // }
    let getChildrenObj = type => {
        if (config[type]) {
            if (config[type].constructor === Array)
                return {minerals: config[type], index: null};
            else if (config[type]._minerals)
                return {minerals: config[type]._minerals, index: null};
            else
                return { minerals: [config[type]], index: null };
        }
        else if (config[type+'At']) {
            if (config[type+'At'].minerals._minerals) {
                config[type+'At'].minerals = config[type+'At'].minerals._minerals;
            }
            return {minerals: config[type + 'At'].minerals, index: config[type + 'At'].index};
        }
        else if (typeof config.children === 'object') {
            if(!config.children[type]) {
                config.children[type] = { minerals: [], index: null };
            }
            if (config.children[type].minerals._minerals) {
                config.children[type].minerals = config.children[type].minerals._minerals;
            }
            return config.children;
        }
        else {
            return { minerals: [], index: null };
        }
    };
    return {
        append: getChildrenObj('append'),
        prepend: getChildrenObj('prepend')
    };

};
export const _doClassMap = config => {
    let c = (typeof config.class === 'string') ? config.class:false;
    return {
        add: config.addClass,
        toggle: config.toggleClass,
        remove: config.removeClass,
        set: c || config.setClass,
        ...config.class
    }

};
export const _extractClassMap = config => {
    return {
        get: config.getClass,
        has: config.hasClass,
        ...config.class
    }
};
export const _doEventMap = config => {
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
                console.error(k+' is not a valid '+constants.FUNC+'.');
        }
    }
    return obj;
};
export const _doAttrMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.ATTRIBUTES)
            obj[k] = config[k];
    }
    return obj;
};
export const _extractAttrMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.ATTRIBUTES)
            obj[k] = config[k]
    }
    return obj;
};
export const _doStyleMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.CSS_PROPERTIES) {
            if (validate(constants.CSS_PROPERTIES[k], config[k]))
                obj[k] = config[k];
            else
                console.error(k + ' is not a valid ' + constants.CSS_PROPERTIES[k] + '.');
        }
    }
    return obj;
};
export const _extractStyleMap = config => {
    let obj = {};
    for (var k in config) {
        if (k in constants.CSS_PROPERTIES) {
            obj[k] = config[k];
        }
    }
    return obj;
};

export default { _doConfigMap, _craftConfigMap, _doEventMap, _doAttrMap, _doClassMap, _doStyleMap,
    _extractConfigMap, _extractAttrMap, _extractClassMap, _extractStyleMap };