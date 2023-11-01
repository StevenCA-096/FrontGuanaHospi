import React from 'react'
import { useQuery } from 'react-query'
import { getDoctors } from '../../../services/doctorService'

const ListDoctor = () => {
  const {doctors,doctorsLoading,doctorsError} = useQuery('doctor',getDoctors)

  if(doctors){
    console.log(doctors)
  }
  
  return (
    <>
    <div>list doctor</div>
     
    </>
  )
}

export default ListDoctor