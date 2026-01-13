import React from 'react';

import Navbar from './components/Navbar';
import Section from './components/Section';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router';
import Login from './components/Login';
import Miya from './components/Miya';
import Register from './components/Register';
import Cart from './components/Cart';
import Medicines from './components/Medicines';
import Appointment from './components/Appointment';
import About from './components/About';
import Naqsh from './components/Naqsh';
import Khidmat from './components/Khidmat';
import Courses from './components/Courses';
import Events from './components/Events';
import Books from './components/Books';
import PrivateRoute from './components/PrivateRoute';
import BookDetail from './components/BookDetail';
import NaqshDetail from './components/NaqshDetail';
import ProductDetail from './Pages/ProductDetail';
import Slider from './components/Slider';
import SearchResults from './components/SearchResults';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import ForgotPassword from './components/ForgotPassword';

const App = () => {
  return (
    <div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Section />} />
        <Route path="/login" element={<Login />} />
        <Route path="/miya" element={<Miya />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/about" element={<About />} />
        <Route path='/naqsh' element={<Naqsh />} />
        <Route path='/khidmat' element={<Khidmat />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/events' element={<Events />} />
        <Route path='/books' element={<Books />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/naqsh/:id" element={<NaqshDetail />} />
        <Route path="/product/:title" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />

      </Routes>
      {/* <Slider /> */}
      <Footer />
    </div>
  );
};

export default App;
