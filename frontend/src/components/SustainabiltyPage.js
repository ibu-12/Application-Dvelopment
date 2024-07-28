import React from 'react';
import Navbar from './Navbar';
import '../pages/css/SustainabilityPage.css';
import sustainabilityImage1 from '../pages/c5.jpg'; // Replace with the actual image path
import sustainabilityImage2 from '../pages/C1.jpg'; // Replace with the actual image path
import sustainabilityImage3 from '../pages/C2.jpg'; // Replace with the actual image path

const SustainabilityPage = () => {
  return (
    <div>
      <Navbar />
      <div className="sustainability-container">
        <img src={sustainabilityImage1} alt="Sustainability" className="sustainability-main-image" />
        <h2 className="sustainability-heading">In Circular Fashion</h2>
        <p className="sustainability-content">
          Our platform is designed to foster a circular economy in the fashion industry. By promoting the lending and borrowing of clothes, we aim to reduce waste and extend the lifecycle of garments.
        </p>
        
        <div className="sustainability-section">
          <h3>By lending and borrowing your wardrobe, you can support a more circular process</h3>
          <p>
             Participating in a circular fashion system means that clothes are used for as long as possible, then recycled back into the economy, instead of ending up as waste. This practice not only benefits the environment but also promotes sustainable fashion practices.
          </p>
        </div>

        <div className="sustainability-div">
          <div className="sustainability-text-left">
            <p className="sustainability-bold-text">
              Renting clothes instead of buying is a great way to lower your environmental impact.
              
            </p>
            <p>Think of it like this— the more you put in, the more you get back. The circular economy is restorative and regenerative by design, so you have more freedom to refresh your wardrobe without feeling guilty for how unkind you might be to the Earth. By sharing, you're making a statement about who you are with your style and your commitment to the planet. #BuyLessBorrowMore

Not creating waste has been a core belief at Tulerie - we have never provided packaging for a single shipment. We encourage our members to ship items in reusable garment bags and hangers, reuse packaging, go plastic-less, and sustainably clean their items between rentals.</p>
          </div>
          <div className="sustainability-image-right">
            <img src={sustainabilityImage2} alt="Environmental Impact" />
          </div>
        </div>

        <div className="sustainability-div">
          <div className="sustainability-image-left">
            <img src={sustainabilityImage3} alt="Vacation" />
          </div>
          <div className="sustainability-text-right">
            <p>
              I was so excited to use Tulerie for the last vacation I went on. It was a sustainable and affordable way to get to have some new designer pieces in my wardrobe without the guilt. Their curation has been very elevated from the beginning and they have quickly become my go-to for events as well. I love supporting women-owned companies and the idea of peer-to-peer sharing of closets helps build a really beautiful and like-minded community.
            </p>
          </div>
        </div>

        <div className="sustainability-we-love">
          <h3>We love RewearAble!</h3>
          <p>
            RewearAble is a concept that embraces sustainability in fashion. By reusing and recycling clothes, we can significantly reduce the environmental impact of the fashion industry. Join us in our mission to make fashion more sustainable and accessible for everyone.
          </p>
        </div>

        <footer className="sustainability-footer">
          <p>Contact us at: <a href="mailto:support@fashionrental.com">support@fashionrental.com</a></p>
        </footer>
      </div>
    </div>
  );
};

export default SustainabilityPage;
