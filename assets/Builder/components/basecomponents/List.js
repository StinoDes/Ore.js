var List = ['Component', {

    //Give ROW component to render in list (can be whatever)
    //In properties:
    //data || what will be showed in list
    //rowComponent || in what data will be shown

    componentWillMount: function () {
        this.setData(this.properties.data);
        this.setRowComponent(this.properties.rowComponent);
    },

    setData: function (data) {
        this._data = data;
    },
    setRowComponent: function (component) {
        this.addChildComponent('Row', component);
    },

    _getRows: function () {
        var rowArray = [];
        if (this._children.Row === undefined || !this._children.Row) {
            console.error('There is no defined rowcomponent. Set one using the \'setRowComponent\' method or passing it through the properties.');
            return [];
        }
        for (var k in this._data) {
            rowArray.push({'Row': {data: this._data[k]}});
        }
        console.log(rowArray);
        return rowArray;
    },
    render: function () {
        return EZI.make('div', {
            class: 'list',
            children: this._getRows()
        });
    }

}];

module.exports = List;