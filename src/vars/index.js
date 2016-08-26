import cssprops from './cssprops'
import attributes from './attributes'

const vars = (() => {

  const css = cssprops(),
    attr = attributes(),
    api = {
      get(type, name) {
        switch (type) {
        case 'css':
          return css(name)
        case 'attr':
          return attr(name)
        }
        return false
      },
    }

  return api

})()

export default vars
