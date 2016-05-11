export default function (Class) {
    return Class.extend({
        configurations: {
            value: {}
        },
        _mineral: {
            value: null,
            visible: false,
            editable: true
        },
        init (config) {
            this.configurations = {};
            this.set(config);
            return this;
        },
        set (config) {
            if (config.tree) {
                if (typeof config.tree === 'function')
                    config.tree = config.tree(this.Tree.tag.bind(this.Tree));
                config.tree = this.Tree.create(config.tree);
            }
            this.configurations = {...this.configurations, ...config};
        },
        do (config) {
            config = Ore.maps._predoBrickConfigMap(config);
            for (var k in config) {
                if (this.configurations[k]) {
                    if (config[k].constructor === Array)
                        this.configurations[k].call(this, config[k]);
                    else
                        this.configurations[k](config[k]);
                }
            };
            this.apply(Ore.maps._doBrickConfigMap(config));
        },
        apply (config) {

            this._callTree(config._method.tree);
            this._callRender(config._method.render);
        },
        _callTree: {
            value (tree) {
                if (tree !== undefined) {
                    tree(this.configurations.tree);
                }
            },
            visible: false,
            editable: false
        },
        _callRender: {
            value (render) {
                if (render !== undefined) {
                    if (!this.configurations.rootMineral) {
                        console.error('Define a rootMineral by passing it in the config to set.');
                        return;
                    }
                    if (!this.configurations.tree) {
                        console.warn('Using a tree to render your component might be easier.');
                    }
                    if (!render)
                        render = 'append';
                    let obj = {};
                    obj[render] = this.configurations.tree.process();
                    if (this._mineral)
                        this._mineral.do({replace: obj[render]});
                    else
                        this.configurations.rootMineral.do(obj);
                    this._mineral = obj[render];
                }
            },
            editable: false,
            visible: false
        }
    })
}
/*
TREE:

root: {
    <tag> : {
        config: {},
        <tag> : { ... }
    },
    <tag>: { ... }
}





 */