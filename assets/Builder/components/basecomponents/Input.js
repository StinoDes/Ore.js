/**
 * Created by Stijn on 02/03/16.
 */


//PROPERTIES TO PASS:
//on EVENTS
//class
//type
//name
//value
//placeholder
//id
//dataVar
//validation :: regex TODO

var Input = ['Component', {
    componentWillMount: function () {
        if (this.properties.dataVar)
            if (this._builder.getDataStore().dataVarExists(this.properties.dataVar))
                this._builder.getDataStore().addComponentAsSubscriberTo(this, [this.properties.dataVar]);
            else
                this._builder.getDataStore().createDataVar(this.properties.dataVar, (this.properties.value)?this.properties.value:'', 'string', this);
            this._builder.getDataStore().getDataVar(this.properties.dataVar, true).triggersRerender(false);
    },
    render: function () {
        var events = {};
        if (!this.properties.on === undefined)
            events = this.properties.on;
        if (events.input === undefined) {
            events.input = (function (e) {
                console.log(EZ(e.target).value());
                this._builder.getDataStore().setDataVar(this.properties.dataVar, EZ(e.target).value());
            }).bind(this);
        }

        return EZI.make('div', {
            class: 'input_container',
            children: [
                {'input': {
                    id: this.properties.id,
                    class: 'input ' + this.properties.type + ' ' + this.properties.class,
                    name: this.properties.name,
                    type: this.properties.type,
                    placeholder: this.properties.placeholder,
                    on: events,
                    value: this._builder.getDataStore().getDataVar(this.properties.dataVar)
                }}
            ]
        })
    }
}];


module.exports = Input;

