// src/components/microcomponents/PatientLayout.jsx

import React from 'react';
import SidebarLarge from './SidebarLarge';
import SidebarResponsive from './SidebarResponsive';
import { FiHome, FiClipboard } from 'react-icons/fi';

const PatientLayout = ({ children }) => {
  const menuItems = [
    { path: '/patient/dashboard', name: 'Dashboard', icon: FiHome },
    { path: '/patient/prescriptions', name: 'Prescriptions', icon: FiClipboard },
  ];

  return (
    <div className="flex">
      <SidebarLarge menuItems={menuItems} />
      <div className="flex flex-col flex-1">
        <SidebarResponsive menuItems={menuItems} />
        <main className="p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
