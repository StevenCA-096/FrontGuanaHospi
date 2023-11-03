import React from 'react'
import { useQuery } from 'react-query'
import { getDoctors,deleteDoctor } from '../../../services/doctorService'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import AddDoctor from './actions/addDoctor'
import UpdateDoctorModal from './actions/updateDoctor'
import Swal from 'sweetalert2'
const ListDoctor = () => {
  // const {doctors,doctorsLoading,doctorsError} = useQuery('doctor',getDoctors)

  // if(doctors){
  //   console.log(doctors)
  // }
  
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  const deleteDoctorProcess = async(id) =>{
    await deleteDoctor(id)
  }

  const showDeleteWaring = async(id) => {
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
        deleteDoctor(id).then(
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el registro del dector',
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
          <h1 className="text-center">Lista de enfermedades</h1>
        </Row>

        <Row>
          <AddDoctor/>
          <UpdateDoctorModal/>
        </Row>
        <Row>
          <Table striped  variant='light'>
            <thead>
              <tr>
              <th>ID</th>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>PRIMER APELLIDO </th>
              <th>SEGUNDO APELLIDO</th>
              <th>ESPECIALIDAD</th>
              <th>ACCIONES</th>    
              </tr>        
            </thead>
            <tbody>
              <Button onClick={showDeleteWaring}>Eliminar</Button>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default ListDoctor