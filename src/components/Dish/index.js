import {useState} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const Dish = props => {
  const {
    details,
    changeActiveId,
    activeTab,
    categoryImage,
    category,
    changeCount,
    allDishCount,
  } = props

  const {
    availability,
    calories,
    currency,
    description,
    image,
    name,
    count,
    price,
    dishiId,
    addOn,
  } = details
  const dishCount = allDishCount.find(item => item.id == dishiId)?.count || 0

  const [counter, setCount] = useState(dishCount)

  const renderAddToCartButton = () => (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...details, dishCount})
          console.log(details, dishCount)
        }

        const item = {dishImage: image, dishName: name}

        return (
          <button onClick={onClickAddToCart} className="add-to-cart">
            ADD TO CART
          </button>
        )
      }}
    </CartContext.Consumer>
  )

  const decrease = () => {
    if (counter > 0) {
      try {
        setCount(counter - 1)
        if (counter >= 1) {
          changeCount('-', details.dishiId, counter)
        }
      } catch (error) {
        console.error('Error occurred while decreasing count:', error)
      }
    }
  }

  const increase = () => {
    try {
      setCount(counter + 1)
      if (counter >= 0) {
        changeCount('+', details.dishiId, counter)
      }
    } catch (error) {
      console.error('Error occurred while increasing count:', error)
    }
  }

  return (
    <li className="listItem" key={details.categoryId}>
      <img className="c-image" src={categoryImage} alt={category} />
      <div className="items">
        <h1 className="name">{name}</h1>
        <p className="price">
          {currency} {price}
        </p>
        <p>{description}</p>
        {availability ? (
          <>
            <div className="button-container">
              <button onClick={decrease} className="increment">
                -
              </button>
              <p>{dishCount}</p>
              <button onClick={increase} className="increment">
                +
              </button>
            </div>
            {dishCount > 0 ? renderAddToCartButton() : ''}
          </>
        ) : (
          <p>Not available</p>
        )}
        {addOn ? <p className="cust">Customizations available</p> : ''}
      </div>
      <p className="calories">{calories} calories</p>
      <img className="dishImage" src={image} alt={name} />
    </li>
  )
}
export default Dish
