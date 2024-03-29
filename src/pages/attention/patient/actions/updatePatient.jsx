import React, { useRef, useState } from 'react'
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useMutation, QueryClient, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { updatePatientSe } from '../../../../services/patientService';
const updatePatient = (props) => {


    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [patientProps, setPatientProps] = useState();

    const open = () => {
        handleShow()
        setPatientProps(props.props)
    }

    const [isValid, setIsValid] = useState(true);


    let optionsSelect = []
    for (let i = 1; i < 110; i++) {
        optionsSelect.push({ value: i + 1, label: (i + 1) })
    }

    const [age, setAge] = useState(null);
    const secureNumber = useRef();
    const name = useRef();
    const lastname1 = useRef();
    const lastname2 = useRef();

    const updatePatientMutation = useMutation("paciente", updatePatientSe,
        {
            onSettled: () => queryClient.invalidateQueries("paciente"),
            mutationKey: "paciente",
            onSuccess: () => {
                Swal.fire(
                    'Registro actualizado!',
                    'El registro del paciente fue actualizado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            },onError:() => {
                Swal.fire(
                    'No permitido!',
                    'NO CUENTA CON PERMISOS PARA REALIZAR ESTA ACCION',
                    'danger'
                )           
            }
        })
console.log(props)
    const save = () => {
        let editPatient = {
            idPaciente: patientProps.iD_Paciente,
            numSeguro: secureNumber.current.value,
            nombre: name.current.value,
            apellido1: lastname1.current.value,
            apellido2: lastname2.current.value,
            edad: age?(age):(patientProps.edad)
        }
        console.log(patientProps)
        updatePatientMutation.mutateAsync(editPatient)
    }

    if (patientProps) {
        console.log(patientProps)
    }

    return (
        <>
            <Button variant="primary"  onClick={open} size='sm'>
                Editar
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar ingreso del paciente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        patientProps ? (
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Numero de seguro</Form.Label>
                                        <Form.Control type="number" placeholder="Ingrese el seguro del paciente" ref={secureNumber} defaultValue={patientProps.numSeguro}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el nombre" ref={name} defaultValue={patientProps.nombre}/>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Primer apeliido</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el primer apellido" ref={lastname1} defaultValue={patientProps.apellido1}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Segundo apellido</Form.Label>
                                        <Form.Control type="text" placeholder="Ingrese el segundo apellido" ref={lastname2} defaultValue={patientProps.apellido2}/>
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Edad</Form.Label>
                                    <Select
                                        placeholder='Seleccione la edad'
                                        options={optionsSelect}
                                        onChange={(selected) => setAge(selected.value)}
                                        defaultValue={optionsSelect.filter((option) =>option.label == patientProps.edad)}
                                    ></Select>
                                </Form.Group>

                                {
                                    isValid == false ? (
                                        <Alert variant={'danger'}>
                                            Los nombres y apellidos no pueden contener numeros!
                                        </Alert>
                                    ) : ("")
                                }

                                {/* {currentDate} */}
                            </Form>
                        ) : ("")
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={save}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default updatePatient