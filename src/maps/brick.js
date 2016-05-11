export const _predoBrickConfigMap = (config) => {
    let map = {
        ...config,
        _method: {
            tree: config.tree,
            render: config.render
        }
    };
    delete map.render;
    delete map.tree;
    return map;
};
export const _doBrickConfigMap = (config) => {
    return config;
};
export default { _predoBrickConfigMap, _doBrickConfigMap };