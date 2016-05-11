export const _predoBrickConfigMap = (config) => {
    let map = {
        ...config,
        _method: {
            render: config.render
        }
    };
    delete map.render;
    return map;
};
export const _doBrickConfigMap = (config) => {
    return config;
};
export default { _predoBrickConfigMap, _doBrickConfigMap };