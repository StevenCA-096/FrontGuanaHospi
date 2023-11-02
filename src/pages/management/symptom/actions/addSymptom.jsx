import {React,useState,useRef} from 'react'
import { Form, Button, Accordion, Alert } from 'react-bootstrap'
import { QueryClient,useMutation } from 'react-query';
import { createSymptom } from '../../../../services/symptomService';
import Swal from 'sweetalert2';
const addSymptom = () => {
    const queryClient = new QueryClient();
    const [isValid,setIsValid] = useState(true);
    const symptomName = useRef();

    const createillnessMutation = useMutation("sintoma", createSymptom,
        {
            onSettled: () => queryClient.invalidateQueries("sintoma"),
            mutationKey: "sintoma",
            onSuccess: () => {
                Swal.fire(
                    'Registro agrego!',
                    'El registro del sintoma fue creado',
                    'success'
                )
                setTimeout(() => {

                    window.location.reload()
                }, 2000);
            }
        })
    
        const saveSymptom = async () => {
            if (symptomName.current.value != "") {
                if (/\d/.test(symptomName.current.value)) {
                    setIsValid(false)
                } else {
                    let newSymptom = { nombre: symptomName.current.value }
                    createillnessMutation.mutateAsync(newSymptom)
                    setIsValid(true)
                }
    
            }
        }
  return (
    <>
            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Agregar registro de sintoma</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Indique el nombre del sintoma" defaultValue={""} ref={symptomName} />
                                {
                                    isValid == false? (
                                        <Alert variant={'danger'}>
                                            El nombre del sintoma no puede contener numeros
                                        </Alert>
                                    ) : ("")
                                }
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Button onClick={saveSymptom}>Guardar</Button>
                            </Form.Group>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
  )
}

export default addSymptom