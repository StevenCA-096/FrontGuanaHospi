import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/_layout/Layout.jsx'
import ListDoctor from './pages/management/doctor/listDoctor'
import ListIllness from './pages/management/illness/listIllness'
import ListUnits from './pages/management/unit/listUnits'
import ListSymptom from './pages/management/symptom/listSymptom'
import UserProfile from './pages/user/userProfile'
import { QueryClient,QueryClientProvider } from 'react-query'
import ListIntervention from './pages/attention/intervention/listIntervention.jsx'
import Login from './pages/user/login.jsx'
import ListPatient from './pages/attention/patient/listPatient.jsx'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="/listDoctors" element={<ListDoctor />}/>
      <Route path="/listIlness" element={<ListIllness />}/>
      <Route path="/listUnits" element={<ListUnits />}/>
      <Route path="/listSymptoms" element={<ListSymptom />}/>
      <Route path="/listIntervention" element={<ListIntervention />}/>
      <Route path="/listPatient" element={<ListPatient />}/>

      <Route path="/userProfile" element={<UserProfile />}/>
      <Route path="/login" element={<Login />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </QueryClientProvider>
)
