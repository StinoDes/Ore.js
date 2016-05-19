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
const regex = {
    prop: /(\{\{[%a-zA-Z\_\$]+(?:[~][a-zA-Z0-9]+)?\}\})/g,
    container: /(^\%)/,
    child: /(\~[\_\$0-9a-z]+)/,
    renderdata: /(\|[\S]+\|)/g,
};
export const _propsToConfigMap = (config, props, renderdata) => {
    for (var k in config) {
        if (typeof config[k] === 'string') {
            config[k] = _replaceWithRenderData(config[k], renderdata);
            config[k] = _replaceWithProps(config[k], props);
        }
        else if (typeof config[k] === 'object') {
            config[k] = _propsToConfigMap(config[k], props, renderdata);
        }
    }
    return config;
};
export const _replaceWithProps = (str, props) => {
    let matches = str.match(regex.prop);
    if (matches) {
        matches.map(match => {
            let varname = match.replace(/\{|\}/g, '');
            console.log('VARNAME', varname);
            if (regex.container.test(varname))
                str = _replaceWithContainer(str, match, varname);
            else if (props[varname])
                str = str.replace(match, eval('props.'+varname));
            else
                console.warn(varname + ' couldn\'t be found in props');
        })
    }
    return str;
};
export const _replaceWithContainer = (str, match, varname) => {
    let child;
    varname = varname.replace(/(^\%)/, '');
    if (regex.child.test(varname)) {
        child = varname.match(regex.child)[0];
        child = child.replace(/(\~)/, '');
        varname = varname.replace(regex.child, '');
    }
    console.log('VARNAME', varname, child);
    let value = Ore.depot.retrieve(varname);
    if (child)
        value = value[child];
    str = str.replace(match, value);
    return str;
};
export const _replaceWithRenderData = (str, renderdata) => {
    let matches = str.match(regex.renderdata);
    if (matches) {
        matches.map(match => {
            let varname = match.replace(/\|/g, '');
            console.log('renderdata', varname, renderdata);
            if (renderdata[varname] !== undefined)
                str = str.replace(match, eval('renderdata.'+varname));
            else
                console.warn(varname + ' couldn\'t be found in renderdata');
        })
    }
    return str;
};
export default { _predoBrickConfigMap, _doBrickConfigMap, _propsToConfigMap };