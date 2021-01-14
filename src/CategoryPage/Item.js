import React from 'react'
import NewAvailability from './NewAvailability'
import ColoredBox from '../components/ColoredBox'

const Item = ({ data, index, style }) => {
  const Colors = ({ colors }) => {
    return (
      <>
        { colors && colors.map((color) => <ColoredBox color={color} key={color} />)}
      </>
    )
  }

  return (
    <div style={style} className={(index % 2 === 0) ? 'odd' : 'even'}>
      <div className="item-content" aria-label="item-content">
        <div>{data[index].name}</div>
        <div>{data[index].manufacturer}</div>
        <div>{data[index].price}</div>
        <div>
          <Colors colors={data[index].color} />
        </div>
        <NewAvailability status={data[index].availability} />
      </div>
    </div>
  )
}

export default Item
