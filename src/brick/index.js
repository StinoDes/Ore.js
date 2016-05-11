import initBrick from './Brick';
export default function (Class) {
    this.Quarry.newProperty('Brick',
        {
            value: initBrick(Class),
            editable: false
        })
}