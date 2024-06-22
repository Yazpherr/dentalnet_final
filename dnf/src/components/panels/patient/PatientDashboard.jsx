import React, { useState, useEffect } from 'react';
import { getPatientProfile, updatePatientProfile } from '../../../services/api';

const PatientDashboard = () => {
  const [profile, setProfile] = useState({
    dni: '',
    age: '',
    gender: '',
    phone_number: '',
    medical_conditions: '',
    oral_health_level: 0,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token is missing');
        }

        const response = await getPatientProfile(token);
        setProfile(response);
        setError('');
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.error || 'Error fetching profile');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }

      const response = await updatePatientProfile(token, profile);
      setMessage(response.message);
      setError('');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.error || 'Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-6 w-full max-w-md">
        <h2 className="text-2xl mb-4">Update Profile</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">DNI</label>
          <input
            type="text"
            name="dni"
            value={profile.dni}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Gender</label>
          <input
            type="text"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={profile.phone_number}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Medical Conditions</label>
          <textarea
            name="medical_conditions"
            value={profile.medical_conditions}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Oral Health Level</label>
          <input
            type="number"
            name="oral_health_level"
            value={profile.oral_health_level}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Profile</button>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PatientDashboard;
