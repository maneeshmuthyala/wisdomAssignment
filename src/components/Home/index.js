import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    productsList: [],
    searchQuery: '', // State to store the search query
    sortOrder: 'A-Z', // State to manage sorting order
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://jsonplaceholder.typicode.com/users`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    this.setState({
      productsList: fetchedData,
      apiStatus: apiStatusConstants.success,
    })
  }

  handleSearchInputChange = event => {
    this.setState({searchQuery: event.target.value})
  }

  handleSortOrderChange = () => {
    this.setState(prevState => ({
      sortOrder: prevState.sortOrder === 'A-Z' ? 'Z-A' : 'A-Z',
    }))
  }

  getFilteredAndSortedProducts = () => {
    const {productsList, searchQuery, sortOrder} = this.state

    // Filter the list based on the search query
    const filteredProducts = productsList.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Sort the filtered list based on the selected sort order
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortOrder === 'A-Z') {
        return a.name.localeCompare(b.name)
      }
      return b.name.localeCompare(a.name)
    })

    return sortedProducts
  }

  render() {
    const {searchQuery, sortOrder} = this.state
    const filteredAndSortedProducts = this.getFilteredAndSortedProducts()
    return (
      <div className="main-cont">
        <div className="inp-cont">
          <input
            type="search"
            placeholder="Name"
            value={searchQuery}
            onChange={this.handleSearchInputChange}
          />
          <button type="button" onClick={this.handleSortOrderChange}>
            Sort {sortOrder === 'A-Z' ? 'Z-A' : 'A-Z'}
          </button>
        </div>
        <ul>
          {filteredAndSortedProducts.map(each => (
            <li key={each.id} className="cont">
              <Link to={`/users/${each.id}`} className="link-item">
                <p className="para">Name: {each.name}</p>
                <p className="para">Email: {each.email}</p>
                <p className="para">Address: {each.address.city}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Home
