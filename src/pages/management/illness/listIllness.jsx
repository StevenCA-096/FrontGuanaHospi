import React from 'react'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import './listIlness.css'
import { useQuery } from 'react-query'
import { getillness } from '../../../services/illnessService'
import AddIllness from './actions/addIllness'
import { deleteillness } from '../../../services/illnessService'
import Swal from 'sweetalert2'
import UpdateIlness from './actions/updateIlness'
const listIllness = () => {
  
  const {data,isloading,iserror} = useQuery('illness',getillness)

  if(data){console.log(data)}

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  const deleteillnessProcess = (id) =>{
    deleteillness(id)
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
        deleteillness(id).then(
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            'Se elimino el registro de la enfermedad',
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
          <AddIllness/>
        </Row>
        <Row>
          <Table striped  variant='light'>
            <thead>
              <tr>
              <th>ID</th>
              <th>NOMBRE ENFERMEDAD</th>
              <th>ACCIONES</th>    
              </tr>        
            </thead>
            <tbody>
              {
                data != null?(
                  data.map((illness) => 
                  <tr key={illness.id_Enfermedad}>
                    <td>{illness.id_Enfermedad}</td>
                    <td>{illness.nombre}</td>
                    <td>                      
                      <UpdateIlness props={[illness.id_Enfermedad,illness.nombre]}/>
                      <Button size='sm' variant='danger' onClick={() => showDeleteWaring(illness.id_Enfermedad)}>Eliminar</Button>
                    </td>
                  </tr>
                )
                ):(console.log(""))
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default listIllness