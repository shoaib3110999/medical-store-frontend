import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { PiShoppingCartBold } from "react-icons/pi";
import '../App.css';

import { products } from "../data/medicinesData";
import { books } from "../data/booksData";

// Naqsh data (static)
const naqshData = [
  { title: "Tawiz-E-Khass", category: "Naqsh" }
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      const allItems = [...products, ...books, ...naqshData];
      const filtered = allItems.filter(item =>
        item.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    setSuggestions([]);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(title)}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail"); // ✅ Clear email on logout
    setDropdownOpen(false);
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const userEmail = localStorage.getItem("userEmail");
  const isAdmin = isLoggedIn && userEmail === "pshoaib215@gmail.com";

  return (
    <div className="main-nav-container">
      {/* Desktop Navbar */}
      <div className="main-nav">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="//www.tjrci.in/cdn/shop/files/tjrci-logo-home-screen.png?v=1744620927&width=600"
            alt="Logo"
            className="img-logo"
          />
        </Link>

        {/* Desktop Links - Hidden on tablets and below */}
        <ul className="hidden lg:flex items-center gap-6 text-sm">
          <li><Link to="/">Home</Link></li>
          {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
          <li><Link to="/miya">Miya Huzur</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/medicines">Medicines</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/naqsh">Naqsh</Link></li>
          <li><Link to="/khidmat">Khidmat-e-Khalq</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li>
            <Link to="/appointment" className="border border-gray-400 rounded-full px-4 py-1">
              Appointment
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/admin" className="text-red-600 font-bold hover:text-red-700">
                Admin
              </Link>
            </li>
          )}
        </ul>

        {/* Search + Icons - Hidden on tablets and below */}
        <div className="hidden lg:flex items-center gap-4 relative">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white rounded-full overflow-hidden border border-gray-300"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              placeholder="Search..."
              className="px-3 py-1 text-gray-700 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-3 py-2 hover:bg-blue-700 flex items-center justify-center"
            >
              <FaSearch />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  onClick={() => handleSuggestionClick(item.title)}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <IoMdContact
              className="text-xl cursor-pointer hover:text-gray-300"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => { setDropdownOpen(false); navigate("/login"); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="relative">
            <PiShoppingCartBold className="text-xl cursor-pointer hover:text-gray-300" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button - Shows on tablets and below */}
        <button
          className="lg:hidden text-2xl flex items-center gap-3"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-gray-900 text-white px-6 py-8 space-y-6 absolute w-full left-0 top-[70px] border-t border-gray-800 shadow-2xl z-50 animate-in slide-in-from-top duration-300">
          {/* Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-800 rounded-full overflow-hidden border border-gray-700"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="px-4 py-2 text-white text-sm bg-transparent outline-none flex-1"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
            >
              <FaSearch />
            </button>
          </form>

          <ul className="flex flex-col space-y-4 text-lg font-medium">
            <li><Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Home</Link></li>
            {!isLoggedIn && <li><Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Login</Link></li>}
            <li><Link to="/miya" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Miya Huzur</Link></li>
            <li><Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">About Us</Link></li>
            <li><Link to="/medicines" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Medicines</Link></li>
            <li><Link to="/books" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Books</Link></li>
            <li><Link to="/naqsh" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Naqsh</Link></li>
            <li><Link to="/khidmat" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Khidmat-e-Khalq</Link></li>
            <li><Link to="/courses" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Courses</Link></li>
            <li><Link to="/events" onClick={() => setMenuOpen(false)} className="hover:text-blue-400 transition-colors">Events</Link></li>
            <li>
              <Link
                to="/appointment"
                className="block bg-blue-600 text-white rounded-full px-4 py-2 text-center font-bold shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                Book Appointment
              </Link>
            </li>
            {isAdmin && <li><Link to="/admin" onClick={() => setMenuOpen(false)} className="text-red-500 font-bold border-t border-gray-800 pt-4 block">Admin Panel</Link></li>}
          </ul>

          {/* Mobile Profile/Cart Icons */}
          <div className="flex justify-around items-center pt-6 border-t border-gray-800">
            <div className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <IoMdContact className="text-2xl" />
              <span>Profile</span>
            </div>
            <Link to="/cart" className="relative flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <PiShoppingCartBold className="text-2xl" />
              <span>Cart ({cartItems.length})</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
