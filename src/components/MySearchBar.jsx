import { useEffect, useState } from 'react'
import { Button, Form, ListGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const URL = 'http://api.openweathermap.org/geo/1.0/direct?q='

const MySearchBar = ({ setCoordinates }) => {
  const [text, setText] = useState('')
  const [list, setList] = useState([])

  const navigate = useNavigate()

  const handleSearch = async (url) => {
    try {
      const resp = await fetch(url)
      if (resp.ok) {
        const result = await resp.json()
        setList(result)
      } else {
        if (resp.status === 400) {
          throw new Error('400 Bad Request')
        }
        if (resp.status === 401) {
          throw new Error('401 Unauthorized')
        }
        if (resp.status === 403) {
          throw new Error('403 Forbidden')
        }
        if (resp.status === 404) {
          throw new Error('404 Not Found')
        }
        throw new Error('Generic error')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setText(text)
    handleSearch(URL + text + '&limit=10&appid=f80e32b4dcf7ee37675797cecf9ff733')
    setText('')
  }

  const changePage = (city) => {
    const coordinates = `lat=${city.lat}&lon=${city.lon}`
    setCoordinates(coordinates)
    navigate('/weather')
  }

  return (
    <>
      {/* <Button onClick={() => navigate('/weather')}>Weather page</Button> */}
      <Form onSubmit={handleSubmit} className="d-flex justify-content-end align-items-center">
        <Form.Control type="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="Search city..." />
        <Button type="submit" variant="dark" className="rounded-end me-2">
          <i className="bi bi-search icons mx-0"></i>
        </Button>
      </Form>

      <ListGroup className="my-3">
        {list &&
          list.map((city, i) => (
            <ListGroup.Item key={i} className="text-start w-25" onClick={() => changePage(city)}>
              <p>city: {city.name}</p>
              <p>country: {city.country}</p>
              <p>state: {city.state}</p>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </>
  )
}
export default MySearchBar
