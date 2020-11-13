import React from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Item from './Item'

const ListItems = ({ itemData }) => {
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className='list'
          height={window.innerHeight - 206 - 16} // minus the space above (navbar height (105px), 1 scrollbar button gap (16px), header row, filter bar, etc.)
          width={width}
          itemCount={itemData.length}
          itemSize={38}
          itemData={itemData}
        >
          {Item}
        </List>
      )}
    </AutoSizer>
  )
}

export default ListItems