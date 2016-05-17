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
            if (typeof config === 'string')
                return this._store[config].value;
            else if (config.constructor === Array)
                return config.map(key => this._store[key].value);
            else if (typeof config === 'object')
                return Object.keys(config).map(key => this._store[key].value === config[key]);
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