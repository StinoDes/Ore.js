/**
 * Created by Stijn on 28/04/16.
 */
import { LENGTH, COLOR, FUNC } from './constants';
export default function (type, val) {
    switch (type) {
        case LENGTH:
            return isLength(val);
        case COLOR:
            return isColor(val);
        case FUNC:
            return isFunc(val);
        default:
            return true;
    }
}
function isFunc (val) {
    let isfunc = true,
        isarroffunc = true;
    if (typeof val !== 'function')
        isfunc = false;
    else if (val.constructor === Array) {
        for (var k in val) {
            if (typeof val[k] !== 'function') {
                isarroffunc = false;
                break;
            }
        }
    }
    return isfunc || isarroffunc;
}
function isLength (val) {
    return /(\d+\s?px$)|(\d+\s?\%$)|(\d+\s?em$)|(\d+\s?rem$)/.test(val);
}
function isColor (val) {
    return /(#(?:[\da-f]{3}){1,2}|rgb\(\s*(?:\d{1,3},\s*){2}\d{1,3}\s*\)|rgba\(\s*(?:\d{1,3},\s*){3}\d*\.?\d+\s*\)|hsl\(\s*\d{1,3}(?:,\s*\d{1,3}%){2}\s*\)|hsla\(\s*\d{1,3}(?:,\s*\d{1,3}%){2},\s*\d*\.?\d+\s*\))/i.test(val)
}
