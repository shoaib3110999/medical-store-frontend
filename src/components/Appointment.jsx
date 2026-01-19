import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    gender: "",
    date: "",
    age: "",
    contact: "",
    address: "",
    country: "",
    service: "",
    schedule: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://medical-store-backend-sztf.onrender.com/api/appointments", formData);

      // Construct WhatsApp Message
      const message = `Hello, I would like to book an appointment.%0A%0A` +
        `*Details:*%0A` +
        `- Name: ${formData.name}%0A` +
        `- Father Name: ${formData.fatherName}%0A` +
        `- Service: ${formData.service}%0A` +
        `- Schedule: ${formData.schedule}%0A` +
        `- Date: ${formData.date}%0A` +
        `- Contact: ${formData.contact}`;

      const whatsappUrl = `https://wa.me/918153906236?text=${message}`;

      // Redirect to WhatsApp
      window.location.href = whatsappUrl;

      setFormData({
        name: "", fatherName: "", email: "", gender: "", date: "",
        age: "", contact: "", address: "", country: "",
        service: "", schedule: ""
      });
    } catch (err) {
      alert("Error saving appointment");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="left">
          <img
            src="https://via.placeholder.com/250x300"
            alt="Doctor"
            className="doctor-img"
          />
        </div>
        <div className="right">
          <h2>Book Your Appointment</h2>
          <h3>with <span className="highlight">Sahibzada Hakeem Shariq Ahmad Tariqi</span></h3>
          <div className="btn-group">
            <button className="btn">Audio Call</button>
            <button className="btn">Video Call</button>
          </div>
          <p className="urdu">خصوصی شرائط لاگو ہوں گی۔</p>
        </div>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <input type="text" name="name" value={formData.name} placeholder="Name" onChange={handleChange} required />
          <input type="text" name="fatherName" value={formData.fatherName} placeholder="Father Name" onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="email" name="email" value={formData.email} placeholder="Email" onChange={handleChange} required />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="row">
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} required />
        </div>
        <div className="row">
          <input type="text" name="contact" value={formData.contact} placeholder="Contact" onChange={handleChange} required />
          <input type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required />
        </div>
        <div className="row">
          <select name="country" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            <option>Pakistan</option>
            <option>India</option>
            <option>UAE</option>
          </select>
        </div>
        <div className="row">
          <select name="service" value={formData.service} onChange={handleChange} required>
            <option value="">Select Service</option>
            <option>Audio Call</option>
            <option>Video Call</option>
          </select>
          <select name="schedule" value={formData.schedule} onChange={handleChange} required>
            <option value="">Select Schedule</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </div>
        <button type="submit" className="book-btn">Book Now</button>
      </form>
    </div>
  );
}

export default App;
