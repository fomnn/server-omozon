export default eventHandler(async (event) => {
  const imageName = getRouterParam(event, 'id')

  const image = await useStorage('fs').getItemRaw(`variants/${imageName}`)

  return image
})