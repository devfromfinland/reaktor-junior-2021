export const checkMemSize = (item) => {
  let sizeInBytes = 0

  if (item) {
    switch (typeof(item)) {
      case 'number':
        sizeInBytes += 8
        break
      case 'string':
        sizeInBytes += item.length * 2  // or 4 if unicode?
        break
      case 'boolean':
        sizeInBytes += 4
        break
      case 'object':
        if (Array.isArray(item)) {
          for (let i = 0; i < item.length; i++) {
            sizeInBytes += checkMemSize(item[i])
          }
        } else {
          let keys = Object.keys(item)
          let values = Object.values(item)

          for (let i = 0; i < keys.length; i++) {
            sizeInBytes += keys[i].length * 2
            sizeInBytes += checkMemSize(values[i])
          }
        }
        break
      default:
        break
    }
  }
  
  return sizeInBytes
}