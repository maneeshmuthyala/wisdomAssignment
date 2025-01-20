import {useParams, Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class UserDetail extends Component {
  state = {data: null} // Initialize as null

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {id} = this.props.params // Use the params prop passed from the HOC
    const apiUrl = `https://jsonplaceholder.typicode.com/users/${id}`
    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`)
      }
      const fetchedData = await response.json()
      console.log('Fetched Data:', fetchedData) // Log the fetched object
      this.setState({data: fetchedData}) // Set the fetched object in state
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  render() {
    const {data} = this.state

    if (!data) {
      return <p>Loading...</p> // Show loading until data is fetched
    }

    return (
      <div className="co">
        <h1>User Details</h1>
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>City:</strong> {data.address?.city}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
        <p>
          <strong>Website:</strong> {data.website}
        </p>
        <p>
          <strong>Company:</strong> {data.company?.name}
        </p>
        <Link to="/">
          <button type="button" className="butn">
            Back
          </button>
        </Link>
      </div>
    )
  }
}

// Wrap the class component with a functional component to inject `params`
const UserDetailWithParams = () => {
  const params = useParams() // Extract params from the route
  return <UserDetail params={params} />
}

export default UserDetailWithParams
