const mineral = (element) => (() => {

  const api = {
    getElement() {
      return element
    },
  }

  return api
})()

export default mineral
