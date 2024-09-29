import React, { useState, useEffect } from 'react';
// import {
//   FaChild,
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaWeight,
//   FaRulerVertical,
//   FaUsers,
//   FaHeartbeat,
// } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ModernInput from '../components/ModernInput';

const ChildRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    address: '',
    weight: '',
    height: '',
    parentName: '',
    parentPhone: '',
    bloodType: '',
    allergies: '',
    vaccinationHistory: [],
  });
  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const vaccinations = [
    'BCG',
    'Hepatitis B',
    'DPT',
    'Polio',
    'Measles',
    'Rubella',
    'Japanese Encephalitis',
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVaccinationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      vaccinationHistory: checked
        ? [...prevData.vaccinationHistory, value]
        : prevData.vaccinationHistory.filter((v) => v !== value),
    }));
  };

  const validate = (stepData) => {
    let tempErrors = {};
    Object.keys(stepData).forEach((key) => {
      if (
        !stepData[key] &&
        key !== 'allergies' &&
        key !== 'vaccinationHistory'
      ) {
        tempErrors[key] = `${
          key.charAt(0).toUpperCase() +
          key
            .slice(1)
            .replace(/([A-Z])/g, ' $1')
            .trim()
        } harus diisi`;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(formData)) {
      console.log(formData);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setStep(1);
        setFormData({
          name: '',
          birthDate: '',
          address: '',
          weight: '',
          height: '',
          parentName: '',
          parentPhone: '',
          bloodType: '',
          allergies: '',
          vaccinationHistory: [],
        });
      }, 3000);
    }
  };

  const handleNext = () => {
    const stepData =
      step === 1
        ? {
            name: formData.name,
            birthDate: formData.birthDate,
            address: formData.address,
          }
        : {
            weight: formData.weight,
            height: formData.height,
            parentName: formData.parentName,
            parentPhone: formData.parentPhone,
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
            <div>
              <ModernInput
                label="Nama Anak"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon="Child"
                iconSet="fa"
                error={errors.name}
              />
            </div>
            <div>
              <ModernInput
                label="Tanggal Lahir"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                icon="CalendarAlt"
                iconSet="fa"
                error={errors.birthDate}
              />
            </div>
            <div>
              <ModernInput
                label="Alamat"
                name="address"
                value={formData.address}
                onChange={handleChange}
                icon="MapMarkerAlt"
                iconSet="fa"
                error={errors.address}
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <ModernInput
                label="Berat Badan (kg)"
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleChange}
                icon="Weight"
                iconSet="fa"
                error={errors.weight}
              />
            </div>
            <div>
              <ModernInput
                label="Tinggi Badan (cm)"
                name="height"
                type="number"
                value={formData.height}
                onChange={handleChange}
                icon="RulerVertical"
                iconSet="fa"
                error={errors.height}
              />
            </div>
            <div>
              <ModernInput
                label="Nama Orang Tua"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                icon="Users"
                iconSet="fa"
                error={errors.parentName}
              />
            </div>
            <div>
              <ModernInput
                label="Nomor Telepon Orang Tua"
                name="parentPhone"
                type="tel"
                value={formData.parentPhone}
                onChange={handleChange}
                icon="Users"
                iconSet="fa"
                error={errors.parentPhone}
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div>
              <ModernInput
                label="Golongan Darah"
                name="bloodType"
                type="select"
                value={formData.bloodType}
                onChange={handleChange}
                icon="Heartbeat"
                iconSet="fa"
                placeholder="Pilih Golongan Darah"
                options={[
                  { label: 'A', value: 'A' },
                  { label: 'B', value: 'B' },
                  { label: 'AB', value: 'AB' },
                  { label: 'O', value: 'O' },
                ]}
              />
            </div>
            <div>
              <ModernInput
                label="Alergi (opsional)"
                name="allergies"
                type="textarea"
                value={formData.allergies}
                onChange={handleChange}
                icon="Heartbeat"
                iconSet="fa"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                Riwayat Vaksinasi
              </label>
              {isLoading ? (
                <p>Loading vaccinations...</p>
              ) : (
                <div className="space-y-2">
                  {vaccinations.map((vaccine, index) => (
                    <div key={vaccine} className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          id={vaccine}
                          name="vaccinationHistory"
                          value={vaccine}
                          checked={formData.vaccinationHistory.includes(
                            vaccine
                          )}
                          onChange={handleVaccinationChange}
                          className="hidden"
                        />
                        <div className="relative">
                          <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded-md flex justify-center items-center transition-all duration-200 ease-in-out transform hover:scale-105">
                            <svg
                              className={`w-4 h-4 text-teal-500 opacity-0 transition-opacity duration-200 ${
                                formData.vaccinationHistory.includes(vaccine)
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              }`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-sm text-gray-900">
                          {vaccine}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
                className={`w-1/3 text-center ${
                  step === item
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
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md"
          data-aos="fade-up"
        >
          {renderStep()}

          <div className="flex justify-between mt-8" data-aos="fade-up">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
                type="submit"
                className="bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Simpan Data
              </button>
            )}
          </div>
        </form>

        {isSuccess && (
          <div
            className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
            data-aos="fade-up"
          >
            <span className="block sm:inline">
              Data anak berhasil disimpan!
            </span>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ChildRegistrationPage;
