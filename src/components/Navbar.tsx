import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

type NavbarProps = {
  signOut?: () => void;
};

/**
 * A navigation bar component that displays a logo on the left and a menu on
 * the right. The menu is hidden on mobile devices and can be toggled open
 * by clicking a button on the right.
 *
 * The menu is composed of a series of links that will be rendered as buttons
 * on mobile devices. The component will also render a "Sign out" button if
 * the `signOut` prop is provided.
 *
 * @param {{signOut?: () => void}} props
 * @returns {JSX.Element}
 */
const Navbar = ({ signOut }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gray-800">Logo</div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Home
            </a>
            {signOut && (
              <button className="primary" onClick={signOut}>
                Sign out
              </button>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Services
          </a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
