import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/img/ico-dentalnet.svg"; // Asegúrate de que la ruta al logo sea correcta

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <div>
              {/* Logo */}
              <Link to="/" className="flex items-center py-4 px-2">
                <img src={logo} alt="Logo" className="h-12  mr-2" />{" "}
                {/* Agrandado el logo */}
                <span className="font-semibold text-gray-500 text-lg">
                  DentalNet
                </span>
              </Link>
            </div>
          </div>
          {/* Primary Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="py-2 px-6 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
            >
              Login
            </Link>{" "}
            {/* Botón más ancho */}
            <Link
              to="/register"
              className="py-2 px-6 bg-primaryBlue text-white font-semibold rounded hover:bg-blue-800 transition duration-300"
            >
              Register
            </Link>{" "}
            {/* Botón más ancho */}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6 text-gray-500 hover:text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="flex flex-col items-center space-y-2 py-2">
          <Link
            to="/login"
            className="py-2 px-6 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
          >
            Login
          </Link>{" "}
          {/* Botón más ancho */}
          <Link
            to="/register"
            className="py-2 px-6 bg-primaryBlue text-white font-semibold rounded hover:bg-blue-800 transition duration-300"
          >
            Register
          </Link>{" "}
          {/* Botón más ancho */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
