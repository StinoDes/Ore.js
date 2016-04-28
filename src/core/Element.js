/**
 * Created by Stijn on 28/04/16.
 */
export default function (Class) {
    return Class.extend({
        init (element, id) {
            this._element = element;
            return this;
        },
        getElement () {
            return this._element;
        }
    })
}
