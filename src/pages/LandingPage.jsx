import React, { useEffect } from "react";
import { FaExclamationCircle, FaChartLine, FaRunning, FaUsers, FaChild, FaRuler, FaHeartbeat } from 'react-icons/fa';
import homeIcons from '../assets/home-bg.svg';
import Navbar from "../components/Navbar";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "../components/Footer";

const LandingPage = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    const records = [
        {
            title: 'Pendaftaran Anak',
            description: 'Daftarkan anak untuk memulai proses pengukuran kesehatan.',
            icon: <FaChild className="h-8 w-8 text-teal-500" />,
            link: '/pendataan-anak',
        },
        {
            title: 'Pengukuran Antropometri',
            description: 'Lakukan pengukuran antropometri untuk melacak pertumbuhan anak.',
            icon: <FaRuler className="h-8 w-8 text-teal-500" />,
            link: '/pendataan-antropometri',
        },
        {
            title: 'Riwayat Kesehatan',
            description: 'Akses catatan kesehatan anak untuk melihat riwayat kesehatan.',
            icon: <FaHeartbeat className="h-8 w-8 text-teal-500" />,
            link: '/pendataan-riwayat-kesehatan',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
            <Navbar />

            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Section: Introduction */}
                <div className="flex flex-wrap items-center min-h-[70vh]" data-aos="fade-right">
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

                {/* Section: Record List (Pendataan) */}
                <section id="record-list" className="mb-16">
                    <h2 className="text-3xl font-semibold text-teal-800 mb-6" data-aos="fade-up">Pendataan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {records.map((card, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                                data-aos="fade-up"
                            >
                                <div className="p-6 flex flex-col items-center">
                                    {card.icon}
                                    <h2 className="text-xl font-semibold text-teal-800 mt-4">
                                        {card.title}
                                    </h2>
                                    <p className="text-gray-600 mt-2 text-center">
                                        {card.description}
                                    </p>
                                    <a
                                        href={card.link}
                                        className="mt-4 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition"
                                    >
                                        Mulai
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: About Stunting */}
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

                {/* Section: Important Information */}
                <section id="info" className="mb-16" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-teal-800 mb-6">Informasi Penting</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="bg-teal-100 rounded-full p-3">
                                    <FaExclamationCircle className="text-teal-600" size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-2">Penyebab Stunting</h3>
                                <p className="text-gray-600">
                                    Stunting disebabkan oleh faktor multi-dimensi, termasuk praktik pengasuhan yang tidak baik, keterbatasan layanan kesehatan, kurangnya akses ke makanan bergizi, dan kurangnya akses ke air bersih dan sanitasi.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="bg-teal-100 rounded-full p-3">
                                    <FaChartLine className="text-teal-600" size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-2">Dampak Jangka Panjang</h3>
                                <p className="text-gray-600">
                                    Stunting dapat menyebabkan penurunan kecerdasan, rentan terhadap penyakit tidak menular, penurunan produktivitas, dan peningkatan risiko penyakit degeneratif di masa dewasa.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="bg-teal-100 rounded-full p-3">
                                    <FaRunning className="text-teal-600" size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-2">Pencegahan</h3>
                                <p className="text-gray-600">
                                    Pencegahan stunting dapat dilakukan melalui pemenuhan gizi sejak 1000 Hari Pertama Kehidupan (HPK), perbaikan pola asuh, perbaikan sanitasi dan akses air bersih, serta peningkatan akses dan kualitas layanan kesehatan.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="bg-teal-100 rounded-full p-3">
                                    <FaUsers className="text-teal-600" size={24} />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-teal-800 mb-2">Program Pemerintah</h3>
                                <p className="text-gray-600">
                                    Pemerintah Indonesia telah mencanangkan program-program untuk mengatasi stunting, termasuk Program Indonesia Sehat dengan Pendekatan Keluarga (PIS-PK) dan Strategi Nasional Percepatan Pencegahan Stunting.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default LandingPage;
