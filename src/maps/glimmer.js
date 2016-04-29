export const _glimmerConfigMap = config => {
    //{
    //    get: func,
    //    set: func,
    //    duration: number,
    //    initial: number,
    //    toValue: number,
    //    easing: easefunc,
    //    play: bool
    //}
    if (!config.set)
        console.error('Glimmers need to set something. Add a set function via `do` or initialisation.');
    if (!config.get && !config.initial) {
        config.initial = 0;
        console.warn('No initial value or get was passed. Defaulting to 0.');
    }
    if (typeof config.toValue !== 'number')
        console.error('You should a number to animate as \'toValue\'.');
    if (!config.duration)
        console.error('A duration is needed for Glimmers to shine.');
    return {
        set: config.set,
        get: config.get || function () {return this.value},
        duration: config.duration,
        initial: (config.initial!==undefined)?config.initial:config.get(),
        toValue: config.toValue,
        easing: (typeof config.easing === 'string')?EZI.Easings[config.easing]:config.easing,
        play: (config.play !== undefined)?config.play:false
    }
};
export default { _glimmerConfigMap };