import React from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import styles from './login.css'
const login = () => {
    return (
        <>
            <Container className='loginContainer'>
                <h1 className="text-center">Inciar sesion</h1>
                <Row >
                    <Col className='imgLoginContainer'>
                        <img className='loginImg' src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hospital-de-Bellvitge.jpg/640px-Hospital-de-Bellvitge.jpg" alt="logo" />
                    </Col>
                    <Col className='formContainer'>
                        <Row>
                        <Form.Group as={Row} className="logindata">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre del doctor" />
                        </Form.Group>
                        <Form.Group as={Row} className="logindata">
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese el nombre del doctor" />
                        </Form.Group>
                        
                        <Form.Group as={Row} className="btnLogin">
                            <Button>Inciar sesion</Button>
                        </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default login