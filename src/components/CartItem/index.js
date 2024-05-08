import {useContext} from 'react'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => {
  const {removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity} =
    useContext(CartContext)
  const {eachDetails} = props
  const {
    dishiId,
    name,
    count,
    currency,
    price,

    image,
  } = eachDetails
  return (
    <li className="cart-item">
      <img src={image} alt={name} className="cart-product-image" />
      <div className="cart-item-details-container">
        <div className="cart-product-title-brand-container">
          <p className="cart-product-title">{name}</p>
          <p>{currency} {price}</p>
        </div>
        <div className="cart-quantity-container">
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => {
              decrementCartItemQuantity(dishiId)
            }}
          >
            -
          </button>
          <p className="cart-quantity">{count}</p>
          <button
            type="button"
            className="quantity-controller-button"
            onClick={() => {
              incrementCartItemQuantity(dishiId)
            }}
          >
            +
          </button>
        </div>
        <div className="total-price-remove-container">
          <p className="cart-total-price">{price * count}/-</p>
          <button
            className="remove-button"
            type="button"
            onClick={() => {
              removeCartItem(dishiId)
            }}
          >
            Remove
          </button>
        </div>
      </div>
      <button
        className="delete-button "
        type="button"
        onClick={() => {
          removeCartItem(dishiId)
        }}
      >
        <AiFillCloseCircle color="#616E7C" size={20} />
      </button>
    </li>
  )
}

export default CartItem
