import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../context/AuthContext";
import {
  HomeIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

function MobileDrawer({ isOpen, onClose, navItems, isActive, user, onLogout }) {
  // Create portal for the drawer
  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      style={{ isolation: "isolate" }}
    >
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-[10000] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <span className="text-lg font-semibold text-[#7231ff]">Menu</span>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block"
              onClick={onClose}
            >
              <div
                className={`flex items-center px-4 py-3 mx-2 rounded-md transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-[#7231ff] text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="font-medium">{item.name}</span>
              </div>
            </Link>
          ))}

          <div className="mt-4 border-t border-gray-200 pt-4">
            {user ? (
              <>
                <div className="flex items-center px-4 py-3 mx-2 mb-2">
                  <UserCircleIcon className="w-8 h-8 mr-3 text-[#7231ff]" />
                  <div>
                    <p className="font-medium text-gray-800">
                      {user.name || user.username}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="flex items-center w-full px-4 py-3 mx-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="block" onClick={onClose}>
                <div className="flex items-center px-4 py-3 mx-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200">
                  <UserCircleIcon className="w-5 h-5 mr-3" />
                  <span className="font-medium">Sign In</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function Navbar() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Upload", path: "/upload", icon: ArrowUpTrayIcon },
    { name: "Decks", path: "/decks", icon: DocumentTextIcon },
  ];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    // Optionally redirect to home page after logout
    // navigate('/');
  };

  return (
    <>
      <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-indigo-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-[#7231ff]">
                Flash<span className="text-[#ffc01d]">Cards</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="px-3 py-2">
                  <div
                    className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 ${
                      isActive(item.path)
                        ? "bg-[#7231ff] text-white font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-1" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </Link>
              ))}

              {/* Auth buttons for desktop - conditionally render based on auth status */}
              <div className="flex items-center ml-4">
                {user ? (
                  <div className="flex items-center">
                    <div className="mr-3">
                      <p className="font-medium text-gray-800">
                        {user.name || user.username}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5 mr-1" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" className="px-3 py-2">
                      <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all duration-200">
                        <span className="font-medium">Sign In</span>
                      </div>
                    </Link>
                    <Link to="/register" className="px-3 py-2">
                      <div className="flex items-center px-3 py-2 rounded-md bg-[#7231ff] text-white hover:bg-[#6020e0] transition-all duration-200">
                        <span className="font-medium">Sign Up</span>
                      </div>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                <Bars3Icon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer - Rendered outside the nav component using portal */}
      {isMounted && (
        <MobileDrawer
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
          navItems={navItems}
          isActive={isActive}
          user={user}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}

export default Navbar;
