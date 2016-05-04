const capture  = (config, asRay) => {
    let { selector, query } = config,
        batch, glimmers = [];
    if (selector) {
        if (typeof selector === 'string' || selector._mined) {
            batch = EZI.collect(selector, true);
        }
        let batchExtr = batch.extract({glimmers: '*'});
        for (var k in batchExtr) {
            glimmers = [...glimmers, ...batchExtr[k].glimmers];
        }
    }
    else {
        for (var k in EZI.Quarry._cache._glimmers) {
            glimmers.push(EZI.Quarry._cache._glimmers[k]);
        }
    }
    if (query)
        glimmers = EZI.Quarry.screen(glimmers, query);
    return EZI.Quarry.GlimmerRay.create(glimmers);
};
const screen = (glimmers, query) => {
    let arr = [];
    for (var k in glimmers) {
        let b = true;
        if (EZI.maps._matchGlimmerQuery(glimmers[k], query))
            arr.push(glimmers[k])
    }
    return arr;
};
export { capture, screen }