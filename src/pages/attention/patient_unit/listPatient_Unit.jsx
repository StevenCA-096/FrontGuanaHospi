import React from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useQuery } from 'react-query'
import { getPatient_Units } from '../../../services/paciente_unidadService'
import { deletePatient_Units } from '../../../services/paciente_unidadService'
import AddPatientUnit from './actions/addPatientUnit'
import UpdatePatientUnit from './actions/updatePatientUnit'
import moment from 'moment-timezone'
const listPatient_Unit = () => {

    const {data,isLoading,isError} = useQuery('Paciente_Unidad',getPatient_Units);
    if (data) {
        console.log(data)
    }

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
                deletePatient_Units(id).then(
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
                    <h1 className="text-center">Lista de ingresados</h1>
                </Row>

                <Row>
                <AddPatientUnit/>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Table striped variant='light' size='lg'>
                            <thead>
                                <tr>
                                    <th>ID_PAC_UNIDAD</th>
                                    <th>ID_PACIENTE</th>
                                    <th>NOMBRE PACIENTE</th>
                                    <th>ID UNIDAD</th>
                                    <th>NOMBRE UNIDAD</th>
                                    <th>FECHA INGRESO</th>
                                    <th>FECHA SALIDA    </th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?(
                                        data.map((pa_unit) => 
                                            <tr key={pa_unit.id_paciente_unidad}>
                                                <td>{pa_unit.id_paciente_unidad}</td>
                                                <td>{pa_unit.id_paciente}</td>
                                                <td>{pa_unit.nombre_Paciente}</td>
                                                <td>{pa_unit.id_unidad}</td>
                                                <td>{pa_unit.nombre_Unidad}</td>
                                                <td>{moment(pa_unit.fecha_ingreso).format('LLL')}</td>
                                                <td>{moment(pa_unit.fecha_salida).format('LLL')}</td>
                                                <td>
                                                    <UpdatePatientUnit props={pa_unit}/>
                                                    <Button onClick={()=>showDeleteWaring(pa_unit.id_paciente_unidad)} variant='danger' size='sm'  >Eliminar</Button>
                                                </td>
                                            </tr>
                                        )
                                    ):(null)
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
  )
}

export default listPatient_Unit