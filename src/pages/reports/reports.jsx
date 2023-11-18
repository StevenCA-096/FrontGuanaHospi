import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Table, Container, Col, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import { getReportByName } from '../../services/reportService';
import {DownloadTableExcel} from 'react-export-table-to-excel';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState(null);

  const reportOptions = [
    { value: 'TopUnidadesPorPacientes', label: 'Top Unidades con más pacientes' },
    { value: 'TopEnfermedadesPorIntervenciones', label: 'Top Enfermedades más atendidas' },
    { value: 'TopIntervencionesPorDoctor', label: 'Top Doctores con más intervenciones' },
    { value: 'TopIntervencionesPorTipo', label: 'Top Tipos de Intervenciones más realizadas' },
    { value: 'TopIntervencionesPorPaciente', label: 'Top Pacientes con más intervenciones' },
    { value: 'TopSintomasPorEnfermedad', label: 'Top síntomas más comunes por enfermedad' },
    { value: 'TopSintomasAtendidos', label: 'Top Sintomas más atendidos' },
  ];

  const ReportTable = useRef(null);

  async function generateReport() {
    try {
      console.log(selectedReport)
      const reportData = await getReportByName(selectedReport.value);
      setReportData(reportData);
    } catch (error) {
      console.error("Error xd:", error);
    }
  }

  const tableStyle = {
    width: '80%', 
    margin: 'auto',
    borderCollapse: 'collapse',
    marginTop: '20px', 
  };
  
  const thTdStyle = {
    border: '2px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
  };

  const renderReportTable = () => {
    if (selectedReport) {
      switch (selectedReport.value) {

        case 'TopUnidadesPorPacientes':
          return (
            <table style={tableStyle} className='reportTable' ref={ReportTable}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Unidad</th>
                  <th style={thTdStyle}>Código</th>
                  <th style={thTdStyle}>Planta</th>
                  <th style={thTdStyle}>Cantidad de pacientes asignados</th>
                  <th style={thTdStyle}>Doctor asignado</th>
                  <th style={thTdStyle}>Especialidad</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td style={thTdStyle}>{item.unidad}</td>
                    <td style={thTdStyle}>{item.código}</td>
                    <td style={thTdStyle}>{item.planta}</td>
                    <td style={thTdStyle}>{item.pacientes}</td>
                    <td style={thTdStyle}>{item.doctor}</td>
                    <td style={thTdStyle}>{item.especialidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

        case 'TopEnfermedadesPorIntervenciones':
          return (
            <table style={tableStyle} className='reportTable' ref={ReportTable}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Enfermedad</th>
                  <th style={thTdStyle}>Cantidad de intervenciones</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td style={thTdStyle}>{item.enfermedad}</td>
                    <td style={thTdStyle}>{item.intervenciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

          case 'TopIntervencionesPorDoctor':
          return (
            <table style={tableStyle} className='reportTable' ref={ReportTable}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Doctor</th>
                  <th style={thTdStyle}>Código</th>
                  <th style={thTdStyle}>Especialidad</th>
                  <th style={thTdStyle}>Cantidad de intervenciones realizadas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td style={thTdStyle}>{item.doctor}</td>
                    <td style={thTdStyle}>{item.código}</td>
                    <td style={thTdStyle}>{item.especialidad}</td>
                    <td style={thTdStyle}>{item.intervenciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

          case 'TopIntervencionesPorTipo':
          return (
            <table style={tableStyle} className='reportTable' ref={ReportTable}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Tipo de intervención</th>
                  <th style={thTdStyle}>Cantidad de intervenciones realizadas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td style={thTdStyle}>{item.intervención}</td>
                    <td style={thTdStyle}>{item.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

          case 'TopIntervencionesPorPaciente':
          return (
            <table style={tableStyle} className='reportTable' ref={ReportTable}>
              <thead>
                <tr>
                  <th style={thTdStyle}>Número de seguro social</th>
                  <th style={thTdStyle}>Paciente</th>
                  <th style={thTdStyle}>Edad</th>
                  <th style={thTdStyle}>Cantidad de intervenciones recibidas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td style={thTdStyle}>{item.seguro}</td>
                    <td style={thTdStyle}>{item.paciente}</td>
                    <td style={thTdStyle}>{item.edad}</td>
                    <td style={thTdStyle}>{item.intervenciones}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          );

          case 'TopSintomasPorEnfermedad':
            return (
              <table style={tableStyle} className='reportTable' ref={ReportTable}>
                <thead>
                  <tr>
                    <th style={thTdStyle}>Enfermedad</th>
                    <th style={thTdStyle}>Síntoma</th>
                    <th style={thTdStyle}>Recurrencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index}>
                      <td style={thTdStyle}>{item.enfermedad}</td>
                      <td style={thTdStyle}>{item.síntoma}</td>
                      <td style={thTdStyle}>{item.frecuencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );

            case 'TopSintomasAtendidos':
            return (
              <table style={tableStyle} className='reportTable' ref={ReportTable}>
                <thead>
                  <tr>
                    <th style={thTdStyle}>Síntoma</th>
                    <th style={thTdStyle}>Frecuencia</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((item, index) => (
                    <tr key={index}>
                      <td style={thTdStyle}>{item.síntoma}</td>
                      <td style={thTdStyle}>{item.frecuencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            );

        default:
          return null;
      }
    }

    return null;
  };

  return (
    <Container>
      <h2 className="text-center"> Reportes </h2>

      <Col xs={8} md={2} lg={12}>
        <span>Seleccione el reporte</span>
        <Select onChange={(selected) => setSelectedReport(selected)} options={reportOptions} />

        <Button onClick={() => generateReport()}>Generar</Button>

        {reportData ? (
          <>
            <DownloadTableExcel 
            filename={selectedReport.label} 
            sheet={selectedReport.label}
            currentTableRef={ReportTable.current}
            >
              <button className='excelImg'>
                <img src="https://i.ibb.co/br98Dfx/to-excel.png" alt="Icono de Excel" width="20%" height="5%"></img>
              </button>
            </DownloadTableExcel>

            {renderReportTable()}

          </>
        ) : null}
      </Col>
    </Container>
  );
};

export default Reports;