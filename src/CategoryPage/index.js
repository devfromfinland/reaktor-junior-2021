import React from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Item from './Item'

const CategoryPage = ({ data }) => {
  if (data) {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className='list'
            height={window.innerHeight}
            width={width}
            itemCount={data.length}
            itemSize={20}
            itemData={data}
          >
            {Item}
          </List>
        )}
      </AutoSizer>
    )
  } else {
    return <div>Waiting for data...</div>
  }
}

export default CategoryPage