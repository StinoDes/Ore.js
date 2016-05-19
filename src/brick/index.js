import initBrick from './Brick';
import initTree from './Tree';
import initDepot from './Depot';
import initContainer from './Container';
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
    this.newProperty('Depot', {
        value: initDepot(Class),
        editable: false
    });
    this.newProperty('bakeBrick', {
        value (config) {
            return (function (root) {
                let brick = this.Quarry.Brick.create(Ore.cloneConfig(config));
                if (root)
                    brick.set({rootMineral: root});
                return brick;

            }).bind(this);
        },
        editable: false
    });
    this.Depot.newProperty('Container', {
        value: initContainer(Class),
        editable: false,
        visible: false
    })
}