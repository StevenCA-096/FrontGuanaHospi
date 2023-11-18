import React from 'react'
import { useQuery } from 'react-query'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import { getHistorial } from '../../services/HistorialService';

import Swal from 'sweetalert2'

const historial = () => {

const {data, isLoading, isError} = useQuery('Historial',getHistorial)
  
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center">Historial de acciones</h1>
        </Row>
        <Row>
          <Table striped  variant='light'>
            <thead>
              <tr>
              <th>ID ACCIÓN</th>
              <th>FECHA DE LA ACCIÓN</th>
              <th>ID USUARIO</th>
              <th>CORREO USUARIO </th>
              <th>DESCRIPCIÓN</th>
              <th>ID REGISTRO MODIFICADO</th>
              </tr>        
            </thead>
            <tbody>
              {
                data?(
                  data.map((accion) => 
                    <tr key={accion.id}>
                        <td>{accion.id}</td>
                        <td>{accion.fecha}</td>
                        <td>{accion.idUsuario}</td>
                        <td>{accion.correoUsuario}</td>
                        <td>{accion.accion}</td>
                        <td>{accion.idRegistroModificado}</td>
                    </tr>
                  )
                ):("Cargando...")
              }
              
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default historial