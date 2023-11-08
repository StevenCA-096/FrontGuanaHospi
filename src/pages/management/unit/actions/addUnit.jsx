import {React,useRef,useState} from 'react'
import { Modal, Form, Button,Col, Row,Alert } from 'react-bootstrap'
import { QueryClient,useQuery,useMutation} from 'react-query';
import Select from 'react-select';
import { getDoctors } from '../../../../services/doctorService';
import { createUnit } from '../../../../services/unitService';
import Swal from 'sweetalert2';
const addUnit = () => {
    const queryClient = new QueryClient();
    const {data,isLoading,isError} = useQuery('doctor',getDoctors)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isValid,setIsValid] = useState()

    const code = useRef()
    const name= useRef()
    const floorNumber= useRef()
    const [idDoctor,setIdDoctor] = useState()
    
    let optionsSelect = []
    if (data) {
        optionsSelect = data.map((doctor) => ({
            value: doctor.iD_Doctor,
            label: doctor.nombreD + " "+doctor.apellido1
        }));
    }

    const createUnitMutation = useMutation("unidad", createUnit,
        {
            onSettled: () => queryClient.invalidateQueries("unidad"),
            mutationKey: "unidad",
            onSuccess: () => {
                Swal.fire(
                    'Registro agregado!',
                    'El registro fue creado!',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })

    const saveUnit = ()=>{
        let newUnit = {
            codigo: code.current.value,
            nombre: name.current.value,
            planta: floorNumber.current.value,
            iD_Doctor: idDoctor
        }
        createUnitMutation.mutateAsync(newUnit);
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
            <Button variant="primary" onClick={handleShow}>
                Agregar unidad
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar unidad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Codigo</Form.Label>
                                <Form.Control type="number" placeholder="Ingrese codigo" ref={code}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese el nombre" ref={name}/>
                            </Form.Group>
                        </Row>
                        

                        <Form.Group className="mb-3" controlId="formGridAddress1" ref={floorNumber}>
                            <Form.Label>Planta</Form.Label>
                            <Select
                                placeholder='Seleccione la planta'
                                options={optionsFloor}
                            >
                            </Select>
                        </Form.Group>

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
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={saveUnit}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default addUnit