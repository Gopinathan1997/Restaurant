import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaShoppingCart, FaSignOutAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import TabDetails from '../TabDetails'
import Navbar from '../Navbar'

import Dish from '../Dish'
import './index.css'

const apiconstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class Home extends Component {
  state = {
    name: '',
    apistatus: apiconstants.inProgress,
    count: 0,
    tabs: '',
    activeTab: 11,
    dishDetails: [],
    allDishCount: [],
  }

  componentDidMount() {
    this.getApicall()
  }

  changeCount = (condition, id) => {
    if (condition === '+') {
      this.setState(prev => ({count: prev.count + 1}))
    } else {
      this.setState(prev => ({count: prev.count - 1}))
    }

    this.setState(prevState => {
      const updatedDishDetails = prevState.dishDetails.map(category => ({
        ...category,
        categoryDishes: category.categoryDishes.map(dish => {
          if (dish.dishiId == id) {
            return {
              ...dish,
              count: condition ? dish.count + 1 : dish.count - 1,
            }
          }
          return dish
        }),
      }))

      const updatedAllDishCount = prevState.allDishCount.map(item => {
        if (item.id == id) {
          return {
            ...item,
            count: condition === '+' ? item.count + 1 : item.count - 1,
          }
        }
        return item
      })
      return {
        dishDetails: updatedDishDetails,
        allDishCount: updatedAllDishCount,
      }
    })
  }

  getApicall = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)

      const allDishCount = [
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
      ]

      const tabs = data[0].table_menu_list.map(each => ({
        category: each.menu_category,
        categoryId: each.menu_category_id,
        categoryImage: each.menu_category_image,
        categoryDishes: each.category_dishes.map(eachDish => ({
          name: eachDish.dish_name,
          price: eachDish.dish_price,
          currency: eachDish.dish_currency,
          calories: eachDish.dish_calories,
          description: eachDish.dish_description,
          availability: eachDish.dish_Availability,
          image: eachDish.dish_image,
          dishiId: eachDish.dish_id,
          count: 0,
          addOn: eachDish.addonCat.length > 0 ? true : false,
        })),
      }))

      const restaurantName = data[0].restaurant_name
      this.setState({
        name: restaurantName,
        apistatus: apiconstants.success,
        tabs,
        dishDetails: [tabs[0]],
        allDishCount,
      })
    } else {
      this.setState({apistatus: apiconstants.failure})
    }
  }
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  renderNavBar = () => {
    const {name, count} = this.state
    return (
      <nav className="navbar">
        <h1 className="name">{name}</h1>
        <div className="cart">
          <p className="large">My Orders</p>
          <Link to="/cart">
            <FaShoppingCart size={30} />
          </Link>
          <sup>{count}</sup>
        </div>
        <button onClick={this.onClickLogout}>
          <FaSignOutAlt />
        </button>
      </nav>
    )
  }

  changeActiveId = id => {
    const {tabs} = this.state

    const filteredList = tabs.filter(each => each.categoryId === id)
    this.setState({activeTab: parseInt(id), dishDetails: [...filteredList]})
  }

  renderTabs = () => {
    const {tabs, activeTab} = this.state

    return (
      <ul className="tabsContainer">
        {tabs.map(each => (
          <li key={each.id}>
            <TabDetails
              details={each}
              key={each.id}
              changeActiveId={this.changeActiveId}
              activeTab={activeTab}
            />
          </li>
        ))}
      </ul>
    )
  }

  renderItems = () => {
    const {activeTab, dishDetails, allDishCount} = this.state

    return (
      <ul className="itemsContainer">
        {dishDetails[0].categoryDishes.map(each => (
          <Dish
            details={each}
            key={each.id}
            changeActiveId={this.changeActiveId}
            activeTab={activeTab}
            categoryImage={dishDetails[0].categoryImage}
            allDishCount={allDishCount}
            category={dishDetails[0].category}
            changeCount={this.changeCount}
          />
        ))}
      </ul>
    )
  }

  renderCondition = () => {
    const {apistatus} = this.state

    switch (apistatus) {
      case apiconstants.success:
        return this.renderSuccessView()
      case apiconstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderSuccessView = () => (
    <>
      <Navbar />

      {this.renderTabs()}
      {this.renderItems()}
    </>
  )

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  render() {
    return <>{this.renderCondition()}</>
  }
}
export default Home
