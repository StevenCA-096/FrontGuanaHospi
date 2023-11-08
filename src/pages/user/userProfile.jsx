import React from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import styles from './userProfile.css'
const userProfile = () => {
  let user = JSON.parse(sessionStorage.getItem('user'))

  const logout = () =>{
    sessionStorage.clear()
    window.location.href='/';
}   
  return (
    <>
      <Container className='cardProfileContainer'>
        <Row>
        <h1 className="text-center">Perfil de Usuario</h1>
        </Row>
        <Row >
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />
            <Card.Body>
              <Card.Title>Correo: {user.correo}</Card.Title>
              <Card.Text>
                Rol: {user.rol.nombreR}
              </Card.Text>
              <Button variant="warning" onClick={logout}>Cerrar sesion</Button>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  )
}

export default userProfile