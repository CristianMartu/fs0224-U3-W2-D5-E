import { Button, Card, CardFooter, CardHeader, Col, Collapse, Image, Row } from 'react-bootstrap'
import logo from '../assets/logo_white_cropped.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const DayWeather = ({ data }) => {
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

  return (
    <Card className="my-5">
      <CardHeader>
        <h1 className="text-center">{data.city.name}</h1>
        <p className="text-center">{getFullDate(currentDay.dt_txt)}</p>
      </CardHeader>
      <Card.Header as="h5" className="d-flex justify-content-between">
        <div className="mx-3">
          {/* <div className="d-inline-block rounded p-2 bg-info" style={{ background: 'black' }}>
            <Image src={logo} style={{ width: '100px' }} />
          </div> */}
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
        <div className="d-flex justify-content-between meteo">
          {data.list.slice(0, 8).map((day, index) => (
            <div className="text-center" key={index}>
              <p>{changeDateToHour(day.dt_txt)}:00</p>
              <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
              <h3>{temp(day)}°</h3>
            </div>
          ))}
        </div>
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
          <Row className="text-center">
            {data.list.slice(8).map((day, index) => (
              <Col sm={6} id="example-collapse-text" key={index}>
                <p className="fs-5 mb-0">{getDayName(day.dt_txt)}</p>
                <p className="fs-5 mb-0"> {changeDateToHour(day.dt_txt)}:00</p>
                <Image src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />
                <p className="fs-5 mb-5">{tempToCelsius(day.main.temp)}°</p>
              </Col>
            ))}
          </Row>
        </div>
      </Collapse>
    </Card>
  )
}

export default DayWeather
