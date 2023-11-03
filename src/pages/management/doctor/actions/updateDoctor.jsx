import { React, useRef, useState } from 'react'
import {Form, Button, Modal,Row,Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useQuery } from 'react-query';
import { getSpecialities } from '../../../../services/specialityService';
import { updateDoctorS } from '../../../../services/doctorService';
import { useMutation,QueryClient } from 'react-query';
const updateDoctorModal = (props) => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [idSpeciality, setIdSpeciality] = useState();
    const code = useRef();
    const name = useRef();
    const lastname1 = useRef();
    const lastname2 = useRef();

    const {data,isLoading,isError} = useQuery('especialidad',getSpecialities)
    if (data) {
        console.log(data)
    }

    let optionsSelect = []
    if (data) {
        optionsSelect = data.map((speciality) => ({
            value: speciality.iD_Especialidad,
            label: speciality.nombreE
        }));
    }

    const updateDoctorMutation = useMutation("doctor", updateDoctorS,
        {
            onSettled: () => queryClient.invalidateQueries("doctor"),
            mutationKey: "doctor",
            onSuccess: () => {
                Swal.fire(
                    'Registro actualizar!',
                    'El registro del doctor fue editado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })


    const [isValid,setIsValid] = useState(true);

    const open = () =>{setIsValid(true);handleShow()}

    const checkValidity = (textTest) => {
        
        if (/\d/.test(textTest)) {
            setIsValid(false)
        }else if (!/\d/.test(textTest)) {
            setIsValid(true)
        }
    }

    const saveChanges = () =>{
        
        if (isValid) {
            let editDoctor = {
                codigo: code.current.value,
                nombreD: name.current.value,
                Apellido1: lastname1.current.value,
                Apellido2: lastname2.current.value,
                iD_Especialidad: idSpeciality
            }
            console.log(editDoctor)
        }else{
            console.log("")
        }
      
    }
    return (
        <>
            <Button variant="primary" onClick={open}>
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
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese el nombre del doctor" ref={code}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre" ref={name} onChange={() => checkValidity(name.current.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Primer apeliido</Form.Label>
                                <Form.Control type="email" placeholder="Ingrese el primer apellido" ref={lastname1} onChange={() => checkValidity(lastname1.current.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Segundo apellido</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el segundo apellido" ref={lastname2} onChange={() => checkValidity(lastname2.current.value)}/>
                            </Form.Group>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label>Especialidad</Form.Label>
                            <Select 
                            placeholder='Seleccione la especialidad' 
                            options={optionsSelect}
                            onChange={(selected) => setIdSpeciality(selected.value)}
                            ></Select>
                        </Form.Group>
                        {
                                    isValid == false? (
                                        <Alert variant={'danger'}>
                                            Los nombres y apellidos no pueden contener numeros!
                                        </Alert>
                                    ) : ("")
                                }                      

                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges} disabled={!isValid}>Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default updateDoctorModal