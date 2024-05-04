import { Container, Navbar } from 'react-bootstrap'
import logo from '../assets/logo_white_cropped.png'
import { useNavigate } from 'react-router-dom'

const MyNavbar = () => {
  const navigate = useNavigate()
  return (
    <Navbar bg="primary-subtle" data-bs-theme="dark">
      <Container className="">
        <Navbar.Brand onClick={() => navigate('/')}>
          <img alt="logo" src={logo} className="d-inline-block align-top" style={{ width: '200px' }} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
export default MyNavbar
