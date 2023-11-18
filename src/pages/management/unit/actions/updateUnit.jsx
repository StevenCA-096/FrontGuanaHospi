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

    const open = () => { setUnit(props.props); handleShow(); }
    

    const { data, isLoading, isError } = useQuery('doctor', getDoctors)

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
            label: doctor.nombreD + " " + doctor.apellido1
        }));
    }

    const code = useRef()
    const name = useRef()
    const [floorNumber,setFloorNumber] = useState(null)
    const [idDoctor, setIdDoctor] = useState(null)

    const updateUnitMutation = useMutation("unidad", updateUnitS,
        {
            onSettled: () => queryClient.invalidateQueries("unidad"),
            mutationKey: "unidad",
            onSuccess: () => {
                Swal.fire(
                    'Registro actualizado!',
                    'El registro de la unidad fue editado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            },onError:() => {
                Swal.fire(
                    'No permitido!',
                    'NO CUENTA CON PERMISOS PARA REALIZAR ESTA ACCION',
                    'error'
                )           
            }
        })

    const saveChanges = () => {
        let editUnit = {
            iD_Unidad: unit.iD_Unidad,
            codigo: code.current.value,
            nombre: name.current.value,
            planta: floorNumber?(floorNumber):(unit.planta),
            iD_Dcotor: idDoctor?(idDoctor):(unit.doctor_id)
        }
        updateUnitMutation.mutateAsync(editUnit)
    }

    const optionsFloor = [
        {
            value: 1,
            label: 'Piso 1',
        },
        {
            value: 2,
            label: 'Piso 2',
        },
        {
            value: 3,
            label: 'Piso 3',
        },
    ]

    
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
                                    <Form.Label>Código</Form.Label>
                                    <Form.Control type="number" placeholder="Ingrese el código" ref={code} defaultValue={unit.codigoU} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        defaultValue={unit.nombreU}
                                        type="text" placeholder="Ingrese el nombre" ref={name} />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Planta</Form.Label>
                                    <Select
                                        placeholder='Seleccione la planta'
                                        options={optionsFloor}
                                        onChange={(selected)=>setFloorNumber(selected.value)}
                                        defaultValue={optionsFloor.filter((option)=> option.value == unit.planta)}
                                    >
                                    </Select>
                                </Form.Group>

                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Doctor a cargo</Form.Label>
                                <Select
                                    placeholder='Seleccione el doctor'
                                    options={optionsSelect}
                                    onChange={(selected) => setIdDoctor(selected.value)}
                                    defaultValue={optionsSelect.filter((option)=>option.value == unit.doctor_id)}
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