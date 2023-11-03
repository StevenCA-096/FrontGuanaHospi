import { React, useRef, useState } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { deleteIntervention } from '../../../services/interventionService'
import Swal from 'sweetalert2'
import AddIntervention from './actions/addIntervention'
const listIntervention = () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const deleteInterventionProcess = (id) => {
        deleteIntervention(id)
    }

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
                deleteIntervention(id).then(
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
                    <h1 className="text-center">Lista de intervenciones</h1>
                </Row>

                <Row>
                    <AddIntervention/>
                </Row>
                <Row>
                    <Col>
                        <Table striped variant='light'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>FECHA DE INTERVENCION</th>
                                    <th>PREESCRIPCION</th>
                                    <th>ENFERMEDAD</th>
                                    <th>PACIENTE ATENDIDO</th>
                                    <th>DOCTOR ENCARGADO</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Button onClick={showDeleteWaring}>Eliminar</Button>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default listIntervention