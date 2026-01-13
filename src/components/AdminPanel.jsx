import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import "./AdminPanel.css";

const AdminPanel = () => {
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        await Promise.all([fetchAppointments(), fetchUsers()]);
        setLoading(false);
    };

    const fetchAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/appointments");
            setAppointments(res.data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/auth/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/${id}`);
            fetchAppointments();
        } catch (err) {
            console.error("Error deleting:", err);
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Complete' : 'Pending';
        try {
            await axios.put(`http://localhost:5000/api/appointments/${id}`, { status: newStatus });
            fetchAppointments();
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    if (loading) return <div className="container"><h2>Loading Admin Dashboard...</h2></div>;

    return (
        <div className="container admin-container">
            <div className="admin-header">
                <h2>Admin Dashboard</h2>
                <div className="admin-stats">
                    <div className="stat-box stat-appointments">
                        Appointments: {appointments.length}
                    </div>
                    <div className="stat-box stat-users">
                        Total Users: {users.length}
                    </div>
                </div>
            </div>

            <div className="table-wrapper">
                <div className="table-responsive">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Contact Details</th>
                                <th>Service & Schedule</th>
                                <th>Requested Date</th>
                                <th style={{ textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "#666" }}>No appointments found.</td>
                                </tr>
                            ) : (
                                appointments.map((appt) => (
                                    <tr key={appt._id}>
                                        <td data-label="Patient Name">
                                            <div className="patient-name">{appt.name}</div>
                                            <div className="sub-text">S/O: {appt.fatherName}</div>
                                            <div className="sub-text">Age: {appt.age} | Gender: {appt.gender}</div>
                                        </td>
                                        <td data-label="Contact Details">
                                            <div>{appt.email}</div>
                                            <div>{appt.contact}</div>
                                            <div className="sub-text">{appt.address}, {appt.country}</div>
                                        </td>
                                        <td data-label="Service & Schedule">
                                            <span className="badge badge-service">{appt.service}</span>
                                            <span className="badge badge-schedule">{appt.schedule}</span>
                                        </td>
                                        <td data-label="Requested Date">
                                            {new Date(appt.date).toLocaleDateString()}
                                        </td>
                                        <td data-label="Actions" style={{ textAlign: "center" }}>
                                            <div className="action-buttons">
                                                <button
                                                    onClick={() => handleStatusToggle(appt._id, appt.status || 'Pending')}
                                                    className={(appt.status || 'Pending') === 'Pending' ? 'btn-status-pending' : 'btn-status-complete'}
                                                >
                                                    {appt.status || 'Pending'}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(appt._id)}
                                                    className="btn-delete"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: "50px" }}>
                <h3 className="section-title">Registered Users</h3>
                <div className="table-wrapper">
                    <div className="table-responsive">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{ padding: "30px", textAlign: "center", color: "#666" }}>No users found.</td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td data-label="Username" style={{ fontWeight: "bold" }}>{user.username}</td>
                                            <td data-label="Email">{user.email}</td>
                                            <td data-label="Created At" className="sub-text">
                                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
