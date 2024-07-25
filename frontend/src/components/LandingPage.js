import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import '../pages/css/LandingPage.css';
import aboutUsImage from '../pages/main home.jpg'; // Ensure this image is present
import slide1 from '../pages/C1.jpg'; // Ensure this image is present
import slide2 from '../pages/C2.jpg'; // Ensure this image is present
import slide3 from '../pages/C3.jpg'; // Ensure this image is present

const LandingPage = () => {
  const user = useSelector((state) => state.user);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [slide1, slide2, slide3];
  
  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <Navbar />
      <div className="landing-container">
        <div className="landing-slideshow-container">
          <div className="landing-slide-container">
            <img
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="landing-slide-image"
            />
            <button className="landing-prev" onClick={prevSlide}>
              &#10094;
            </button>
            <button className="landing-next" onClick={nextSlide}>
              &#10095;
            </button>
          </div>
        </div>

        <div className="landing-about-us-section">
          <h2>About Us</h2>
          <div className="landing-about-us-content">
            <img src={aboutUsImage} alt="About Us" className="landing-about-us-image" />
            <div className="landing-about-us-text">
              <p>
                We are a dedicated platform that aims to revolutionize the way people access fashion. Our goal is to provide a sustainable and cost-effective way for everyone to enjoy the latest trends without contributing to the environmental impact of fast fashion. Join us in making fashion more sustainable and accessible for all.
              </p>
            </div>
          </div>
        </div>

        <div className="landing-why-us-section">
          <h2>Why Us</h2>
          <div className="landing-why-us-content">
            <div className="landing-why-us-column">
              <h3>Quality</h3>
              <p>We provide high-quality fashion items to ensure you look your best.</p>
            </div>
            <div className="landing-why-us-column">
              <h3>Trust</h3>
              <p>Trusted by thousands of customers worldwide.</p>
            </div>
            <div className="landing-why-us-column">
              <h3>Sizes</h3>
              <p>Available in a wide range of sizes to fit everyone.</p>
            </div>
            <div className="landing-why-us-column">
              <h3>Colors</h3>
              <p>A variety of colors to match your style and preferences.</p>
            </div>
          </div>
        </div>

        <footer className="landing-footer">
          <p>Contact us at: <a href="mailto:support@fashionrental.com">support@fashionrental.com</a></p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
