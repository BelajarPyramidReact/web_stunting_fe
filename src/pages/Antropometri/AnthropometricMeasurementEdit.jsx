import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ModernInput from '../../components/ModernInput';
import NotificationModal from '../../components/NotificationModal';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AnthropometricMeasurementEdit = () => {
  const { children_id, measurement_id } = useParams();
  const [formData, setFormData] = useState({
    measurement_date: '',
    measurement_weight: '',
    measurement_height: '',
    measurement_head_circumference: '',
    measurement_abdominal_circumference: '',
    measurement_leg_circumference: '',
    measurement_arm_circumference: '',
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMeasurementData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/measurements/${measurement_id}/children/${children_id}`);
        if (response.status === 200) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching the data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeasurementData();
  }, [measurement_id, children_id]);

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
      if (!formData[key] && key !== 'measurement_head_circumference' && key !== 'measurement_abdominal_circumference' && key !== 'measurement_leg_circumference' && key !== 'measurement_arm_circumference') {
        tempErrors[key] = `${key.replace('measurement_', '').replace('_', ' ')} harus diisi`;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/measurements/${measurement_id}/children/${children_id}`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/pendataan-antropometri')
          }, 3000);
        }
      } catch (error) {
        console.error("Error submitting the data:", error);
        setErrorMessage(
          error.response?.data?.message ||
          'Terjadi kesalahan saat menyimpan data. Silakan coba lagi.'
        );
        setShowErrorModal(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-teal-800 mb-6" data-aos="fade-down">
          Edit Pengukuran Antropometri
        </h1>

        {isLoading ? (
          <p>Loading data...</p>
        ) : (
          <form className="space-y-6 bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
            <ModernInput
              label="Tanggal Pengukuran"
              name="measurement_date"
              type="date"
              value={formData.measurement_date}
              onChange={handleChange}
              icon="CalendarAlt"
              iconSet="fa"
            />
            <ModernInput
              label="Berat Badan (kg)"
              name="measurement_weight"
              type="number"
              step="0.1"
              value={formData.measurement_weight}
              onChange={handleChange}
              icon="Weight"
              iconSet="fa"
              error={errors.measurement_weight}
            />
            <ModernInput
              label="Tinggi Badan (cm)"
              name="measurement_height"
              type="number"
              step="0.1"
              value={formData.measurement_height}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.measurement_height}
            />
            <ModernInput
              label="Lingkar Kepala (cm)"
              name="measurement_head_circumference"
              type="number"
              step="0.1"
              value={formData.measurement_head_circumference}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.measurement_head_circumference}
            />
            <ModernInput
              label="Lingkar Perut (cm)"
              name="measurement_abdominal_circumference"
              type="number"
              step="0.1"
              value={formData.measurement_abdominal_circumference}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.measurement_abdominal_circumference}
            />
            <ModernInput
              label="Lingkar Kaki (cm)"
              name="measurement_leg_circumference"
              type="number"
              step="0.1"
              value={formData.measurement_leg_circumference}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.measurement_leg_circumference}
            />
            <ModernInput
              label="Lingkar Lengan (cm)"
              name="measurement_arm_circumference"
              type="number"
              step="0.1"
              value={formData.measurement_arm_circumference}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.measurement_arm_circumference}
            />

            <div className="flex justify-end mt-8" data-aos="fade-up">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Simpan Pengukuran
              </button>
            </div>
          </form>
        )}

        {isSuccess && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
            data-aos="fade-up"
          >
            <span className="block sm:inline">
              Data pengukuran berhasil diperbarui!
            </span>
          </div>
        )}
        
      </main>
      <NotificationModal
          isOpen={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          title="Error"
          message={errorMessage}
        />
      <Footer />
    </div>
  );
};

export default AnthropometricMeasurementEdit;