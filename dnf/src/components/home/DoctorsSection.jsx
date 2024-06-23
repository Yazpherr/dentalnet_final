import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const doctors = [
    {
        name: "Dra. María López",
        specialty: "Odontología General",
        faculty: "Facultad de Medicina de la Universidad de Chile",
        image: "../../../public/doctor/doctor_2.webp" // Reemplaza con la ruta real de la imagen
    },
    {
        name: "Dr. Juan Pérez",
        specialty: "Endodoncia",
        faculty: "Facultad de Odontología de la Universidad de Concepción",
        image: "../../../public/doctor/doctor_1.webp" // Reemplaza con la ruta real de la imagen
    },
    {
        name: "Dra. Ana Martínez",
        specialty: "Periodoncia",
        faculty: "Facultad de Odontología de la Universidad de Valparaíso",
        image: "../../../public/doctor/doctor_3.webp" // Reemplaza con la ruta real de la imagen
    },
    {
        name: "Dr. Carlos Gómez",
        specialty: "Ortodoncia",
        faculty: "Facultad de Odontología de la Universidad de Santiago",
        image: "../../../public/doctor/doctor_4.webp" // Reemplaza con la ruta real de la imagen
    },
];

const DoctorsSection = () => {
    useEffect(() => {
        AOS.init({ duration: 500 });
    }, []);

    return (
        <div className="py-12 bg-gray-100">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-3xl font-semibold mb-8 text-center">
                    <span className="bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">CONOZCA A NUESTROS DENTISTAS</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {doctors.map((doctor, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg text-center"
                            data-aos="fade-up"
                        >
                            <div className="bg-blue-500 h-2 rounded-t-lg"></div>
                            <div className="p-6">
                                <img
                                    src={doctor.image}
                                    alt={doctor.name}
                                    className="w-32 h-32 rounded-full mx-auto"
                                />
                                <h3 className="text-lg font-bold mt-4">{doctor.name}</h3>
                                <p className="text-gray-700 mt-2">{doctor.specialty}</p>
                                <p className="text-gray-500">{doctor.faculty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorsSection;
