import { Link } from 'react-router-dom';
import logo from '/img/ico-dentalnet.svg'; // Asegúrate de que la ruta al logo sea correcta

const NavBarSoloLogo = ({ Url }) => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center relative h-16">
          <div>
            <Link to={Url} className="text-gray-700 text-sm">
              Volver
            </Link>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBarSoloLogo;
