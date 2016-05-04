import { constants } from '../utils';
export const _glimmerConfigMap = config => {
    //{
    //    get: func,
    //    set: func,
    //    mineral: ...,
    //    style: {
    //      property: {
    //          propname: func / null
    //      }/[ propname ]
    //    }
    //    duration: number,
    //    initial: number,
    //    toValue: number,
    //    easing: easefunc,
    //    play: bool
    //}
    if (config.styles && config.mineral) {
        config.set = _glimmerStyleToSetMap(config.mineral, config.styles);
    }
    else if (config.styles || config.mineral)
        console.error('Pass both a mineral and style.');
    if (!config.set)
        console.error('Glimmers need to set something. Add a set function via `do` or initialisation, or add a style and mineral config.');
    if (!config.get && !config.initial) {
        config.initial = 0;
        console.warn('No initial value or get was passed. Defaulting to 0.');
    }
    if (typeof config.toValue !== 'number')
        console.error('You should a number to animate as \'toValue\'.');
    if (!config.duration)
        console.error('A duration is needed for Glimmers to shine.');
    if (!config.easing)
        config.easing = EZI.easings.DEFAULT;
    return {
        set: config.set,
        get: config.get || function () {return this.value},
        duration: config.duration,
        initial: (config.initial!==undefined)?config.initial:config.get(),
        toValue: config.toValue,
        easing: (typeof config.easing === 'string')?EZI.easings[config.easing].bind(EZI.easings):config.easing.bind(EZI.easings),
        play: (config.play !== undefined)?config.play:false
    }
};
export const _glimmerStyleToSetMap = (mineral, style) => {
    //style: {
    //      property: {
    //          propname: func / null
    //      }/[ propname ]
    //    }
    let props = {};
    if (typeof mineral === 'string')
        mineral = EZI.collect('mineral', true)[0];
    if (!mineral || !mineral._mined)
        console.error('Pass a mineral-object to apply the styles to');
    if (typeof style === 'string') {
        props = _glimmerStringStyleMap(style);
    }
    else if (style.constructor === Array) {
        props = _glimmerArrayStyleMap(style);
    }
    else if (typeof style === 'object') {
        props = _glimmerObjectStyleMap(style);
    }
    return function (value) {
        for (let k in props) {
            mineral._styles[k] = props[k](value, constants.CSS_PROPERTIES[k]);
        }
        EZI.Refiner.refineMineral(mineral);
    }
};
export const _glimmerStringStyleMap = (style) => {
    let props = {};
    if (!(style in constants.CSS_PROPERTIES))
        console.error(style + ' isn\'t a valid style.');
    else {
        props[style] = function (v, type /* color or length */) {
            return (type === constants.LENGTH) ? v + 'px' : v;
        }
    }
    return props;
};
export const _glimmerArrayStyleMap = (style) => {
    let props = {};
    for (let i in style) {
        if (!(style[i] in constants.CSS_PROPERTIES)) {
            console.error(style[i] + ' isn\'t a valid style.');
        }
        else {
            props[style[i]] = function (v, type /* color or length */) {
                return (type === constants.LENGTH) ? v + 'px' : v;
            }
        }
    }
    return props;
};
export const _glimmerObjectStyleMap = (style) => {
    let props = {};
    for (let k in style) {
        if (!(k in constants.CSS_PROPERTIES)) {
            console.error(k + ' isn\'t a valid style.');
        }
        else {
            if (typeof style[k] === 'function' && /(return\s)/i.test(style[k].toString())) {
                props[k] = style[k]
            }
            else {
                props[k] = function (v, type /* color or length */) {
                    return (type === constants.LENGTH) ? v + 'px' : v;
                }
            }
        }
    }
    return props;
};
export default { _glimmerConfigMap, _glimmerConfigMap };