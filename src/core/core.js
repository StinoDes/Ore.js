export const mine = publish => selector => {
  if (selector.nodeType)
    return publish('mineMineral', selector)
  else if (typeof selector === 'string') {
    const elements = document.querySelectorAll(selector)
    return publish('mineMineral', elements[0])
  }
  return false
}
