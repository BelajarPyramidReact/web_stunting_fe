import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import ChildCreate from './pages/Child/ChildCreate';
import AnthropometricMeasurementCreate from './pages/Antropometri/AnthropometricMeasurementCreate';
import HealthRecordCreate from './pages/Health/HealthRecordCreate';
import HealthRecords from './pages/Health/HealthRecord';
import ChildRecord from './pages/Child/ChildRecords';
import AnthropometryMeasurementsRecord from './pages/Antropometri/AntropometriRecord';
import ChildEdit from './pages/Child/ChildEdit';
import AnthropometricMeasurementEdit from './pages/Antropometri/AnthropometricMeasurementEdit';
import HealthRecordEdit from './pages/Health/HealthRecordEdit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pendaftaran-anak" element={<ChildCreate />} />
        <Route path="/ubah-data-anak/:child_id" element={<ChildEdit />} />
        <Route path="/pengukuran-antropometri/:children_id" element={<AnthropometricMeasurementCreate />} />  
        <Route path="/pengukuran-antropometri/:measurement_id/:children_id" element={<AnthropometricMeasurementEdit />} />  
        <Route path="/pencatatan-riwayat-kesehatan/:children_id" element={<HealthRecordCreate />} />   
        <Route path="/pencatatan-riwayat-kesehatan/:health_id/:children_id" element={<HealthRecordEdit />} />   
        <Route path="/pendataan-riwayat-kesehatan" element={<HealthRecords />} />  
        <Route path="/pendataan-anak" element={<ChildRecord />} />  
        <Route path="/pendataan-antropometri" element={<AnthropometryMeasurementsRecord />} />  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
