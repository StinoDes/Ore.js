export default function (Class) {

    return Class.extend({
        _store: {
            value: {},
            editable: true,
            visible: false
        },
        init (config) {
            this._store = {};
            this._initValues(config);
            return this;
        },
        _initValues (config) {
            for (var k in config) {
                this.new({name: k, ...config[k]});
            }
        },
        retrieve (config) {
            if (typeof config === 'string') {
                if (this._store[config])
                    return this._store[config].value;
                else {
                    console.error('Couldn\'t find entry "' + config + '" in the depot.');
                    return null;
                }
            }
            else if (config.constructor === Array)
                return config.map(key => this.retrieve(key));
            else if (typeof config === 'object')
                return Object.keys(config).map(key => this.retrieve(key) === config[key]);
        },
        /*
        //  {
        //      name: value,
        //      name: {
        //          newprops...
        //      }
        //  }
         */
        dispatch (config) {
            if (typeof config !== 'object')
                console.error('Dispatching to the Depot requires key-value pairs. Please pass an object.');
            else {
                for (var k in config) {
                    this._store[k].do(config[k]);
                }
            }
        },
        new (config) {
            this._store[config.name] = this.Container.create(config);
        }
    });
}