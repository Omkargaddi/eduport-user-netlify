import { NavLink } from "react-router-dom";
import './Footer.css'

const Footer = () => (
  <footer className="footer-section py-5" id="footer">
    <div className="container" >
      <div className="row">
        {/* Main Links */}
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h5 className="footer-title">Main</h5>
          <ul className="list-unstyled footer-list">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/about">Work With Us</NavLink></li>
            <li><NavLink to="/support">Support</NavLink></li>
          </ul>
        </div>

        {/* Learn Links */}
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h5 className="footer-title">Learn</h5>
          <ul className="list-unstyled footer-list">
            <li><NavLink to="/course">Courses</NavLink></li>
            <li><NavLink to="/tutorial">Tutorials</NavLink></li>
            <li><NavLink to="/notes">Notes</NavLink></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="col-6 col-md-3 mb-4 mb-md-0">
          <h5 className="footer-title">Legal</h5>
          <ul className="list-unstyled footer-list">
            <li><NavLink to="/terms">Terms</NavLink></li>
            <li><NavLink to="/privacy">Privacy</NavLink></li>
            <li><NavLink to="/refund">Refund</NavLink></li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="col-6 col-md-3">
          <h5 className="footer-title">Social</h5>
          <ul className="list-unstyled footer-list social-list">
            <li>
              <a href="https://github.com/yourprofile" target="_blank" rel="noreferrer">
                <i className="bi bi-github me-2" style={{fontSize:"20px"}}></i>GitHub
              </a>
            </li>
            <li>
              <a href="https://twitter.com/yourprofile" target="_blank" rel="noreferrer">
                <i className="bi bi-twitter me-2" style={{fontSize:"20px"}}></i>Twitter (X)
              </a>
            </li>
            <li>
              <a href="https://youtube.com/yourchannel" target="_blank" rel="noreferrer">
                <i className="bi bi-youtube me-2" style={{fontSize:"20px"}}></i>YouTube
              </a>
            </li>
            <li>
              <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer">
                <i className="bi bi-facebook me-2" style={{fontSize:"20px"}}></i>Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Made with ❤️ */}
      <div className="text-center mt-4 made-with">
        Made with <span className="text-danger">❤️</span> and <span className="text-secondary">☕</span> in India
      </div>
    </div>
  </footer>
);

export default Footer;
