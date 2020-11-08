import React from 'react'
import Item from './Item'

const CategoryPage = ({ data }) => {
  return (
    <div>
      { data
        ? <ul>
          {/* quite a long list to render */}
          { data.map(item => <Item key={item.id} item={item}/>)}
        </ul>
        : 'No data to show'}
    </div>
  )
}

export default CategoryPage