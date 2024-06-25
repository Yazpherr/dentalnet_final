import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import PatientsTable from '../../UI/tables/PatientsTable';
import UpdatePatientAsDoctor from '../../UI/modals/UpdatePatientAsDoctor';
import { getPatients } from '../../../services/api';

const Patients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar la actualización
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPatients();
  }, [refreshKey]); // Agregamos refreshKey como dependencia

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await getPatients(token);
      setPatients(response.data.patients);
    } catch (error) {
      console.error('Failed to fetch patients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (patient) => {
    setSelectedPatient(patient);
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  const refreshPatients = () => {
    setRefreshKey(oldKey => oldKey + 1); // Forzar la actualización
  };

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <PatientsTable token={token} handleUpdate={handleUpdate} patients={patients} loading={loading} />
      <UpdatePatientAsDoctor
        visible={isModalVisible}
        onClose={handleClose}
        patient={selectedPatient}
        token={token}
        refreshPatients={refreshPatients}
      />
    </div>
  );
};

export default Patients;
