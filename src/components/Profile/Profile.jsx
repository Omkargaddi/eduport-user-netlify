import { useContext, useState, useEffect } from "react";
import "./Profile.css";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";




const Profile = () => {
  const [profileModal, setProfileModal] = useState(false);


  const { userData, setUserData, backendUrl } = useContext(AppContext);
  if (!userData) {
    return (
      <>
       
        <h3>loading profile....</h3>
     
      </>
    );
  }

  return (
    <>
    <div style={{backgroundColor:"var(--base-color)"}}>
      <div className="container py-4" >
        <div className="mb-3">
          <nav
            aria-label="breadcrumb "
            style={{
              display: "flex",
              justifyContent: "flex-end",
              "--bs-breadcrumb-divider": "'>'",
            }}
          >
            <ol className="breadcrumb bg-transparent p-0 mb-0">
              <li className="breadcrumb-item">
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "var(--text-color)" }}
                >
                  Home
                </Link>
              </li>
              <li
                className="breadcrumb-item active"
                aria-current="page"
                style={{ color: "var(--secondary-text)" }}
              >
                Profile
              </li>
            </ol>
          </nav>
          <h4 className="fw-bold mt-2">Profile</h4>
        </div>

        <div className="card shadow-sm border-0 mb-4" style={{backgroundColor:"var(--base-color2)"}}>
          <div className="card-body">
  <div className="d-flex flex-column flex-md-row align-items-center">
    <img
      src={userData.profileImageUrl ? userData.profileImageUrl : "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp"}
      alt="Profile"
      className="rounded-circle me-md-3 mb-3 mb-md-0 profile-img"
    />
    <div className="flex-grow-1 text-center text-md-start">
      <h5 className="mb-1 fw-semibold">
        {userData.username?.split(" ")[0]?.charAt(0).toUpperCase() +
          userData.username?.split(" ")[0]?.slice(1).toLowerCase() +
          " " +
          userData.username?.split(" ")[1]?.charAt(0).toUpperCase() +
          userData.username?.split(" ")[1]?.slice(1).toLowerCase()}
      </h5>
      <p className="mb-2  small">
        User &nbsp;|&nbsp;
        {userData.address ? userData.address : "fill your address..."}
      </p>
    </div>

    <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-end align-items-center mt-2 mt-md-0">
      <Link to={userData.facebook || "#"} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-facebook social-icon"></i>
      </Link>
      <Link to={userData.twitter || "#"} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-twitter-x social-icon"></i>
      </Link>
      <Link to={userData.linkedIn || "#"} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-linkedin social-icon"></i>
      </Link>
      <Link to={userData.instagram || "#"} target="_blank" rel="noopener noreferrer">
        <i className="bi bi-instagram social-icon"></i>
      </Link>
      <button
        className="btn btn-md ms-2 px-3 py-1"
        onClick={() => setProfileModal(true)}
        style={{backgroundColor:"var(--base-btn)", color:"var(--base-color)"}}
      >
        <i className="bi bi-pencil"></i> Edit
      </button>
    </div>
  </div>
</div>

        </div >

        <div className="card shadow-sm border-0" style={{backgroundColor:"var(--base-color2)"}}>
          <div className="card-body">
            <h5 className="fw-bold mb-3">Personal Information</h5>
            <div className="row mb-3">
              <div className="col-md-6">
                <p className=" mb-1">First Name</p>
                <p className="fw-semibold">
                  {" "}
                  {userData.username?.split(" ")[0]?.charAt(0).toUpperCase() +
                    userData.username?.split(" ")[0]?.slice(1).toLowerCase()}
                </p>
              </div>
              <div className="col-md-6">
                <p className=" mb-1">Last Name</p>
                <p className="fw-semibold">
                  {userData.username?.split(" ")[1]?.charAt(0).toUpperCase() +
                    userData.username?.split(" ")[1]?.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-flex flex-column">
                <p className=" mb-1">Email address</p>
                <div className="d-flex align-items-center gap-3">
                  <p className="fw-semibold mb-0">{userData.email}</p>
                  {userData.authenticated ? (
        <i
          
          className="bi bi-check-circle-fill text-success"
          style={{ cursor: "pointer" }}
          
        ></i>
      ) : (
        <i
          className="bi bi-exclamation-triangle-fill text-warning"
          style={{ cursor: "pointer" }}
          
        ></i>
      )}
                </div>
              </div>
              <div className="col-md-6">
                <p className=" mb-1">Bio</p>
                <p className="fw-semibold">User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
      {profileModal && (
        <ProfileEditModal
          onClose={() => setProfileModal(false)}
          userData={userData}
          setUserData={setUserData}
          backendUrl={backendUrl}
        />
      )}
    </>
  );
};

export default Profile;
