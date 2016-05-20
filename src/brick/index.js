import initOven from './oven';
import initBrick from './brick';

export default function (Class) {
    this.newProperty('Oven', {
        value: initOven(Class),
        editable: false
    });
    this.Oven.newProperty('Brick',{
        value: initBrick(Class),
        editable: false
    });
}