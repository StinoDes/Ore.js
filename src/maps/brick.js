export const _predoBrickConfigMap = (config) => {
    return {
        ...config,
        _method: {
            render: config.render
        }
    }
};
export const _doBrickConfigMap = (config) => {

};
export default { _predoBrickConfigMap, _doBrickConfigMap };