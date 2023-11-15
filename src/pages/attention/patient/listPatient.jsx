import { React, useRef, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import AddPatient from './actions/addPatient'
import { useQuery } from 'react-query'
import { getPatients } from '../../../services/patientService'
import { getIdUser } from '../../../services/getUserId'
import { deletePatiente } from '../../../services/patientService'
import UpdatePatient from './actions/updatePatient'
const listPatient = () => {
    const {data,isLoading,isError} = useQuery('paciente',getPatients)
    
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const showDeleteWaring = async (id) => {
        swalWithBootstrapButtons.fire({
            title: 'Seguro?',
            text: "La accion no se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deletePatiente(id).then(
                    swalWithBootstrapButtons.fire(
                        'Eliminado!',
                        'Se elimino el registro de la intervencion fue eliminado',
                        'success'
                    )
                ).finally(window.location.reload())

            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelado',
                    'No se elimino el registro',
                    'error'
                )
            }
        })
    }

  return (
    <>
            <Container>
                <Row>
                    <h1 className="text-center">Lista de pacientes</h1>
                </Row>

                <Row>
                <AddPatient/>
                </Row>
                <Row>
                    <Col>
                        <Table striped variant='light'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NUMERO DE SEGURO</th>
                                    <th>NOMBRE</th>
                                    <th>PRIMER APELLIDO</th>
                                    <th>SEGUNDO APELLIDO</th>
                                    <th>EDAD</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {
                                    data?(
                                        data.map((patient)=>
                                            <tr key={patient.iD_Paciente}>
                                                <td>{patient.iD_Paciente}</td>
                                                <td>{patient.numSeguro}</td>
                                                <td>{patient.nombre}</td>
                                                <td>{patient.apellido1}</td>
                                                <td>{patient.apellido2}</td>
                                                <td>{patient.edad}</td>
                                                <td>
                                                    <UpdatePatient props = {patient}/>
                                                    <Button size='sm' onClick={()=>showDeleteWaring(patient.iD_Paciente)} variant='danger'>Eliminar</Button></td>
                                            </tr>
                                        )
                                    ):(null)
                                }
                                {/* <Button onClick={showDeleteWaring}>Eliminar</Button> */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
  )
}

export default listPatient