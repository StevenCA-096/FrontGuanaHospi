import React from 'react'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import { deleteUnits,getUnits } from '../../../services/unitService'
import AddUnit from './actions/addUnit'
import { useQuery } from 'react-query'
import UpdateUnit from './actions/updateUnit'
const listUnits = () => {
  const {data,isLoading,isError} = useQuery('unidades',getUnits)
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
  
  const deleteUnitProcess = async(id) =>{
    await deleteUnits(id)
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
        deleteUnits(id).then(
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
          <h1 className="text-center">Lista de unidades</h1>
        </Row>

        <Row>
        <AddUnit/>
        </Row>
        <Row>
          <Table striped  variant='light'>
            <thead>
              <tr>
              <th>ID</th>
              <th>CODIGO</th>
              <th>NOMBRE</th>
              <th>PLANTA </th>
              <th>ACCIONES</th>    
              </tr>        
            </thead>
            <tbody>
              {
                data?(
                  data.map((unit) => 
                    <tr key={unit.iD_Unidad}>
                      <td>{unit.iD_Unidad}</td>
                      <td>{unit.codigo}</td>
                      <td>{unit.nombre}</td>
                      <td>{unit.planta}</td>
                      <td>
                      <UpdateUnit props={unit}/>
                        <Button onClick={()=>showDeleteWaring(unit.iD_Unidad)} size='sm' variant='danger'>Eliminar</Button></td>
                    </tr>
                    
                  )  
                ):(<tr></tr>)
              }   
                        
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default listUnits