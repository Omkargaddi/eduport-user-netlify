import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import "./Header1.css";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkmode") === "active");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const isActive = !darkMode;
    setDarkMode(isActive);
    localStorage.setItem("darkmode", isActive ? "active" : "null");
  };

  const navigate = useNavigate();
  const { userData, backendUrl, setIsLoggedIn, setUserData } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(`${backendUrl}/logout`);
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
        toast.success("Logout successful");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const SendVerifyEmail = async () => {
    if (userData?.authenticated) {
      toast.error("Already verified");
      navigate("/");
      return;
    }
    try {
      const response = await axios.post(
        `${backendUrl}/verify-email-otp`,
        { email: userData.email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("OTP sent successfully");
        navigate("/email-verify");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  // Short first name
  const getShortName = () => {
    if (!userData?.username) return "";
    const parts = userData.username.split(" ");
    const first = parts[0];
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  };

  // State for controlling offcanvas
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <>
      <Navbar  expand="lg" sticky="top" >
        <Container >
          <Navbar.Brand as={NavLink} to="/">
            <img src="https://eduport-wda-project.s3.eu-north-1.amazonaws.com/designer10.PNG" alt="Logo" className="header-logo" />
          </Navbar.Brand>
         
          <div className="collapse navbar-collapse" style={{justifyContent:"center"}} id="navbarSupportedContent">
            <Nav  >
              {["/", "/course", "/tutorial", "/blog", "/notes","/contact",'/about'].map((path, idx) => {
                const label = ["Home", "Course", "Tutorial", "Blogs", "Notes","Contact",'About Us'][idx];
                return (
                  <Nav.Link key={path} as={NavLink} to={path}>
                    {label}
                  </Nav.Link>
                );
              })}
            </Nav>
            <button
                id="theme-switch"
                onClick={toggleDarkMode}
                className="ms-3"
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="var(--text-color)"
                  >
                    <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="var(--text-color)"
                  >
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                  </svg>
                )}
              </button>
          </div>
           
          <div className="d-flex align-items-center">
            <button
            className="navbar-toggler"
            type="button"
            onClick={() => setShowOffcanvas(true)}
            aria-label="Toggle navigation"
            style={{border:"none"}}
          >
            <i className="bi bi-list" style={{color:"white"}}></i>
          </button>
              {userData ? (
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn dropdown-toggle custom-dropdown-toggle d-flex align-items-center gap-2 rounded-pill"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      backgroundColor: "var(--navbar-primary)",
                      border: "none",
                      boxShadow: "none",
                      fontWeight: "500",
                      fontSize: "1rem",
                    }}
                  >
                    <img
                      src={userData.profileImageUrl || "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp"}
                      alt="Profile"
                      className="profile-thumb"
                    />
                    <span style={{ color: "white" }}>{getShortName()}</span>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow rounded border-0 px-2 py-2"
                    style={{ minWidth: "200px", backgroundColor: "var(--base-color)" }}
                  >
                    <li>
                      <NavLink
                        className="dropdown-item custom-item d-flex align-items-center gap-2"
                        to="/profile"
                      >
                        <span className="custom-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-icon lucide-circle-user"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>
                        </span>
                        Edit profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item custom-item d-flex align-items-center gap-2"
                        to="/mycourses"
                      >
                        <span className="custom-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tv-minimal-play-icon lucide-tv-minimal-play"><path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z"/><path d="M7 21h10"/><rect width="20" height="14" x="2" y="3" rx="2"/></svg>
                        </span>
                        My courses
                      </NavLink>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item custom-item d-flex align-items-center gap-2"
                        onClick={() => console.log("Settings")}
                      >
                        <span className="custom-icon">
                         <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cog-icon lucide-cog"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>
                        </span>
                        Settings
                      </button>
                    </li>
                    {!userData.authenticated && (
                      <li>
                        <button
                          type="button"
                          className="dropdown-item custom-item d-flex align-items-center gap-2"
                          onClick={SendVerifyEmail}
                        >
                          <span className="custom-icon">
                           <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail-check-icon lucide-mail-check"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
                          </span>
                          Verify email
                        </button>
                      </li>
                    )}
                    <li>
                      <NavLink
                        className="dropdown-item custom-item d-flex align-items-center gap-2"
                        to="/support"
                      >
                       <span className="custom-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-info-icon lucide-badge-info"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
                        </span>
                        Support
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" style={{backgroundColor:"var(--secondary-text)"}} />
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item custom-item text-danger d-flex align-items-center gap-2"
                        onClick={handleLogout}
                      >
                        <span className="custom-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                        </span>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <NavLink
                  className="btn btn-primary btn-md px-3 ms-3 d-flex align-items-center gap-2"
                  to="/login"
                  role="button"
                >
                  Login
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="yellow" stroke="yellow" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap-icon lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>
                </NavLink>
              )}
              
            </div>
        </Container>
      </Navbar>

      {/* Offcanvas for small screens */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasMenuLabel">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {["/", "/course", "/tutorial", "/blog", "/notes","/contact",'/about'].map((path, idx) => {
              const label = ["Home", "Course", "Tutorial", "Blog", "Notes","Contact",'About Us'][idx];
              return (
                <Nav.Link
                  key={path}
                  as={NavLink}
                  to={path}
                  onClick={() => setShowOffcanvas(false)}
                >
                  {label}
                </Nav.Link>
              );
            })}
          </Nav>
          <button
            id="theme-switch-offcanvas"
            onClick={() => {
              toggleDarkMode();
              setShowOffcanvas(false); // Closes offcanvas; remove this line if you want it to stay open
            }}
            className="mt-3"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--text-color)"
              >
                <path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="var(--text-color)"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
              </svg>
            )}
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;