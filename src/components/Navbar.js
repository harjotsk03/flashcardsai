import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Upload", path: "/upload", icon: ArrowUpTrayIcon },
    { name: "Flashcards", path: "/flashcards", icon: DocumentTextIcon },
  ];

  return (
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
              <Link
                key={item.path}
                to={item.path}
                className="relative px-3 py-2"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    isActive(item.path)
                      ? "bg-[#7231ff]/10 text-[#7231ff]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-1" />
                  <span className="font-medium">{item.name}</span>

                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7231ff]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} className="relative">
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className={`flex flex-col items-center p-2 ${
                      isActive(item.path) ? "text-[#7231ff]" : "text-gray-500"
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-xs mt-1">{item.name}</span>

                    {isActive(item.path) && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="absolute -bottom-1 w-10 h-0.5 bg-[#7231ff] rounded-full"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
