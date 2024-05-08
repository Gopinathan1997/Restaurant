import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import Navbar from '../Navbar'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
      } = value

      const {dishiId} = cartList

      const onClickDecrement = event => {
        decrementCartItemQuantity(event.target.value)
      }

      const onClickIncrement = event => {
        incrementCartItemQuantity(event.target.value)
      }
      const onRemoveCartItem = event => {
        removeCartItem(event.target.value)
      }

      const showEmptyView = cartList.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      let totalPrice = 0

      cartList.forEach(eachCartItem => {
        totalPrice += eachCartItem.price * eachCartItem.dishCount
      })

      return (
        <>
          <Navbar />
          <div className="cart-container">
            {showEmptyView ? (
              <div className="cart-empty-view-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                  className="cart-empty-img"
                  alt="cart empty"
                />
                <h1 className="cart-empty-heading">Your Cart Is Empty</h1>

                <Link to="/">
                  <button type="button" className="shop-now-btn">
                    Shop Now
                  </button>
                </Link>
              </div>
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                </button>

                <ul>
                  {cartList.map(each => (
                    <CartItem eachDetails={each} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Cart)
