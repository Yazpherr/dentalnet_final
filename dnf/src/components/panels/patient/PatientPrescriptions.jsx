// src/components/home/microcomponents/PatientPrescriptions.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/patient-prescriptions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPrescriptions(response.data.prescriptions);
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl mb-4">Your Prescriptions</h2>
      {prescriptions.map((prescription) => (
        <div key={prescription.id} className="bg-white p-4 rounded shadow-md mb-4">
          <p><strong>Prescription ID:</strong> {prescription.id_prescription}</p>
          <p><strong>Doctor:</strong> {prescription.name_medic}</p>
          <p><strong>Drug Name:</strong> {prescription.name_drug}</p>
          <p><strong>Instructions:</strong> {prescription.instructions_use}</p>
          <p><strong>Prescription Date:</strong> {new Date(prescription.prescription_date).toLocaleDateString()}</p>
          <p><strong>Expiration Date:</strong> {new Date(prescription.expiration_date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default PatientPrescriptions;
