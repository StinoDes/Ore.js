const capture  = (config, asRay) => {
    let { selector, query } = config,
        batch, glimmers = [];
    if (selector) {
        if (typeof selector === 'string' || selector._mined) {
            batch = Ore.collect(selector, true);
            console.log(batch);
        }
        let batchExtr = batch.extract({glimmers: '*'});
        for (var k in batchExtr) {
            glimmers = [...glimmers, ...batchExtr[k].glimmers];
        }
    }
    else {
        for (var k in Ore.Quarry._cache._glimmers) {
            glimmers.push(Ore.Quarry._cache._glimmers[k]);
        }
    }
    if (query)
        glimmers = Ore.Quarry.screen(glimmers, query);
    return Ore.Quarry.GlimmerRay.create(glimmers);
};
const screen = (glimmers, query) => {
    let arr = [];
    for (var k in glimmers) {
        if (Ore.maps._matchGlimmerQuery(glimmers[k], query))
            arr.push(glimmers[k])
    }
    return arr;
};
export { capture, screen }