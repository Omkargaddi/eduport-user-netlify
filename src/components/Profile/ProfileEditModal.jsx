import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "bootstrap";
import "./ProfileEditModal.css";
import { toast } from "react-toastify";
import axios from "axios";

const ProfileEditModal = ({ onClose, userData, setUserData, backendUrl }) => {
  const modalRef = useRef(null);
  const bsModalInstance = useRef(null);
  const fileInputRef = useRef(null);

  const [editableName, setEditableName] = useState(userData?.username || "");
  const [address, setAddress] = useState(userData?.address || "");
  const [instagram, setInstagram] = useState(userData?.instagram || "");
  const [facebook, setFacebook] = useState(userData?.facebook || "");
  const [twitter, setTwitter] = useState(userData?.twitter || "");
  const [linkedIn, setLinkedIn] = useState(userData?.linkedIn || "");
  const [profileImage, setProfileImage] = useState(
    userData?.profileImageUrl || ""
  );
  const [profileFile, setProfileFile] = useState(null);

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;
    bsModalInstance.current = new Modal(modalEl, {
      backdrop: true,
      keyboard: true,
    });
    bsModalInstance.current.show();
    const handleHidden = () => {
      onClose();
    };
    modalEl.addEventListener("hidden.bs.modal", handleHidden);

    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
      if (bsModalInstance.current) {
        bsModalInstance.current.dispose();
      }
    };
  }, [onClose]);

  const hideModal = () => {
    if (bsModalInstance.current) {
      bsModalInstance.current.hide();
      setTimeout(() => {
        onClose();
      }, 200);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setProfileImage(objectUrl);
      setProfileFile(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const profileData = {
        username: `${editableName}`,
        address: address,
        instagram: instagram,
        facebook: facebook,
        twitter: twitter,
        linkedIn: linkedIn,
        email: userData.email,
        role: userData.role,
      };
      formData.append("profile", JSON.stringify(profileData));

      if (profileFile) {
        formData.append("file", profileFile);
      } else {
        formData.append("file", new Blob([])); // empty file fallback
      }

      const response = await axios.post(
        `${backendUrl}/profile-edit`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const result = response.data;
      console.log(result);
      setUserData({
        ...userData,
        username: result.username,
        profileImageUrl: result.profileImageUrl,
        address: result.address,
        instagram: result.instagram,
        facebook: result.facebook,
        twitter: result.twitter,
        linkedIn: result.linkedIn,
      });

      toast.success("Profile updated successfully");
      hideModal();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      console.log("Profile update process completed.");
    }
  };

  const modalContent = (
    <div className="modal fade" tabIndex="-1" aria-hidden="true" ref={modalRef} >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{ zIndex: "2000" }}
      >
        <div className="modal-content p-4" style={{backgroundColor:"var(--base-color2)"}}>
          {/* Header */}
          <div className="modal-header border-0">
            <div>
              <h5 className="modal-title">Edit Personal Information</h5>
              <p className=" mb-0">
                Update your details to keep your profile up-to-date.
              </p>
            </div>
  <button
  type="button"
  className="btn-close"
  aria-label="Close"
  onClick={hideModal}
/>

          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Profile Image Section */}
            <div className="d-flex flex-column align-items-center mb-4">
              <div className="profile-image-wrapper mb-3">
                <img
                  src={profileImage || "https://eduport-wda-project.s3.eu-north-1.amazonaws.com/defaultUser.webp"}
                  alt="Profile Preview"
                  className="rounded-circle profile-edit-img"
                />
              </div>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                style={{backgroundColor:"var(--base-btn)", color:"var(--base-color)"}}
              >
                Change image
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="d-none"
                onChange={handleImageChange}
              />
            </div>

            {/* Social Links Section */}
            <div className="row g-3">
              <h5>Social Links</h5>
              <div className="col-md-6">
                <label
                  htmlFor="facebookInput"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Facebook
                </label>
                <input
                  type="text"
                  id="facebookInput"
                  name="facebook"
                  onChange={(e) => setFacebook(e.target.value)}
                  value={facebook}
                  className="form-control"
                  placeholder={
                    userData.facebook === null || userData.facebook === ""
                      ? "Enter facebook profile-link..."
                      : ""
                  }
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="xInput"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  X.com
                </label>
                <input
                  type="text"
                  id="xInput"
                  name="twitter"
                  onChange={(e) => setTwitter(e.target.value)}
                  value={twitter}
                  className="form-control"
                  placeholder={
                    userData.twitter === null || userData.twitter === ""
                      ? "Enter twitter ( X ) profile-link..."
                      : ""
                  }
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="linkedinInput"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  LinkedIn
                </label>
                <input
                  type="text"
                  id="linkedinInput"
                  name="linkedIn"
                  onChange={(e) => setLinkedIn(e.target.value)}
                  value={linkedIn}
                  className="form-control"
                  placeholder={
                    userData.linkedIn === null || userData.linkedIn === ""
                      ? "Enter linkedIn profile-link..."
                      : ""
                  }
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="instagramInput"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Instagram
                </label>
                <input
                  type="text"
                  id="instagramInput"
                  name="instagram"
                  onChange={(e) => setInstagram(e.target.value)}
                  value={instagram}
                  className="form-control"
                  placeholder={
                    userData.instagram === null || userData.instagram === ""
                      ? "Enter instagram profile-link..."
                      : ""
                  }
                />
              </div>
            </div>

            {/* Personal information */}
            <div className="row g-3 mt-4">
              <h5>Personal information</h5>
              <div className="col-md-6 col-lg-12">
                <label
                  htmlFor="usernameInput"
                  className="form-label"
                  style={{ fontWeight: "600" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter user fullname..."
                  value={editableName}
                  onChange={(e) => setEditableName(e.target.value)}
                />

                <div className="col-md-6 col-lg-12">
                  <label
                    htmlFor="addressInput"
                    className="form-label mt-3"
                    style={{ fontWeight: "600" }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter current address..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <label
                    htmlFor="bioInput"
                    className="form-label mt-3"
                    style={{ fontWeight: "600" }}
                  >
                    Bio
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=""
                    value="User"
                    disabled
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <label
                    htmlFor="emailverifiedInput"
                    className="form-label mt-3"
                    style={{ fontWeight: "600" }}
                  >
                    Email Verified
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={userData.authenticated ? "Verified" : "Not verified"}
                    disabled
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={hideModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const portalRoot = document.getElementById("portal");
  if (!portalRoot) return null;

  return ReactDOM.createPortal(modalContent, portalRoot);
};

export default ProfileEditModal;
