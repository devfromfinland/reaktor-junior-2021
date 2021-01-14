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

export const filterData = (filters, rawData) => {
  const {
    name, manufacturer, minPrice, maxPrice, showInStock, showLowStock, showOutOfStock
  } = filters

  // shallow copy data
  // todo: switch to deep copy data
  let copiedData = [...rawData]

  // assuming all input are logically corrected
  // todo: check input
  copiedData = copiedData.filter((item) => {
    if (name !== '') {
      if (!item.name.toUpperCase().includes(name.toUpperCase())) return false
    }

    if (manufacturer !== '') {
      if (!item.manufacturer.toUpperCase().includes(manufacturer.toUpperCase())) return false
    }

    if (minPrice !== '') {
      if (parseInt(minPrice, 10) > 0 && item.price < parseInt(minPrice, 10)) return false
    }

    if (maxPrice !== '') {
      if (parseInt(maxPrice, 10) > 0 && item.price > parseInt(maxPrice, 10)) return false
    }

    if (!showInStock) {
      if (item.availability === 'INSTOCK') return false
    }

    if (!showLowStock) {
      if (item.availability === 'LESSTHAN10') return false
    }

    if (!showOutOfStock) {
      if (item.availability === 'OUTOFSTOCK') return false
    }

    return true
  })

  return copiedData
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
