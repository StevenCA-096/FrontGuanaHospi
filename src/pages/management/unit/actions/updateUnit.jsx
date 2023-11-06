import React, { useRef } from 'react'
import { useState } from 'react'
import { useMutation, QueryClient, useQuery } from 'react-query';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { getDoctors } from '../../../../services/doctorService';
import { updateUnitS } from '../../../../services/unitService';
import Select from 'react-select';
import Swal from 'sweetalert2';

const updateUnit = (props) => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isValid, SetIsValid] = useState();
    
    const [unit, setUnit] = useState();
    
    const open = ()=>{setUnit(props.props);handleShow();}
    console.log(props)
    
    const {data,isLoading,isError} = useQuery('doctor',getDoctors)

    const checkValidity = (textTest) => {

        if (/\d/.test(textTest)) {
            setIsValid(false)
        } else if (!/\d/.test(textTest)) {
            setIsValid(true)
        }
    }

    let optionsSelect = []
    if (data) {
        optionsSelect = data.map((doctor) => ({
            value: doctor.iD_Doctor,
            label: doctor.nombreD + " " +doctor.apellido1
        }));
    }

    const code = useRef()
    const name = useRef()
    const floorNumber = useRef()
    const [idDoctor, setIdDoctor] = useState()


    const updateUnitMutation = useMutation("unidad", updateUnitS,
        {
            onSettled: () => queryClient.invalidateQueries("unidad"),
            mutationKey: "unidad",
            onSuccess: () => {
                Swal.fire(
                    'Registro actualizado!',
                    'El registro de la planta fue editado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })

    const saveChanges = () => {
        let editUnit = {
            id: unit.iD_Unidad,
            codigo:code.current.value,
            nombre:name.current.value,
            planta:floorNumber.current.value,
            iD_Doctor : idDoctor
        }
        updateUnitMutation.mutateAsync(editUnit)
    }

    return (
        <>
            <Button variant="primary" onClick={open} size='sm'>
                Editar
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar</Modal.Title>
                </Modal.Header>
                {unit ? (
                    <Modal.Body>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Codigo</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el codigo" ref={code} defaultValue={unit.codigo} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={unit.nombre}
                                        type="text" placeholder="Ingrese el nombre" ref={name}/>
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Planta</Form.Label>
                                    <Form.Control
                                        defaultValue={unit.planta}
                                        type="number" placeholder="Ingrese el la planta" ref={floorNumber} onChange={() => checkValidity(floorNumber.current.value)} />
                                </Form.Group>

                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Doctor a cargo</Form.Label>
                                <Select
                                    placeholder='Seleccione el doctor'
                                    options={optionsSelect}
                                    onChange={(selected) => setIdDoctor(selected.value)}
                                   
                                ></Select>
                            </Form.Group>
                            
                            {
                                isValid == false ? (
                                    <Alert variant={'danger'}>
                                        Los nombres y apellidos no pueden contener numeros!
                                    </Alert>
                                ) : ("")
                            }


                        </Form>
                    </Modal.Body>
                ) : ("")}

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>Guardar cambions</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default updateUnit