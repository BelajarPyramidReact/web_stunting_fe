import React, { useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaExclamationCircle, FaChartLine, FaRunning, FaUsers } from 'react-icons/fa';
import homeIcons from '../assets/home-bg.svg';
import Navbar from "../components/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../components/Footer";
import StatCard from "../components/StatCard";
import InfoSection from "../components/InfoSection";

const data = [
    { name: '2018', stunting: 30.8, normal: 69.2 },
    { name: '2019', stunting: 27.7, normal: 72.3 },
    { name: '2020', stunting: 24.4, normal: 75.6 },
    { name: '2021', stunting: 21.6, normal: 78.4 },
    { name: '2022', stunting: 19.7, normal: 80.3 },
];

const LandingPage = () => {
    useEffect(() => {
        AOS.init(); 
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center min-h-[65vh]" data-aos="fade-right">
                    <div className="w-full xl:w-1/2 order-2 md:order-1">
                        <div className="py-17.5 px-26 text-center flex flex-col">
                            <span className="md:mt-15 mx-auto">
                                <img src={homeIcons} alt="" />
                            </span>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 order-1 md:order-2 mt-20 md:mt-0" data-aos="fade-left">
                        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                            <h2 className="text-4xl font-bold text-teal-800 mb-4">
                                Bersama Atasi Stunting di Indonesia
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Mari kita tingkatkan kesadaran dan aksi untuk mengurangi stunting pada anak-anak Indonesia.
                            </p>
                        </div>
                    </div>
                </div>

                <section id="about" className="mb-16">
                    <h2 className="text-3xl font-semibold text-teal-800 mb-6" data-aos="fade-up">Apa itu Stunting?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Definisi Stunting</h3>
                            <p className="text-gray-600 mb-4">
                                Stunting adalah kondisi gagal tumbuh pada anak balita akibat kekurangan gizi kronis sehingga anak terlalu pendek untuk usianya.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Dampak Fisik</h3>
                            <p className="text-gray-600 mb-4">
                                Tinggi badan kurang dari standar usia dapat mengakibatkan berbagai masalah kesehatan.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Gangguan Perkembangan</h3>
                            <p className="text-gray-600 mb-4">
                                Keterlambatan dalam perkembangan kognitif dan motorik dapat terjadi akibat stunting.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="300">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Kesehatan Jangka Panjang</h3>
                            <p className="text-gray-600 mb-4">
                                Stunting meningkatkan risiko penyakit tidak menular di masa dewasa.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="400">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Pencegahan</h3>
                            <p className="text-gray-600 mb-4">
                                Memenuhi gizi yang baik dan sanitasi yang memadai sangat penting untuk pencegahan stunting.
                            </p>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-500 hover:scale-105" data-aos="fade-up" data-aos-delay="500">
                            <h3 className="text-xl font-semibold text-teal-700 mb-2">Program Pemerintah</h3>
                            <p className="text-gray-600 mb-4">
                                Berbagai program telah dicanangkan oleh pemerintah untuk mengatasi masalah stunting di Indonesia.
                            </p>
                        </div>
                    </div>
                </section>
                <section id="stats" className="mb-16">
                    <h2
                        className="text-3xl font-semibold text-teal-800 mb-6"
                        data-aos="fade-up"
                    >
                        Statistik Stunting di Indonesia
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
                        <StatCard
                            title="Prevalensi Stunting"
                            value="19.7%"
                            description="Angka prevalensi stunting di Indonesia pada tahun 2022"
                            data-aos="fade-up"
                        />
                        <StatCard
                            title="Penurunan"
                            value="11.1%"
                            description="Penurunan prevalensi stunting dari 2018 ke 2022"
                            data-aos="fade-up"
                        />
                        <StatCard
                            title="Target 2024"
                            value="14%"
                            description="Target pemerintah untuk prevalensi stunting pada 2024"
                            data-aos="fade-up"
                        />
                    </div>
                    <div
                        className="bg-white rounded-lg shadow-md p-6"
                        data-aos="fade-up"
                    >
                        <h3 className="text-xl font-semibold text-teal-700 mb-4">
                            Tren Stunting 5 Tahun Terakhir
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="normal" fill="#0d9488" name="Normal (%)" />
                                <Bar dataKey="stunting" fill="#FF5722" name="Stunting (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section id="info" className="mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-teal-800 mb-6">Informasi Penting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <InfoSection
                            title="Penyebab Stunting"
                            content="Stunting disebabkan oleh faktor multi-dimensi, termasuk praktik pengasuhan yang tidak baik, keterbatasan layanan kesehatan, kurangnya akses ke makanan bergizi, dan kurangnya akses ke air bersih dan sanitasi."
                            icon={FaExclamationCircle}
                        />
                        <InfoSection
                            title="Dampak Jangka Panjang"
                            content="Stunting dapat menyebabkan penurunan kecerdasan, rentan terhadap penyakit tidak menular, penurunan produktivitas, dan peningkatan risiko penyakit degeneratif di masa dewasa."
                            icon={FaChartLine}
                        />
                        <InfoSection
                            title="Pencegahan"
                            content="Pencegahan stunting dapat dilakukan melalui pemenuhan gizi sejak 1000 Hari Pertama Kehidupan (HPK), perbaikan pola asuh, perbaikan sanitasi dan akses air bersih, serta peningkatan akses dan kualitas layanan kesehatan."
                            icon={FaRunning}
                        />
                        <InfoSection
                            title="Program Pemerintah"
                            content="Pemerintah Indonesia telah mencanangkan program-program untuk mengatasi stunting, termasuk Program Indonesia Sehat dengan Pendekatan Keluarga (PIS-PK) dan Strategi Nasional Percepatan Pencegahan Stunting."
                            icon={FaUsers}
                        />
                    </div>
                </section>

            </main>
            <Footer />

        </div>
    );
}

export default LandingPage;