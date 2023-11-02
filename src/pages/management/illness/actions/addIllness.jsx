import React, { useRef, useState } from 'react'
import { Form, Button, Accordion, Alert } from 'react-bootstrap'
import { useMutation, QueryClient } from 'react-query';
import { createillness } from '../../../../services/illnessService';
import Swal from 'sweetalert2';
const addIllness = () => {
    const queryClient = new QueryClient();
    const illnessName = useRef();
    const [isValid,setIsValid] = useState(true);

    const createillnessMutation = useMutation("enfermedad", createillness,
        {
            onSettled: () => queryClient.invalidateQueries("enfermedad"),
            mutationKey: "enfermedad",
            onSuccess: () => {
                Swal.fire(
                    'Registro agrego!',
                    'El registro de la enfermedad fue creado',
                    'success'
                )
                setTimeout(() => {

                    window.location.reload()
                }, 2000);
            }
        })

    const saveIllness = async () => {
        if (illnessName.current.value != "") {
            if (/\d/.test(illnessName.current.value)) {
                setIsValid(false)
            } else {
                let newIllness = { nombre: illnessName.current.value }
                createillnessMutation.mutateAsync(newIllness)
                setIsValid(true)
            }

        }
    }
    return (
        <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Agregar registro de enfermedad</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Indique el nombre de la enfermedad" defaultValue={""} ref={illnessName} />
                                {
                                    isValid == false? (
                                        <Alert variant={'danger'}>
                                            El nombre de la enfermedad no puede contener numeros
                                        </Alert>
                                    ) : ("")
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Button onClick={saveIllness}>Guardar</Button>
                            </Form.Group>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}

export default addIllness