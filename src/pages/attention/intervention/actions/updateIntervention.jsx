import React, { useState,useRef } from 'react'
import { useQuery,useMutation,QueryClient } from 'react-query';
import { Form, Button, Modal, Row, Col, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { getDoctors } from '../../../../services/doctorService';
import { getillness } from '../../../../services/illnessService';
import { getInterventionTypes } from '../../../../services/interventionTypeService';
import { getPatients } from '../../../../services/patientService';
import { updateInterventionSe } from '../../../../services/interventionService';
import { useEffect } from 'react';
const updateIntervention = (props) => {
    const queryClient = new QueryClient();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
    const [interventionProps,setInterventionProps] = useState(null);

    const open = ()=> {
        handleShow()
        setInterventionProps(props.props)
    }

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

    const interventionDate = useRef()
    const prescription = useRef()

    const [typeIntervention, setTypeIntervention] = useState(null)
    const [illness, setIllness] = useState(null)
    const [patient, setPatient] = useState(null)
    const [doctor, setDoctor] = useState(null)

    const updateInterventionMutation = useMutation("intervencion", updateInterventionSe,
        {
            onSettled: () => queryClient.invalidateQueries("Intervencion"),
            mutationKey: "Intervencion",
            onSuccess: () => {
                Swal.fire(
                    'Registro agregado!',
                    'El registro de la intervencion fue actualizado',
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

    const save = async() =>{
        
        let newInterevention = {
            iD_Intervencion:interventionProps.iD_Intervencion,
            fecha_intervencion: interventionDate.current.value,
            prescripcion: prescription.current.value,
            iD_TipoIntervencion: typeIntervention ?(typeIntervention):(interventionOptions.filter((option)=>option.label == interventionProps.nombreTi)[0].value),
            id_enfermedad:illness?(illness):(optionsIllness.filter((option)=>option.label == interventionProps.nombreE)[0].value),
            id_paciente:patient?(patient):(patientOptions.filter((option)=>option.label == interventionProps.nombreP)[0].value),
            id_doctor:doctor?(doctor):(optionsDoctor.filter((option)=>option.label == interventionProps.nombreD)[0].value)
        }
        
        await updateInterventionMutation.mutateAsync(newInterevention)
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
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        interventionProps?(
                            <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Fecha de intervencion</Form.Label> {" "}
                                <input type="datetime-local"  defaultValue={interventionProps.fecha_Intervencion} ref={interventionDate}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group a s={Col} controlId="formGridPassword">
                                <Form.Label>Prescripcion</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese la preescripcion" defaultValue={interventionProps.prescripcion} ref={prescription}/>
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
                                        defaultValue={
                                            interventionOptions.filter((option)=>option.label == interventionProps.nombreTi)
                                        }
                                        
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
                                                defaultValue={
                                                    optionsIllness.filter((option)=>option.label == interventionProps.nombreE)
                                                }
                                            
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
                                        defaultValue={
                                            patientOptions.filter((option)=>option.label == interventionProps.nombreP)
                                        }
                                        
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
                                                defaultValue={
                                                    optionsDoctor.filter((option)=>option.label == interventionProps.nombreD)
                                                }
                                                
                                            ></Select>
                                        </Form.Group>
                                    </Col>
                                ) : ("")
                            }


                        </Row>

                    </Form>
                        ):("")
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

export default updateIntervention