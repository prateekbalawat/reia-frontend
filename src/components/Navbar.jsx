import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + user from context
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          REIA
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Dashboard
                </button>
              </Link>
              <Link to="/reports">
                <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                  My Reports
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col items-start space-y-2">
          {user ? (
            <>
              <Link to="/dashboard">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Dashboard
                </button>
              </Link>
              <Link to="/reports">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Reports
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md border border-red-600 text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
