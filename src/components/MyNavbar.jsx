import { Container, Navbar } from 'react-bootstrap'
import logo from '../assets/logo_white_cropped.png'

const MyNavbar = () => {
  return (
    <Navbar className="bg-body-tertiary mb-3">
      <Container className="bg-dark">
        <Navbar.Brand href="#">
          <img alt="logo" src={logo} className="d-inline-block align-top" style={{ width: '200px' }} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
export default MyNavbar
