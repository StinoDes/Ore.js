import initBrick from './Brick';
export default function (Class) {
    this.Quarry.newProperty('Brick', initBrick(Class),
        {
            editable: false
        })
}