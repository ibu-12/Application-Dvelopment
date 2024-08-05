import React from 'react';
import Navbar from './Navbar';
import '../pages/css/HomePage.css';
import image from '../pages/main home.jpg';
import c1 from '../pages/C1.jpg';
import c2 from '../pages/C2.jpg';
import c3 from '../pages/C3.jpg';
import c4 from '../pages/c4.jpg';
import c5 from '../pages/c5.jpg';
import c6 from '../pages/c6.jpg';
import c7 from '../pages/c7.jpg';
import c8 from '../pages/c8.jpg';
import c9 from '../pages/c9.jpg';
import intsa from '../pages/Insta.jpg';
import fb from '../pages/fb.jpg';
import twit from '../pages/twit.jpg';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="home-main-container">
        <img
          src={image}
          alt="Main banner"
          className="home-main-banner"
        />
        <h2 className="home-cards-heading">Featured Collections</h2>
        <div className="home-cards-container">
          <div className="home-card-row">
            <div className="home-card">
              <img src={c1} alt="Card 1" className="home-card-image" />
              <div className="home-card-content">
                <h3>Perfect Fits</h3>
                <p> Enjoy the perfect balance of fashion and function with perfectly fitted clothes.</p>
                <a href="#readmore1" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c2} alt="Card 2" className="home-card-image" />
              <div className="home-card-content">
                <h3>T shirts</h3>
                <p>They come in different styles, colors, and designs, offering a casual and stylish look.</p>
                <a href="#readmore2" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c3} alt="Card 3" className="home-card-image" />
              <div className="home-card-content">
                <h3>Accessories</h3>
                <p>Discover a wide range of trendy accessories to complement your fashion rentals.</p>
                <a href="#readmore3" className="home-read-more-link">Read more</a>
              </div>
            </div>
          </div>
          <div className="home-card-row">
            <div className="home-card">
              <img src={c4} alt="Card 4" className="home-card-image" />
              <div className="home-card-content">
                <h3>Pair Wear</h3>
                <p>Pair Wear offers curated fashion rentals, featuring designer outfits for every occasion. </p>
                <a href="#readmore4" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c5} alt="Card 5" className="home-card-image" />
              <div className="home-card-content">
                <h3>Heavy Clothes</h3>
                <p>
                Discover our selection of heavy clothes for rental, perfect for cold weather and outdoor adventures.</p>
                <a href="#readmore5" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c6} alt="Card 6" className="home-card-image" />
              <div className="home-card-content">
                <h3>Party Wear</h3>
                <p> Choose from stunning dresses, elegant suits, and chic accessories for any celebration.</p>
                <a href="#readmore6" className="home-read-more-link">Read more</a>
              </div>
            </div>
          </div>
          <div className="home-card-row">
            <div className="home-card">
              <img src={c7} alt="Card 7" className="home-card-image" />
              <div className="home-card-content">
                <h3>Combos</h3>
                <p>Discover our fashion combos, perfectly paired outfits for any occasion.</p>
                <a href="#readmore7" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c8} alt="Card 8" className="home-card-image" />
              <div className="home-card-content">
                <h3>Formals</h3>
                <p>Upgrade your professional wardrobe with our formal wear rentals.</p>
                <a href="#readmore8" className="home-read-more-link">Read more</a>
              </div>
            </div>
            <div className="home-card">
              <img src={c9} alt="Card 9" className="home-card-image" />
              <div className="home-card-content">
                <h3>Cost Effecient</h3>
                <p>Access designer outfits and high-quality garments without the high price tags.</p>
                <a href="#readmore9" className="home-read-more-link">Read more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="home-info-section">
          <div className="home-info-column">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#shipping">Shipping</a></li>
            </ul>
          </div>
          <div className="home-info-column">
            <h4>Company Info</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
          <div className="home-info-column">
            <h4>Follow Us</h4>
            <div className="home-social-links">
              <a href="insta"><img src={intsa} alt="Facebook" /></a>
              <a href="#twitter"><img src={fb} alt="Twitter" /></a>
              <a href="#instagram"><img src={twit} alt="Instagram" /></a>
            </div>
          </div>
        </div>
        <footer className="home-footer">
          <p>Contact us at: <a href="mailto:support@fashionrental.com">support@fashionrental.com</a></p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
