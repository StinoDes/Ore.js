export const _predoBrickConfigMap = (config) => {
    let map = {
        ...config,
        _method: {
            props: config.props,
            tree: config.tree,
            render: config.render
        }
    };
    delete map.render;
    delete map.tree;
    delete map.props;
    return map;
};
export const _doBrickConfigMap = (config) => {
    return config;
};
export const _propsToConfigMap = (config, props) => {
    for (var k in config) {
        if (typeof config[k] === 'string') {
            let matches = config[k].match(/\{\{[%a-zA-Z\_\$][a-zA-Z0-9]*\}\}/g);
            if (matches) {
                matches.map(match => {
                    let varname = match.replace(/\{|\}/g, '');
                    console.log('VARNAME', varname);
                    if (/(^\%)/.test(varname)) {
                        varname = varname.replace(/(^\%)/, '');
                        config[k] = config[k].replace(match, Ore.depot.retrieve(varname));
                    }
                    else if (props[varname])
                        config[k] = config[k].replace(match, eval('props.'+varname));
                    else
                        console.warn(varname + ' couldn\'t be found in props');
                })
            }
        }
    }
    return config;
};
export default { _predoBrickConfigMap, _doBrickConfigMap, _propsToConfigMap };