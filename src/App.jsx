import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MySearchBar from './components/MySearchBar'
import { Container } from 'react-bootstrap'
import MyWeather from './components/MyWeather'
import MyNavbar from './components/MyNavbar'

const App = () => {
  const [coordinates, setCoordinates] = useState(null)

  return (
    <div className="App">
      <BrowserRouter>
        <MyNavbar />
        <Container>
          <Routes>
            <Route path="/" element={<MySearchBar setCoordinates={setCoordinates} />} />
            <Route path="/weather" element={<MyWeather coordinates={coordinates} />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
