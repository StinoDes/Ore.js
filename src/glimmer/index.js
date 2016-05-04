import initGlimmer from './Glimmer';
import initEasings from './Easings';
import initGlimmerRay from './GlimmerRay';
import { capture, screen } from './capture';
export default function (Class) {
    console.log('wtf mang');
    this.Quarry.newProperty('Glimmer', {
        value: initGlimmer(Class),
        editable: false
    });
    this.Quarry.newProperty('GlimmerRay', {
        value: initGlimmerRay(Class),
        editable: false
    });
    this.Quarry.newProperty('screen', {
        value: screen,
        editable: false
    });
    this.newProperty('easings', {
        value: initEasings(Class).create(),
        editable: false
    });
    this.newProperty('capture', {
        value: capture,
        editable: false
    });
}