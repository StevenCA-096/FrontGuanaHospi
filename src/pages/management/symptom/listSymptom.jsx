import React from 'react'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import AddSymptom from './actions/addSymptom'
import { getSymptom,deleteSymptom } from '../../../services/symptomService'
import { useQuery } from 'react-query'
import Swal from 'sweetalert2'
const listSymptom = () => {
  const {data,isLoading,isError} = useQuery('sintoma',getSymptom);

  if (data) {
    console.log(data)
  }

  const deleteSymptomProcess = async(id) => {
    await deleteSymptom(id);
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

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
        deleteSymptomProcess(id).then(
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
        <AddSymptom/>
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
                data !=null?(
                  data.map((symptom) => 
                    <tr key={symptom.iD_Sintoma}>
                      <td>{symptom.iD_Sintoma}</td>
                      <td>{symptom.nombre}</td>
                      <td><Button size='smv' variant='danger' onClick={() => showDeleteWaring(symptom.iD_Sintoma)}>Eliminar</Button></td>
                    </tr>
                  )
                ):(console.log("wait"))
              }
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default listSymptom