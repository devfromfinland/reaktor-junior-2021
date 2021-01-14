import React from 'react'

const NewAvailability = ({ status }) => {
  const addStyle = () => {
    switch (status) {
      case 'INSTOCK':
        return <span className="instock">yes</span>
      case 'LESSTHAN10':
        return <span className="lessthan10">{'< 10'}</span>
      case 'OUTOFSTOCK':
        return <span className="outofstock">no</span>
      case 'Fatal Error':
        console.log('Error: Availability variable was not set up')
        return <span className="outofstock">Error!</span>
      default:
        return status
    }
  }

  return (
    <div>
      { addStyle() }
    </div>
  )
}

export default NewAvailability
