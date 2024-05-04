import { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const URL = 'http://api.openweathermap.org/geo/1.0/direct?q='

const MySearchBar = ({ setCoordinates }) => {
  const [text, setText] = useState('')
  const [list, setList] = useState([])
  const [view, setView] = useState(false)

  const navigate = useNavigate()

  const handleSearch = async (url) => {
    try {
      const resp = await fetch(url)
      if (resp.ok) {
        const result = await resp.json()
        setList(result)
        setView(true)
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
    <div className="mt-5" style={{ height: 'calc(100vh - 159px)' }}>
      <Form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center ms-2">
        <Form.Control
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Search city..."
          className="w-75"
        />
        <Button type="submit" variant="dark" className="rounded-end">
          <i className="bi bi-search icons mx-0"></i>
        </Button>
      </Form>
      {view && (
        <ListGroup className="my-3 ">
          {list.length > 0 ? (
            list.map((city, i) => (
              <ListGroup.Item key={i} className="w-75 mx-auto" onClick={() => changePage(city)}>
                <Row className="align-items-center">
                  <Col className="fs-4">
                    City: <span className="fw-light">{city.name}</span>
                  </Col>
                  <Col className="fs-4">
                    Country: <span className="fw-light">{city.country}</span>
                  </Col>
                  <Col className="fs-4">
                    {city.state && (
                      <>
                        State: <span className="fw-light">{city.state}</span>
                      </>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="w-75 mx-auto">No result match</ListGroup.Item>
          )}
        </ListGroup>
      )}
    </div>
  )
}
export default MySearchBar
