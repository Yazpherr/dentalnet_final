import { useState } from 'react';

const useRutFormatter = () => {
  const [rut, setRut] = useState('');

  const formatRut = (value) => {
    // Eliminar todos los caracteres que no sean números o K
    value = value.replace(/[^0-9kK]/g, '');

    // Limitar a 9 caracteres (8 números + 1 dígito verificador)
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    // Aplicar formato de RUT
    if (value.length > 8) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }

    setRut(value);
  };

  return [rut, formatRut, setRut];
};

export default useRutFormatter;
