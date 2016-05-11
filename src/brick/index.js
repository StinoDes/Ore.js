import initBrick from './Brick';
import initTree from './Tree';
export default function (Class) {
    this.Quarry.newProperty('Brick',
        {
            value: initBrick(Class),
            editable: false
        });
    this.Quarry.Brick.newProperty('Tree',
        {
            value: initTree(Class),
            editable: false
        });
}