import { React, useRef, useState } from 'react'
import { useMutation, QueryClient, useQuery } from 'react-query';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment-timezone';
const addIntervention = () => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const currentDateTime = moment().tz('GMT-6').format('YYYY-MM-DDTHH:mm');;

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar intervencion
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar intervencion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Fecha de intervencion</Form.Label> {" "}
                                <input type="datetime-local" defaultValue={currentDateTime} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group a s={Col} controlId="formGridPassword">
                                <Form.Label>Prescripcion</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la preescripcion" />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Tipo de intervencion</Form.Label>
                                    <Select
                                        placeholder='Seleccione'

                                    ></Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Enfermedad</Form.Label>
                                    <Select
                                        placeholder='Seleccione'

                                    ></Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Paciente atendido</Form.Label>
                                    <Select
                                        placeholder='Seleccione'

                                    ></Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Doctor a cargo</Form.Label>
                                    <Select
                                        placeholder='Seleccione'

                                    ></Select>
                                </Form.Group>
                            </Col>

                        </Row>

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

export default addIntervention