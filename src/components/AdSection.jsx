import React, { useState, useEffect } from 'react';
import appoinment from '../assets/appoinment.jpeg';
import appoinment1 from '../assets/appoinment1.jpeg';

const AdSection = () => {
    const images = [appoinment, appoinment1];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-col items-center py-8">
            <h2 className="text-3xl font-bold text-amber-700 mb-6 font-serif border-b-2 border-amber-300 pb-2">
                Appointment
            </h2>
            <div className="w-full max-w-2xl px-4">
                <div className="relative overflow-hidden rounded-xl shadow-2xl border-4 border-amber-100">
                    <img
                        src={images[currentIndex]}
                        alt="Appointment Advertisement"
                        className="w-full h-auto object-cover transition-opacity duration-500 ease-in-out"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdSection;
