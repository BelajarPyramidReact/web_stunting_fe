import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ModernInput from '../../components/ModernInput';
import NotificationModal from '../../components/NotificationModal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const HealthRecordCreate = () => {
  const { children_id } = useParams();
  const [formData, setFormData] = useState({
    record_date: '',
    record_immunization: '',
    record_vaccinated_by: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    let tempErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        tempErrors[key] = `${key.replace('record_', '').replace('_', ' ')} harus diisi`;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        console.log(formData);
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/health-records/children/${children_id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/pendataan-riwayat-kesehatan')
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting the data:", error);
        setErrorMessage(
          error.response?.data?.message ||
          'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.'
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl font-bold text-teal-800 mb-6"
          data-aos="fade-down"
        >
          Catatan Kesehatan
        </h1>

        <form
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
        >
          <ModernInput
            label="Tanggal Pencatatan"
            name="record_date"
            type="date"
            value={formData.record_date}
            onChange={handleChange}
            icon="CalendarAlt"
            iconSet="fa"
            error={errors.record_date}
          />
          <ModernInput
            label="Imunisasi"
            name="record_immunization"
            type="text"
            value={formData.record_immunization}
            onChange={handleChange}
            icon="Syringe"
            iconSet="fa"
            error={errors.record_immunization}
          />
          <ModernInput
            label="Divaksinasi Oleh"
            name="record_vaccinated_by"
            type="text"
            value={formData.record_vaccinated_by}
            onChange={handleChange}
            icon="UserMd"
            iconSet="fa"
            error={errors.record_vaccinated_by}
          />

          <div className="flex justify-end mt-8" data-aos="fade-up">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Simpan Catatan Kesehatan
            </button>
          </div>
        </form>

        {isSuccess && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
            data-aos="fade-up"
          >
            <span className="block sm:inline">
              Catatan kesehatan berhasil disimpan!
            </span>
          </div>
        )}
        <NotificationModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Error"
          message={errorMessage}
        />
      </main>

      <Footer />
    </div>
  );
};

export default HealthRecordCreate;