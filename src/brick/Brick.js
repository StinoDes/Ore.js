export default function (Class) {
    return Class.extend({
        configurations: {
            value: {}
            //CONTAINS: TREE, ROOT
        },
        _refs: {
            get () {
                if (this.configurations.tree)
                    return this.configurations.tree._refs;
                else
                    console.warn('Tried to access refs, but there is no tree to get them from.');
                return {};
            },
            visible: false
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
                    config.tree = config.tree(this.Tree.tag.bind(this.Tree), this.Tree.brick.bind(this.Tree));
                config.tree = this.Tree.create(config.tree);
            }
            this.configurations = {...this.configurations, ...config};
        },
        do (config) {
            config = Ore.maps._predoBrickConfigMap(config);
            for (var k in config) {
                if (this.configurations[k]) {
                    if (config[k].constructor === Array)
                        this.configurations[k].apply(this, config[k]);
                    else
                        this.configurations[k].call(this, config[k]);
                }
            };
            this.apply(Ore.maps._doBrickConfigMap(config));
        },
        apply (config) {

            this._callTree(config._method.tree);
            this._callRender(config._method.render, config._method.props);
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
            value (render, props) {
                if (render !== undefined) {
                    //Warn and errors
                    if (!this.configurations.tree)
                        console.warn('Using a tree to render your component might be easier.');
                    //Return if needed (eg when rendering from a tree
                    else if (render === 'return')
                        return this.configurations.tree.process(props);
                    //Warn and errors
                    else if (!this.configurations.rootMineral) {
                        console.error('Define a rootMineral by passing it in the config to set.');
                        return;
                    }
                    //Append by default
                    if (!render)
                        render = 'append';
                    //Append to root
                    let obj = {};
                    obj[render] = this.configurations.tree.process(props);
                    if (this._mineral)
                        this._mineral.do({replace: obj[render]});
                    else {
                        this.configurations.rootMineral.do(obj);
                    }
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