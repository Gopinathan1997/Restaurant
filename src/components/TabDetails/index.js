import './index.css'

const TabDetails = props => {
  const {details, changeActiveId, activeTab} = props

  const onChangeActiveId = () => {
    changeActiveId(details.categoryId)
  }
  const classN = activeTab == details.categoryId ? 'highlight button' : 'button'

  return (
    <li className="listItem" key={details.categoryId}>
      <button
        type="button"
        value={details.id}
        className={classN}
        onClick={onChangeActiveId}
      >
        {details.category}
      </button>
    </li>
  )
}
export default TabDetails
