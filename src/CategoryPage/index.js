import React from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import Item from './Item'
import { useAppContext } from '../services/contextService'
import { useParams, Redirect } from 'react-router-dom'

const CategoryPage = () => {
  const { context } = useAppContext()
  const { category } = useParams()

  let data = null

  switch (category) {
    case 'jackets':
      data = context.jackets.read()
      break
    case 'shirts':
      data = context.shirts.read()
      break
    case 'accessories':
      data = context.accessories.read()
      break
    default:
      return <Redirect to='/' />
  }

  const renderListHeader = () => {
    return (
      <div className='row-header'>
        <div>Product name</div>
        <div>Manufaturer</div>
        <div>Price</div>
        <div>Colors</div>
        <div>Availability</div>
      </div>
    )
  }
  
  return (
    <>
      To add filters and quick search here

      { renderListHeader() }

      <AutoSizer>
        {({ height, width }) => (
          <List
            className='list'
            height={window.innerHeight - 105 - 16} // minus the space above (navbar height (105px), 1 scrollbar button gap (16px), header row, filter bar, etc.)
            width={width}
            itemCount={data.length}
            itemSize={38}
            itemData={data}
          >
            {Item}
          </List>
        )}
      </AutoSizer>
    </>
  )
}

export default CategoryPage