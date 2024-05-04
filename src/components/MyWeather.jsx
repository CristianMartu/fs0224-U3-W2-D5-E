import { useEffect, useState } from 'react'
import { Col, Image, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import DayWeather from './DayWeather'

// const URL = 'https://api.openweathermap.org/data/2.5/weather?'
const URL = 'https://api.openweathermap.org/data/2.5/forecast?'

const MyWeather = ({ coordinates }) => {
  const [data, setData] = useState([])
  console.log(coordinates)

  const handleSearch = async (url) => {
    try {
      const resp = await fetch(url)
      if (resp.ok) {
        const result = await resp.json()
        setData(result)
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

  useEffect(() => {
    if (coordinates) {
      handleSearch(URL + coordinates + '&appid=f80e32b4dcf7ee37675797cecf9ff733')
    }
  }, [coordinates])

  return data.city && <DayWeather data={data} />
}
export default MyWeather
