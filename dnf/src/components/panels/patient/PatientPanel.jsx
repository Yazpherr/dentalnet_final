// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const PatientPanel = () => {
//   const [profile, setProfile] = useState({
//     dni: '',
//     age: '',
//     gender: '',
//     phone_number: '',
//     medical_conditions: '',
//     oral_health_level: 0,
//   });

//   const [prescriptions, setPrescriptions] = useState([]);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Cargar perfil del paciente si ya existe
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8000/api/patient', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     // Cargar recetas del paciente
//     const fetchPrescriptions = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8000/api/patient-prescriptions', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setPrescriptions(response.data.prescriptions);
//       } catch (error) {
//         console.error('Error fetching prescriptions:', error);
//       }
//     };

//     fetchProfile();
//     fetchPrescriptions();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.post('http://localhost:8000/api/update-profile', profile, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage('Failed to update profile');
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md">
//         <h2 className="text-2xl mb-4">Update Profile</h2>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">DNI</label>
//           <input
//             type="text"
//             name="dni"
//             value={profile.dni}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Age</label>
//           <input
//             type="number"
//             name="age"
//             value={profile.age}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Gender</label>
//           <input
//             type="text"
//             name="gender"
//             value={profile.gender}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Phone Number</label>
//           <input
//             type="text"
//             name="phone_number"
//             value={profile.phone_number}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Medical Conditions</label>
//           <textarea
//             name="medical_conditions"
//             value={profile.medical_conditions}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Oral Health Level</label>
//           <input
//             type="number"
//             name="oral_health_level"
//             value={profile.oral_health_level}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
//         {message && <p className="mt-4">{message}</p>}
//       </form>

//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl mb-4">Your Prescriptions</h2>
//         {prescriptions.map((prescription) => (
//           <div key={prescription.id} className="bg-white p-4 rounded shadow-md mb-4">
//             <p><strong>Prescription ID:</strong> {prescription.id_prescription}</p>
//             <p><strong>Doctor:</strong> {prescription.name_medic}</p>
//             <p><strong>Drug Name:</strong> {prescription.name_drug}</p>
//             <p><strong>Instructions:</strong> {prescription.instructions_use}</p>
//             <p><strong>Prescription Date:</strong> {new Date(prescription.prescription_date).toLocaleDateString()}</p>
//             <p><strong>Expiration Date:</strong> {new Date(prescription.expiration_date).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PatientPanel;
