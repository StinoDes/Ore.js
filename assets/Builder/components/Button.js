/**
 * Created by Stijn on 02/03/16.
 */
/**
 * Created by Stijn on 02/03/16.
 */
//COMPONENT
//BASIC ELEMENT
var Button = Object.create(require('./Component'));

Button.render = function () {
    var btn = EZI.make('a', {class: 'button', href: this.properties.link, style: this.properties.style});
    btn.text(this.properties.text);
    return btn;
};


module.exports = Button;

