import React from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Item from './Item'

const ListItems = ({ itemData }) => {
  if (!itemData || itemData.length === 0) {
    return (
      <div aria-label="no-product">
        No product to show
      </div>
    )
  }
  return (
    <AutoSizer>
      {({ width }) => (
        <List
          className="list"
          data-testid="list-items"
          height={window.innerHeight - 232} // minus the space above the table
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
