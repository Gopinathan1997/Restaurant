import {Link, withRouter} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'
import {FaSignOutAlt} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => {
  const renderNavBar = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        console.log(cartList)
        return (
          <nav className="navbar">
            <Link to="/">
              <h1 className="name">UNI Resto Cafe</h1>
            </Link>

            <div className="cart">
              <p className="large">My Orders</p>
              <Link to="/cart">
                <FaShoppingCart size={30} />
              </Link>
              <sup>{cartList.length}</sup>
            </div>
            <Link to="/">
              <FaSignOutAlt />
            </Link>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )

  const rendersuccess = () => (
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

        const onClickDecrement = e => {
          decrementCartItemQuantity(e.target.value)
        }

        const onClickIncrement = e => {
          incrementCartItemQuantity(e.target.value)
          console.log(e.target.value)
        }
        const onRemoveCartItem = e => {
          removeCartItem(e.target.value)
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
            {renderNavBar()}
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
                      <li className="cartlisting">
                        <img src={each.image} className="cart-image" />
                        <p>{each.name}</p>
                        <div className="row">
                          <button
                            value={each.dishiId}
                            onClick={onClickDecrement}
                          >
                            -
                          </button>
                          <p>{each.dishCount}</p>
                          <button
                            value={each.dishiId}
                            onClick={onClickIncrement}
                          >
                            +
                          </button>
                        </div>
                        <p>{totalPrice}</p>
                        <button value={each.dishiId} onClick={removeCartItem}>
                          X
                        </button>
                      </li>
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

  return <>{rendersuccess()}</>
}
export default withRouter(Cart)
