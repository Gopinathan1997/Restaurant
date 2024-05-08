import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSignOutAlt, FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'
import './index.css'

class Navbar extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderNavBar = () => {
    const {cartList} = this.context
    return (
      <nav className="navbar">
        <h1 className="name">UNI Resto Cafe</h1>
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
  }

  render() {
    return <>{this.renderNavBar()}</>
  }
}
Navbar.contextType = CartContext
export default withRouter(Navbar)
