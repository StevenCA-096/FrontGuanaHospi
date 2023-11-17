// import {React, useState, useEffect, useRef} from 'react'
// import { useQuery } from 'react-query';
// import { NavLink, Navigate, useNavigate, useParams  } from 'react-router-dom';
// import { format } from 'date-fns';
// import { Table, Container, Col, Row, Button } from 'react-bootstrap';
// import Select from 'react-select';

// const reports = () => {

//     const ReportOptions = [

//         { value: 'TopUnidadesPorPacientes', label: 'Top Unidades con más pacientes' },
//         { value: 'TopEnfermedadesPorIntervenciones', label: 'Top Enfermedades más atendidas' },
//         { value: 'TopIntervencionesPorDoctor', label: 'Top Doctores con más intervenciones' },
//         { value: 'TopIntervencionesPorTipo', label: 'Top Tipos de Intervenciones más realizadas' },
//         { value: 'TopIntervencionesPorPaciente', label: 'Top Pacientes con más intervenciones' },
//         { value: 'TopSintomasPorEnfermedad', label: 'Top síntomas más comunes por enfermedad' },
//         { value: 'TopSintomasAtendidos', label: 'Top Sintomas más atendidos' },
    
//       ];


//     return (

//         <Container>

//         <h2 className="text-center"> Reportes </h2>

//         <Col xs={8} md={2} lg={12}>

//         <span>Seleccione el producto</span>
//         <Select onChange={(selected) => setSelectedProduct(selected)} options={ProductOptions} />

//         <span>Seleccione la temporalidad</span>
//         <Select onChange={(selected) => setSelectedTemp(selected)} options={TempOptions} />

//         <Button onClick={() => generateReport()}>Generar</Button>


//     )

// }

// export default reports;