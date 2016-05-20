export default function (Class) {
    return Class.extend({
        _recipes: {
            value: {
                'a': { href: '#' },
                'b': {},
                'blockquote': {},
                'body': {},
                'br': {},
                'button': {},
                'canvas': {},
                'div': {},
                'footer': {},
                'form': {},
                'i': {},
                'image': {},
                'inputgroup': {},
                'input': {},
                'h1': {},
                'h2': {},
                'h3': {},
                'h4': {},
                'h5': {},
                'head': {},
                'header': {},
                'hr': {},
                'html': {},
                'li': {},
                'meta': {},
                'nav': {},
                'ol': {},
                'p': {},
                'pre': {},
                'title': {},
                'script': {},
                'span': {},
                'style': {},
                'strong': {},
                'ul': {}
            },
            editable: false,
            visible: false
        },
        _bricks: {
            value: {},
            editable: true,
            visible: false
        },
        recipes: {
            get () {
                let obj = {};
                for (var k in this._recipes) {
                    obj[k] = this.bake(k, this._recipes[k]);
                }
                return obj;
            }
        },
        bake: {
            value (tag, config) {
                if (/(^[A-Z\_\$])/.test(tag)) {
                    console.log('creating brick');
                    return this.createBrick(tag, config);
                }
                else {
                    return function (_config, children) {
                        return Ore.craft(tag, {...config, ..._config, children: children});
                    }
                }
            },
            editable: false
        },
        /*
            BRICK CONF STRUCTURE
            CAN USE DESCRIPTORS
            {

                build: function () {
                    return div();   //minerals
                }

            }
         */
        createBrick: {
            value (name, object, config) {
                let instance;
                this._bricks[name] = this.Brick.extend(object);
                return (function (_config, children) {
                    if (!instance)
                        instance = this._bricks[name].create(config||{});
                    if (!_config)
                        _config = {};
                    _config.children = children;
                    return this.build(instance, _config);
                }).bind(this);
            },
            editable: false
        },
        build: {
            value (brick, config) {
                let built;
                brick.preBuild(config);
                brick.conf = config;
                built = brick.build();
                brick.postBuild();
                return built;
            },
            editable: false
        }
    });
}