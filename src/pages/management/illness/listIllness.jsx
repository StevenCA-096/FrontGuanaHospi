import React from 'react'
import {Table,Row,Col,Container,Button} from 'react-bootstrap'
import './listIlness.css'
import { useQuery } from 'react-query'
import { getillness } from '../../../services/illnessService'
const listIllness = () => {

  const {data,isloading,iserror} = useQuery('illness',getillness)

  if(data){console.log(data)}
  
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center">List of Illnesses</h1>
        </Row>

        <Row>
          <Button variant='primary'>Agregar registro de enfermedad</Button>
        </Row>
        <Row>
          <Table striped  variant='light'>
            <thead>
              <th>ID</th>
              <th>NOMBRE</th>            
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1</td>  
              </tr>
              <tr>
                <td>1</td>
                <td>1</td>  
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  )
}

export default listIllness