export const extractAvailabilityText = (text) => {
  const regex = /<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/
  const result = text.match(regex)
  return result[1]
}

export const findAvailability = (array, itemId) => {
  for (let i = 0; i < array.length; i++) {
    if (itemId && array[i].id && itemId.toUpperCase() === array[i].id.toUpperCase()) {
      return extractAvailabilityText(array[i].DATAPAYLOAD)
    }
  }
  return 'not found'
}

// used for checking memory size in the beginning
export const checkMemSize = (item) => {
  let sizeInBytes = 0

  if (item) {
    switch (typeof (item)) {
      case 'number':
        sizeInBytes += 8
        break
      case 'string':
        sizeInBytes += item.length * 2 // or 4 if unicode?
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
          const keys = Object.keys(item)
          const values = Object.values(item)

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

// not in used
export const countManufacturers = (productList) => {
  let count = 0
  const manufacturers = {}
  for (let i = 0; i < productList.length; i++) {
    if (!manufacturers[productList[i].manufacturer]) {
      count++
      manufacturers[productList[i].manufacturer] = productList[i].manufacturer
    }
  }
  return {
    count,
    manufacturers: Object.keys(manufacturers)
  }
}

// not in used
export const convertArrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    }
  }, {})
}

// export const readAvailabilityData = (array) => {
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       [item.id]: extractAvailabilityText(item.DATAPAYLOAD)
//     }
//   }, {})
// }
