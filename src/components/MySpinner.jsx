import { Spinner } from 'react-bootstrap'

const MySpinner = () => (
  <div className="d-flex justify-content-center mt-5">
    <Spinner variant="primary-subtle" animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </div>
)
export default MySpinner
