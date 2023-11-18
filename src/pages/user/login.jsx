import React, { useRef } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import styles from './login.css'
import { trylogin,getLoginInfo } from '../../services/authentications'
import Swal from 'sweetalert2'

const login = () => {
    const email =  useRef()
    const password = useRef()

    const sendLoginInfo = async()=> {
        let credentials = {
            email: email.current.value,
            password:password.current.value
        }
        let token = await trylogin(credentials).then(data => data)
        if (token !== null){
            switch (token){
                case "User not found": Swal.fire('El usuario no existe','El correo ingresado no se encuentra registrado','warning');break;
                case "Wrong password":Swal.fire('La contrasena no coincide','La contrasena para el correo indicado no es correcta','error');break;
                default:
                    sessionStorage.setItem('bearer',token)
                    getLoginInfo(credentials).then((user)=>{
                        sessionStorage.setItem('user',JSON.stringify(user))
                        window.location='/'
                    })
            }
        }
    }

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
                            <Form.Control type="email" placeholder="Ingrese el correo" ref={email}/>
                        </Form.Group>
                        <Form.Group as={Row} className="logindata">
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control type="password" placeholder="Ingrese su clave" ref={password}/>
                        </Form.Group>
                        
                        <Form.Group as={Row} className="btnLogin">
                            <Button onClick={sendLoginInfo}>Inciar sesion</Button>
                        </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default login