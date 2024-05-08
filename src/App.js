import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'

import Login from './components/Login'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    allDish: {
      100000001: 0,
      100000003: 0,
      100000004: 0,
      100000005: 0,
      100000006: 0,
      100000007: 0,
      100000008: 0,
      100000009: 0,
      100000010: 0,
      100000011: 0,
      100000012: 0,
      100000014: 0,
      100000016: 0,
      100000017: 0,
      100000018: 0,
      100000019: 0,
      100000013: 0,
      100000015: 0,
      100000028: 0,
      100000026: 0,
      100000027: 0,
      100000029: 0,
    },
    allDishCount: [
      {id: 100000001, count: 0},
      {id: 100000003, count: 0},
      {id: 100000004, count: 0},
      {id: 100000005, count: 0},
      {id: 100000006, count: 0},
      {id: 100000007, count: 0},

      {id: 100000008, count: 0},
      {id: 100000009, count: 0},
      {id: 100000010, count: 0},
      {id: 100000011, count: 0},
      {id: 100000012, count: 0},
      {id: 100000014, count: 0},

      {id: 100000016, count: 0},
      {id: 100000017, count: 0},

      {id: 100000018, count: 0},
      {id: 100000019, count: 0},

      {id: 100000013, count: 0},
      {id: 100000015, count: 0},
      {id: 100000028, count: 0},
      {id: 100000026, count: 0},
      {id: 100000027, count: 0},
      {id: 100000029, count: 0},
    ],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  changeCount = () => {}

  incrementCartItemQuantity = id => {
    console.log('incrementCartItem function called')
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.dishiId) {
          const updatedQuantity = eachCartItem.dishCount + 1
          return {...eachCartItem, dishCount: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    console.log('DecrementCartItem function called')
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishiId === id,
    )

    if (productObject.dishCount > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.dishiId) {
            const updatedQuantity = eachCartItem.dishCount - 1
            return {...eachCartItem, dishCount: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    console.log(id)
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.dishiId !== id,
    )

    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.dishiId == product.dishiId,
    )
    console.log(productObject)

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.dishiId === eachCartItem.dishiId) {
            const updatedQuantity = eachCartItem.count + product.dishCount

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]

      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList, allDishCount} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          changeCount: this.changeCount,

          allDishCount,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
