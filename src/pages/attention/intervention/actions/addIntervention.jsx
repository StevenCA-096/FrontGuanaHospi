import { React, useRef, useState } from 'react'
import { useMutation, QueryClient, useQuery } from 'react-query';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment-timezone';
import Swal from 'sweetalert2';
import { createIntervention } from '../../../../services/interventionService';
import { getDoctors } from '../../../../services/doctorService';
import { getillness } from '../../../../services/illnessService';
import { getInterventionTypes } from '../../../../services/interventionTypeService';
import { getPatients } from '../../../../services/patientService';
const addIntervention = () => {
    const queryClient = new QueryClient();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { data: doctorsList, isLoading: doctorsLoading, isError: doctorsError } = useQuery('Doctor',getDoctors);
    const { data: illnessList, isLoading: ilnessLoading, isError: illnessError } = useQuery('Enfermedad',getillness);
    const { data: interventionsList, isLoading: interventionsLoading, isError: interventionsError } = useQuery('TipoIntervencion',getInterventionTypes);
    const { data: patientsList, isLoading: patientsLoading, isError: patientsError } = useQuery('paciente',getPatients);

    let patientOptions = []
    if (patientsList) {
        patientOptions = patientsList.map((patient) => ({
            value: patient.iD_Paciente,
            label: patient.nombre + " "+patient.apellido1
        }));
    }

    let interventionOptions = []
    if (interventionsList) {
        interventionOptions = interventionsList.map((intervention) => ({
            value: intervention.iD_TipoIntervencion,
            label: intervention.nombre
        }));
    }

    let optionsDoctor = []
    if (doctorsList) {
        optionsDoctor = doctorsList.map((doctor) => ({
            value: doctor.iD_Doctor,
            label: doctor.nombreD + " " + doctor.apellido1
        }));
    }

    let optionsIllness = []
    if (illnessList) {
        optionsIllness = illnessList.map((illess) => ({
            value: illess.id_Enfermedad,
            label: illess.nombre
        }));
        
    }



    const currentDateTime = moment().tz('GMT-6').format('YYYY-MM-DDTHH:mm');;

    const interventionDate = useRef()
    const prescription = useRef()

    const [typeIntervention, setTypeIntervention] = useState()
    const [illness, setIllness] = useState()
    const [patient, setPatient] = useState()
    const [doctor, setDoctor] = useState()

    const createInterventionMutation = useMutation("intervencion", createIntervention,
        {
            onSettled: () => queryClient.invalidateQueries("Intervencion"),
            mutationKey: "Intervencion",
            onSuccess: () => {
                Swal.fire(
                    'Registro agregado!',
                    'El registro de la intervencion fue creado',
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

        const save = async() =>{
            let newInterevention = {
                fecha_intervencion: interventionDate.current.value,
                prescripcion: prescription.current.value,
                iD_TipoIntervencion: typeIntervention,
                id_enfermedad:illness,
                id_paciente:patient,
                id_doctor:doctor
            }
            await createInterventionMutation.mutateAsync(newInterevention)
        }
    
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Agregar intervención
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
                                <input type="datetime-local" defaultValue={currentDateTime} ref={interventionDate}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group a s={Col} controlId="formGridPassword">
                                <Form.Label>Prescripcion</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la preescripcion" ref={prescription}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Tipo de intervencion</Form.Label>
                                    <Select
                                        placeholder='Seleccione'
                                        options={interventionOptions}
                                        onChange={(selected)=> setTypeIntervention(selected.value)}
                                    ></Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                {
                                    illnessList ? (
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Enfermedad</Form.Label>
                                            <Select
                                                placeholder='Seleccione'
                                                options={optionsIllness}
                                                onChange={(selected)=> setIllness(selected.value)}
                                            ></Select>
                                        </Form.Group>
                                    ) : ("")
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Paciente atendido</Form.Label>
                                    <Select
                                        placeholder='Seleccione'
                                        options={patientOptions}
                                        onChange={(selected)=> setPatient(selected.value)}
                                    ></Select>
                                </Form.Group>
                            </Col>

                            {
                                doctorsList ? (
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Doctor a cargo</Form.Label>
                                            <Select
                                                placeholder='Seleccione'
                                                options={optionsDoctor}
                                                onChange={(selected)=> setDoctor(selected.value)}
                                            ></Select>
                                        </Form.Group>
                                    </Col>
                                ) : ("")
                            }


                        </Row>

                    </Form>
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

export default addIntervention