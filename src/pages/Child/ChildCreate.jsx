import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ModernInput from '../../components/ModernInput';
import NotificationModal from '../../components/NotificationModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChildCreate = () => {
  const [formData, setFormData] = useState({
    children_name: '',
    children_birth_date: '',
    children_address: '',
    children_parent: '',
    children_parent_phone: '',
    children_allergy: '',
    children_blood_type: '',
    children_weight: '',
    children_height: '',
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Field changed:', name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = (stepData) => {
    let tempErrors = {};
    Object.keys(stepData).forEach((key) => {
      if (!stepData[key] && key !== 'children_allergy') {
        tempErrors[key] = `${key.replace('children_', '').replace('_', ' ')} harus diisi`;
      }

      if (key === 'children_blood_type' && stepData[key] === '') {
        tempErrors[key] = 'Golongan Darah harus dipilih';
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate(formData)) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_PUBLIC_URL}/children`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          console.log("Data successfully submitted:", formData);
          setIsSuccess(true);
          setTimeout(() => {
            navigate('/pendataan-anak')
          }, 3000);
        } else {
          console.error("Failed to submit data:", response.statusText);
        }
      } catch (error) {
        console.error("Error during submission:", error);
        setErrorMessage(
          error.response?.data?.message ||
          'Terjadi kesalahan saat mengedit data. Silakan coba lagi.'
        );
      }
    }
  };

  const handleNext = () => {
    const stepData =
      step === 1
        ? {
          children_name: formData.children_name,
          children_birth_date: formData.children_birth_date,
          children_address: formData.children_address,
        }
        : {
          children_parent: formData.children_parent,
          children_parent_phone: formData.children_parent_phone,
          children_weight: formData.children_weight,
          children_height: formData.children_height,
        };
    if (validate(stepData)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <ModernInput
              label="Nama Anak"
              name="children_name"
              value={formData.children_name}
              onChange={handleChange}
              icon="Child"
              iconSet="fa"
              error={errors.children_name}
            />
            <ModernInput
              label="Tanggal Lahir"
              name="children_birth_date"
              type="date"
              value={formData.children_birth_date}
              onChange={handleChange}
              icon="CalendarAlt"
              iconSet="fa"
              error={errors.children_birth_date}
            />
            <ModernInput
              label="Alamat"
              name="children_address"
              value={formData.children_address}
              onChange={handleChange}
              icon="MapMarkerAlt"
              iconSet="fa"
              error={errors.children_address}
            />
          </>
        );
      case 2:
        return (
          <>
            <ModernInput
              label="Nama Orang Tua"
              name="children_parent"
              value={formData.children_parent}
              onChange={handleChange}
              icon="Users"
              iconSet="fa"
              error={errors.children_parent}
            />
            <ModernInput
              label="Nomor Telepon Orang Tua"
              name="children_parent_phone"
              type="tel"
              value={formData.children_parent_phone}
              onChange={handleChange}
              icon="Phone"
              iconSet="fa"
              error={errors.children_parent_phone}
            />
            <ModernInput
              label="Berat Badan (kg)"
              name="children_weight"
              type="number"
              value={formData.children_weight}
              onChange={handleChange}
              icon="Weight"
              iconSet="fa"
              error={errors.children_weight}
            />
            <ModernInput
              label="Tinggi Badan (cm)"
              name="children_height"
              type="number"
              value={formData.children_height}
              onChange={handleChange}
              icon="RulerVertical"
              iconSet="fa"
              error={errors.children_height}
            />
          </>
        );
      case 3:
        return (
          <>
            <ModernInput
              label="Golongan Darah"
              name="children_blood_type"
              type="select"
              value={formData.children_blood_type}
              onChange={handleChange}
              icon="Heartbeat"
              iconSet="fa"
              options={[
                { label: 'Pilih Golongan Darah', value: '' },
                { label: 'A', value: 'A' },
                { label: 'B', value: 'B' },
                { label: 'AB', value: 'AB' },
                { label: 'O', value: 'O' },
              ]}
              error={errors.children_blood_type}
            />
            <ModernInput
              label="Alergi (opsional)"
              name="children_allergy"
              type="textarea"
              value={formData.children_allergy}
              onChange={handleChange}
            />
          </>
        );
      default:
        return null;
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
          Pendaftaran Anak
        </h1>

        <div className="mb-8" data-aos="fade-up">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`w-1/3 text-center ${step === item
                  ? 'text-teal-600 font-semibold'
                  : 'text-gray-400'
                  }`}
              >
                Step {item}
              </div>
            ))}
          </div>
          <div className="flex h-2 mb-4">
            <div
              className={`flex-1 ${step >= 1 ? 'bg-teal-500' : 'bg-gray-200'}`}
            ></div>
            <div
              className={`flex-1 ${step >= 2 ? 'bg-teal-500' : 'bg-gray-200'}`}
            ></div>
            <div
              className={`flex-1 ${step >= 3 ? 'bg-teal-500' : 'bg-gray-200'}`}
            ></div>
          </div>
        </div>

        <form
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
        >
          {renderStep()}

          <div className="flex justify-between mt-8" data-aos="fade-up">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-teal-200 hover:bg-teal-300 text-teal-800 py-2 px-4 rounded"
              >
                Sebelumnya
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Submit
              </button>
            )}
          </div>
        </form>

        {isSuccess && (
          <div
            className="mt-6 p-4 text-green-700 bg-green-100 rounded-lg"
            data-aos="fade-up"
          >
            Data anak berhasil disimpan!
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

export default ChildCreate;