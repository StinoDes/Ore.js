var List = ['Component', {

    //Give ROW component to render in list (can be whatever)
    //In properties:
    //data || what will be showed in list
    //rowComponent || in what data will be shown

    componentWillMount: function () {
        //SET DATA
        //EITHER SET ARRAY OR DATAVAR FROM BANK
        if (typeof this.properties.data === 'string') {
            console.log('adding as listener');
            console.log(this);
            this._builder.getDataBank().addAsListenerTo(this, [this.properties.data]);
        }
        else
            this.setData(this.properties.data);

        this.setRowComponent(this.properties.rowComponent);
    },

    setData: function (data) {
        this._data = data;
    },
    setRowComponent: function (component) {
        this.addChildComponent('Row', component);
    },
    dataVarsHaveUpdated: function () {
        this.setData(this._builder.getDataBank().getDataVar(this.properties.data));
    },
    _getRows: function () {
        var rowArray = [];
        if (this._children.Row === undefined || !this._children.Row) {
            console.error('There is no defined rowcomponent. Set one using the \'setRowComponent\' method or passing it through the properties.');
            return [];
        }
        for (var k in this._data) {
            if (this._data[k])
                rowArray.push({'Row': {data: this._data[k], _copy: true}});
        }
        return rowArray;
    },
    render: function () {
        console.log('rendering list');
        return EZI.make('ul', {
            class: 'list',
            children: this._getRows()
        });
    }

}];

module.exports = List;