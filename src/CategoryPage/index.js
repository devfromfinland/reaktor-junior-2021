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
  
  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          className='list'
          height={window.innerHeight}
          width={width}
          itemCount={data.length}
          itemSize={124}
          itemData={data}
        >
          {Item}
        </List>
      )}
    </AutoSizer>
  )
}

export default CategoryPage