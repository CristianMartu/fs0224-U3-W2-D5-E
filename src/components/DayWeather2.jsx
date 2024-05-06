import { Button, Card, CardFooter, CardHeader, Col, Collapse, Image, Nav, Row, Tab, Tabs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const DayWeather2 = ({ data }) => {
  const [open, setOpen] = useState(false)

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', ' Thursday', 'Friday', 'Saturday']
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const getFullDate = (date) => {
    const day = new Date(date)
    const dayName = dayNames[day.getDay()]
    const dayMonth = day.getDate()
    const month = monthNames[day.getMonth()]
    const result = `${month} ${dayMonth} ${dayName}`

    return result
  }

  const changeDateToHour = (date) => {
    const day = new Date(date)
    const result = day.getHours()
    return result
  }

  const getDayName = (date) => {
    const day = new Date(date)
    return dayNames[day.getDay()]
  }

  // const tempToCelsius = (data) => parseInt(data - 273.15)
  const tempToCelsius = (data) => parseFloat((data - 273.15).toFixed(2))

  const currentDay = data.list[0]
  const currentTemp = parseFloat((currentDay.main.temp - 273.15).toFixed(2))
  const perTemp = parseFloat((currentDay.main.feels_like - 273.15).toFixed(2))
  const precip = parseInt(currentDay.pop * 100)
  const speed = parseFloat((currentDay.wind.speed * 3.6).toFixed(2))

  const temp = (day) => parseInt(day.main.temp - 273.15)

  const list = []
  for (let i = 1; i < data.list.length; i++) {
    const curr = new Date(data.list[i].dt_txt).getDate()
    const next = new Date(data.list[i - 1].dt_txt).getDate()
    if (curr !== next) {
      list.push(i)
    }
  }

  return (
    <Card className="my-5">
      <CardHeader>
        <h1 className="text-center">{data.city.name}</h1>
        <p className="text-center">{getFullDate(currentDay.dt_txt)}</p>
      </CardHeader>
      <Card.Header as="h5" className="d-flex justify-content-between">
        <div className="mx-3">
          <h5>OpenWheater</h5>
          <p>Now</p>
          <div>
            <h2 className="d-inline-block">{currentTemp}°</h2>
            <Image src={`https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`} />
          </div>
          <p>Perceived temperature {perTemp}°</p>
        </div>
        <div className="text-end mx-3 mt-auto">
          <h3>{currentDay.weather[0].description}</h3>
          <p>Precip: {precip}%</p>
          <p>Humidity: {currentDay.main.humidity}%</p>
          <p>
            Wind: {speed} <span className="fs-6">km/h</span>
          </p>
        </div>
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="profile" id="justify-tab-example" className="mb-3" justify>
          <Tab eventKey="home" title="Today">
            <div className="d-flex justify-content-between meteo">
              {data.list.slice(0, 8).map((day, index) => (
                <div className="text-center" key={index}>
                  <p>{changeDateToHour(day.dt_txt)}:00</p>
                  <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                  <h3>{temp(day)}°</h3>
                </div>
              ))}
            </div>
          </Tab>
          <Tab eventKey="longer-tab" title="Precipitation" disabled>
            Tab content for Loooonger Tab
          </Tab>
          <Tab eventKey="contact" title="Wind" disabled>
            Tab content for Contact
          </Tab>
          <Tab eventKey="profile" title="Humidity" disabled>
            Tab content for Profile
          </Tab>
        </Tabs>
      </Card.Body>
      <CardFooter className="text-center">
        <NavLink to="/" className="btn returnHome">
          <p className="returnHome m-0">NEW SEARCH</p>
        </NavLink>
      </CardFooter>

      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        variant="primary"
        className="mt-2"
      >
        Forecast up to 5 days
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Tab.Container defaultActiveKey="first">
            <Row className="mt-3 mb-4">
              <Col sm={1}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="1">{getDayName(data.list[list[0]].dt_txt)}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="2">{getDayName(data.list[list[1]].dt_txt)}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="3">{getDayName(data.list[list[2]].dt_txt)}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="4">{getDayName(data.list[list[3]].dt_txt)}</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="5">{getDayName(data.list[list[4]].dt_txt)}</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={11}>
                <Tab.Content>
                  <Tab.Pane eventKey="1">
                    <h2 className="mt-3 text-center">{getDayName(data.list[list[0]].dt_txt)}</h2>
                    <div className="d-flex justify-content-evenly meteo">
                      {data.list.slice(list[0], list[1]).map((day, index) => (
                        <div className="text-center" key={index}>
                          <p>{changeDateToHour(day.dt_txt)}:00</p>
                          <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                          <h3>{temp(day)}°</h3>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="2">
                    <h2 className="mt-3 text-center">{getDayName(data.list[list[1]].dt_txt)}</h2>
                    <div className="d-flex justify-content-evenly meteo">
                      {data.list.slice(list[1], list[2]).map((day, index) => (
                        <div className="text-center" key={index}>
                          <p>{changeDateToHour(day.dt_txt)}:00</p>
                          <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                          <h3>{temp(day)}°</h3>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="3">
                    <h2 className="mt-3 text-center">{getDayName(data.list[list[2]].dt_txt)}</h2>
                    <div className="d-flex justify-content-evenly meteo">
                      {data.list.slice(list[2], list[3]).map((day, index) => (
                        <div className="text-center" key={index}>
                          <p>{changeDateToHour(day.dt_txt)}:00</p>
                          <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                          <h3>{temp(day)}°</h3>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="4">
                    <h2 className="mt-3 text-center">{getDayName(data.list[list[3]].dt_txt)}</h2>
                    <div className="d-flex justify-content-evenly meteo">
                      {data.list.slice(list[3], list[4]).map((day, index) => (
                        <div className="text-center" key={index}>
                          <p>{changeDateToHour(day.dt_txt)}:00</p>
                          <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                          <h3>{temp(day)}°</h3>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="5">
                    <h2 className="mt-3 text-center">{getDayName(data.list[list[4]].dt_txt)}</h2>
                    <div className="d-flex justify-content-evenly meteo">
                      {data.list.slice(list[4]).map((day, index) => (
                        <div className="text-center" key={index}>
                          <p>{changeDateToHour(day.dt_txt)}:00</p>
                          <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                          <h3>{temp(day)}°</h3>
                        </div>
                      ))}
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </Collapse>
    </Card>
  )
}

export default DayWeather2
