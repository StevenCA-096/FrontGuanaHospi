import { Outlet } from 'react-router-dom'
import Header from './Header';
import { Link } from 'react-router-dom';
//import '../../Styles/footer.css'
import { Row, Col, Container} from 'react-bootstrap';

import styles from './layout.css'
import './Styles/footer.css'

export const Layout = () => {
  return (
    <>

      <div className='layout-container'>
        <div className='navbar-side'>
          <Header />
        </div>
        <div className='main-content'>
          <main>
            <Outlet />
          </main>
        </div>

        <br />
        <div className='footer-down'>
          <footer >
            <Container>
              <Row className='generalInfoF'>
                <Col lg={3}>
                  <img src="https://cdn.icon-icons.com/icons2/52/PNG/256/signofhealth_medical_10742.png" alt="logo" className='LogoImgFooter' />
                </Col>
                <Col md={3} lg={3}>

                  <h3>Clinica GuanaHospi</h3>

                </Col>
              </Row>
              
              <Row>

              </Row>
            </Container>

          </footer>
        </div>
      </div>


    </>
  );
}

export default Layout