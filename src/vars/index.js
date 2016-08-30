import cssprops from './cssprops'
import attributes from './attributes'
import events from './events'

const vars = (() => {

  const css = cssprops(),
    attr = attributes(),
    es = events(),
    api = {
      get(type, name) {
        switch (type) {
        case 'css':
          return css(name)
        case 'attr':
          return attr(name)
        case 'event':
          return es(name)
        }
        return false
      },
    }

  return api

})()

export default vars
