import React, { useState, useRef } from 'react';

import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, phone, subject, message };
    console.log('Contact form submitted:', formData);

    // Reset form (optional)
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');

    // Optionally show a success message
    alert('Message sent! (Check console for details)');
  };

  return (
   <div style={{backgroundColor:"var(--base-variant)", padding:"4px"}}>
     <div className="contact-container">
      <div className="contact-info">
        <div>
          <h2>Contact Us</h2>
          <p>
            We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!
          </p>
          <p>
            You can also contact us at{' '}
            <a href="mailto:contact@codewithharry.com" className="email-link">
              contact@codewithharry.com
            </a>{' '}
            for any payment or course access related queries.
          </p>
        </div>
        <div className="contact-image-wrapper">
          <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/contact.png" alt="Contact Us" />
        </div>
      </div>

      {/* Right form section */}
      <div className="contact-form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-phone">Phone Number</label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="Your 10-digit Indian Number"
              pattern="[0-9]{10}"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              placeholder="Type your message here."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="submit-btn"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
   </div>
  );
};

export default Contact;
