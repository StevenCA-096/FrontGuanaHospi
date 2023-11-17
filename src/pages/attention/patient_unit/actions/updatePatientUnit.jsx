import { React, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import { useMutation, QueryClient, useQuery } from 'react-query';
import moment from 'moment-timezone';
import { getUnits } from '../../../../services/unitService';
import Select from 'react-select';
import { getPatients } from '../../../../services/patientService';
import { updatePatient_Units } from '../../../../services/paciente_unidadService';
const updatePatientUnit = (props) => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [PatientUnitProps, setPatientUnitProps] = useState();

    const open = () => { setPatientUnitProps(props.props); handleShow() }

    const { data: patients, isLoading: doctorsLoading, isError: doctorsError } = useQuery('paciente', getPatients);
    const { data: units, isLoading: unitsLoading, isError: unitsError } = useQuery('unidad', getUnits);

    let patientOptions = []
    if (patients) {
        patientOptions = patients.map((patient) => ({
            value: patient.iD_Paciente,
            label: patient.nombre + " " + patient.apellido1
        }));
    }

    let optionsUnit = []
    if (units) {
        optionsUnit = units.map((unit) => ({
            value: unit.iD_Unidad,
            label: unit.nombreU
        }));

    }

    let now = moment().format('YYYY-MM-DDTHH:mm');;

    const entryDate = useRef();
    const exitDate = useRef();
    const [patientId, setPatientId] = useState(null);
    const [unitId, setUnitId] = useState(null);

    const editPatienUnitMutation = useMutation("PacienteUnidad", updatePatient_Units,
        {
            onSettled: () => queryClient.invalidateQueries("PacienteUnidad"),
            mutationKey: "PacienteUnidad",
            onSuccess: () => {
                Swal.fire(
                    'Registro agregado!',
                    'El registro del ingreso fue creado',
                    'success'
                )
                setTimeout(() => {
                    window.location.reload()
                }, 2000);
            }
        })

    const save = async () => {
        let newPacUnit = {
            id_Paciente_Unidad: PatientUnitProps.id_paciente_unidad,
            id_Paciente: patientId?(patientId):(PatientUnitProps.id_paciente),
            id_Unidad: unitId?(unitId):(PatientUnitProps.id_unidad),
            fecha_ingreso: entryDate.current.value,
            fecha_salida: exitDate.current.value
        }
        await editPatienUnitMutation.mutateAsync(newPacUnit)
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
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        PatientUnitProps ? (
                            <Form>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Fecha de entrada</Form.Label> {" "}
                                        <input type="datetime-local" defaultValue={PatientUnitProps.fecha_ingreso} ref={entryDate}/>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Fecha de salida</Form.Label> {" "}
                                        <input type="datetime-local" min={now} defaultValue={now} ref={exitDate} />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Paciente atendido</Form.Label>
                                            <Select
                                                placeholder='Seleccione'
                                                options={patientOptions}
                                                onChange={(selected) => setPatientId(selected.value)}
                                                defaultValue={patientOptions.filter((option)=>option.value == PatientUnitProps.id_paciente)}
                                            ></Select>
                                        </Form.Group>
                                    </Col>


                                    <Col>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Doctor a cargo</Form.Label>
                                            <Select
                                                placeholder='Seleccione'
                                                options={optionsUnit}
                                                onChange={(selected) => setUnitId(selected.value)}
                                                defaultValue={optionsUnit.filter((option)=>option.value == PatientUnitProps.id_unidad)}
                                            ></Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                            </Form>
                        ) : ("Espere...")
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

export default updatePatientUnit