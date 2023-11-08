import { React, useRef, useState } from 'react'
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useMutation, QueryClient, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import moment from 'moment-timezone';
const addPatient = () => {

    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isValid, setIsValid] = useState(true);

    let optionsSelect = []
    for (let i = 0; i < 110; i++) {
        optionsSelect.push({ value: i + 1, label: (i + 1) })
    }

    let currentDate =  moment().format('YYYY-MM-DD HH:mm:ss');

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar paciente
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Numero de seguro</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el seguro del paciente" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Primer apeliido</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese el primer apellido" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Segundo apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el segundo apellido" />
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Edad</Form.Label>
                            <Select
                                placeholder='Seleccione la edad'
                                options={optionsSelect}
                            ></Select>
                        </Form.Group>
                        
                        {
                            isValid == false ? (
                                <Alert variant={'danger'}>
                                    Los nombres y apellidos no pueden contener numeros!
                                </Alert>
                            ) : ("")
                        }

                            {currentDate}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default addPatient