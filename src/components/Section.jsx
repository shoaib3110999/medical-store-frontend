import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import miya from '../assets/miya.png';
import pain from '../assets/pain.jpeg';
import taviz from '../assets/taviz.jpeg';
import AdSection from './AdSection';

const Section = () => {
  const today = new Date();

  const gregorianDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const hijriDate = today.toLocaleDateString('en-US-u-ca-islamic-umalqura', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className='padding px-4 md:px-8 max-w-7xl mx-auto'>

      <div className='image-title'>
        <div className='w-full md:w-40- aspect-video'>
          <iframe className='w-full h-full rounded-xl shadow-lg'
            src="https://www.youtube.com/embed/sNIBRWqZeUA?si=YyNYxnY8UGsZ9rPg"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <div className='w-full md:w-50- text-width px-4'>
          <h1 className='text-3xl md:text-5xl font-bold'>Hazrat Miyan Huzoor Damat Barakatuhum Al-Aliya</h1>
          <br />
          <h4 className='text-base md:text-lg'>Sheikh al-Mashayikh, Peer of the Path(Tareeqat), Hakim Sufi Shaykh Tariq Ahmed Shah Arif Usmani Hasani Qadiri Suhrawardi, Chishti Qalandari Abul-Ulai Naqshbandi Mujaddidi Madari Shattari Firdosi Nizami Sabri Jahangiri Shadhili.</h4>
          <br />
          <Link to="/miya">
            <button className='bg-amber-600 p-4 rounded-3xl text-white font-bold hover:bg-amber-700 transition-colors'>About Miya Huzoor</button>
          </Link>
        </div>
      </div>

      <div className='image-title'>
        <div className='w-full md:w-50- text-width px-4 md:order-1 order-2'>
          <h1 className='text-3xl md:text-5xl font-bold'>Photo Gallery</h1>
          <br />
          <h4 className='text-base md:text-lg'>Photo Gallery of TJRCI – A glimpse into our journey, events, and milestones captured through the lens.</h4>
          <br />
          <button className='bg-amber-600 p-4 rounded-3xl w-full md:w-60 text-white font-bold hover:bg-amber-700 transition-colors'>Click here to view gallery</button>
        </div>
        <div className='w-full md:w-40- md:order-2 order-1'>
          <img className='rounded-xl shadow-lg w-full h-auto' src={miya} alt="Hazrat shiakh Tariq Ahmad Shazli Suharwardi" />
        </div>
      </div>

      <div>
        <h3>Calender</h3>
      </div>

      <div className='celender'>
        <div className='celender-1 ' >
          <h6>English (Gregorian) Date</h6>
          <br />
          <p>{gregorianDate}</p>
        </div>
        <div className='celender-1'>
          <h6>Islamic (Hijri) Date</h6>
          <br />
          <p>{hijriDate} AH</p>
        </div>
      </div>

      <AdSection />


      <div className='m-auto items-center justify-start md:justify-center overflow-x-auto flex pt-5 pb-5 gap-5 mb-12 px-4 no-scrollbar'>
        <div className='card-overflow flex-shrink-0'>
          <img className='card-overflow-image h-100' src={pain} alt="" />
          <Link to="/medicines">
            <div className='flex items-center pl-4 py-2 bg-white rounded-b-xl'>
              <div className='font-bold'>Medicines</div>
              <div className='ml-2'><FaArrowRight /></div>
            </div>
          </Link>
        </div>
        <div className='card-overflow flex-shrink-0'>
          <img className='card-overflow-image' src={taviz} alt="" />
          <Link to="/naqsh">
            <div className='flex items-center pl-4 py-2 bg-white rounded-b-xl'>
              <div className='font-bold'>Naqsh</div>
              <div className='ml-2'><FaArrowRight /></div>
            </div>
          </Link>
        </div>
      </div>

      <br />



    </div>
  )
}

export default Section;