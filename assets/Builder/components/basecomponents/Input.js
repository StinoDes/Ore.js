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
            if (this._builder.getDataBank().dataVarExists(this.properties.dataVar))
                this._builder.getDataBank().addAsListenerTo(this, [this.properties.dataVar]);
            else
                this._builder.getDataBank().createDataVar(this.properties.dataVar, (this.properties.value)?this.properties.value:'', 'string', this);
            this._builder.getDataBank().getDataVar(this.properties.dataVar, true).triggersRerender(false);
    },
    render: function () {
        var events = {};
        if (!this.properties.on === undefined)
            events = this.properties.on;
        if (events.input === undefined) {
            events.input = (function (e) {
                console.log(EZ(e.target).value());
                this._builder.getDataBank().setDataVar(this.properties.dataVar, EZ(e.target).value());
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
                    value: this._builder.getDataBank().getDataVar(this.properties.dataVar)
                }}
            ]
        })
    }
}];


module.exports = Input;

