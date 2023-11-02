import { React, useRef, useState } from 'react'
import { Button, Modal, Form, Table } from 'react-bootstrap'
import Select from 'react-select';
import { getSymptom } from '../../../../services/symptomService';
import { useMutation, useQuery,QueryClient } from 'react-query';
import { updateillnessSer } from '../../../../services/illnessService';
import Swal from 'sweetalert2';
const updateIlness = (props) => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateillnessMutation = useMutation("enfermedad", updateillnessSer,
        {
            onSettled: () => queryClient.invalidateQueries("enfermedad"),
            mutationKey: "enfermedad",
            onSuccess: () => {
                Swal.fire(
                    'Registro modificado!',
                    'El registro de la enfermedad fue actualizado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })

    const newName = useRef();

    const [selectedSymptom, SetSelectedSymptom] = useState()

    const idIlnessProps = props.props[0];
    const IlnessNameProps = props.props[1];

    const { data: symptoms, isLoading: symptomsLoading, isError: symptomsError } = useQuery('sintoma', getSymptom);

    let optionsSelect = []
    if (symptoms) {
        optionsSelect = symptoms.map((symptom) => ({
            value: symptom.iD_Sintoma,
            label: symptom.nombre
        }));
    }

    const [symtompsIllness, setSymptomIlness] = useState([]);

    const addSymptomIllness = () => {
        let currentSymtoms = [...symtompsIllness, selectedSymptom];
        setSymptomIlness(currentSymtoms);
        console.log(selectedSymptom)
    }

    const removeSymptomIllness = (id) => {
        setSymptomIlness(symtompsIllness.filter((s) => s.value != id))
    }

    const [isValid,setIsValid] = useState()

    const saveChanges = () =>{
        if (newName.current.value != IlnessNameProps) {
            if (/\d/.test(newName.current.value)) {
                setIsValid(false)
            } else {
                let newIllness = { ID_Enfermedad: idIlnessProps,nombre: newName.current.value }
                updateillnessMutation.mutateAsync(newIllness).finally(setIsValid(true))
                
            }
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow} size='sm'>
                Sintomas
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar enfermedad</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Label>Nombre de la enfermedad:</Form.Label>
                        <Form.Control type="text" ref={newName} defaultValue={IlnessNameProps} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Lista de sintomas</Form.Label>
                        <Select
                            onChange={(selected) => SetSelectedSymptom(selected)}
                            options={optionsSelect}>
                        </Select><br />
                        <Button onClick={addSymptomIllness}>Agregar sintoma</Button>
                    </Form.Group>
                    <br />
                    <h4>Sintomas que se asociaran a {IlnessNameProps}</h4>
                    <Table striped variant='light'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOMBRE SINTOMA</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                symtompsIllness != null ? (
                                    symtompsIllness.map((symIll) =>
                                        <tr key={symIll.value}>
                                            <td>{symIll.value}</td>
                                            <td>{symIll.label}</td>
                                            <td>
                                                <Button
                                                    onClick={() => removeSymptomIllness(symIll.value)}
                                                    variant='danger'
                                                >
                                                    Remover
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                ) : (console.log(""))
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default updateIlness   