import { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
   const [otp, setOtp] = useState("");
  const { getUserData, isLoggedIn, userData, backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true;

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    pasteData.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });

    const nextIndex = pasteData.length < 5 ? pasteData.length : 5;
    inputRef.current[nextIndex]?.focus();
  };

   const onSubmitEmail = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const response = await axios.post(`${backendUrl}/forgot-password-otp`, {
         email,
       });
 
       toast.success(response.data || "Password reset OTP sent successfully");
       setIsEmailSent(true);
     } catch (error) {
       let errorMessage = "Something went wrong. Please try again.";
       if (axios.isAxiosError(error) && error.response) {
         errorMessage = error.response.data || errorMessage;
       }
       toast.error(errorMessage);
     }finally{
       setLoading(false);
     }
   };

  const handleVerify = (e) => {
    e.preventDefault();
    setLoading(true);

    const otp = inputRef.current.map((input) => input.value).join("");
 if(otp.length != 6){
  toast.error("Please enter valid OTP");
   setLoading(false);
  return;
 }

    setTimeout(() => {
        setOtp(otp);
      setIsOtpSubmitted(true);
      setLoading(false);
    }, 2000);
  };

   const onSubmitNewPassword = async (e) => {
     e.preventDefault();
     setLoading(true);
     try {
       const response = await axios.post(`${backendUrl}/reset-password`, {
         email,
         otp,
         newPassword,
       });
 
       toast.success(response.data || "Password reset successfully");
       navigate("/login");
     } catch (error) {
       let errorMessage = "Something went wrong. Please try again.";
       if (axios.isAxiosError(error) && error.response) {
         errorMessage = error.response.data || errorMessage;
       }
       toast.error(errorMessage);
       setIsEmailSent(true);
       setIsOtpSubmitted(false);
     }finally{
       setLoading(false);
     }
   };
  return (
    <div
      className="email-verify-container d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(90deg, #6a5af9, #8268f9)",
        border: "none",
      }}
    >
      {/* Reset Email Card */}
      {!isEmailSent && (
        <div className="card shadow-sm rounded-4 p-4 bg-white" style={{ maxWidth: "400px", width: "100%" }}>
          <h4 className="text-center mb-2 text-dark">Reset Your Password</h4>
          <p className="text-center text-muted mb-4">
            Enter your registered email address to receive a reset link.
          </p>

          <form onSubmit={onSubmitEmail}>
            <div className="input-group mb-4">
              <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-4">
                <i className="bi bi-envelope-fill text-primary"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 rounded-end-pill"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ height: "50px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill" disabled={loading}>
              {loading ? (
                <><Spinner size="sm" /> Sending...</>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        </div>
      )}

      {/* OTP Card */}
      {isEmailSent && !isOtpSubmitted && (
        <div className="card shadow-sm rounded-4 p-4 bg-white" style={{ maxWidth: "400px", width: "100%" }}>
          <h4 className="text-center mb-2 text-dark">Enter OTP</h4>
          <p className="text-center text-muted mb-4">
            A 6-digit code was sent to your email.
          </p>
          <form onSubmit={handleVerify}>
            <div className="d-flex justify-content-center gap-2 mb-4">
              {[...Array(6)].map((_, index) => (
      <input
        key={index}
        type="text"
        maxLength={1}
        ref={(el) => (inputRef.current[index] = el)}
        className="form-control text-center fw-bold otp-input"
        style={{
          width: "45px",
          height: "50px",
          fontSize: "20px",
          borderRadius: "8px",
          border: "1px solid #ced4da"
        }}
        onChange={(e) => {
          if (e.target.value.length === 1 && index < 5) {
            inputRef.current[index + 1].focus();
          } else if (e.target.value.length === 0 && index > 0) {
            inputRef.current[index - 1].focus();
          }
        }}
        onPaste={handlePaste}
                />
              ))}
            </div>
            <button type="submit" className="btn btn-success w-100 py-2 rounded-pill" disabled={loading}>
              {loading ? (
                <><Spinner size="sm" /> Verifying...</>
              ) : (
                "Verify OTP"
              )}
            </button>
          </form>
        </div>
      )}

      {/* New Password Card */}
      {isEmailSent && isOtpSubmitted && (
        <div className="card shadow-sm rounded-4 p-4 bg-white" style={{ maxWidth: "400px", width: "100%" }}>
          <h4 className="text-center mb-2 text-dark">Set New Password</h4>
          <p className="text-center text-muted mb-4">
            Enter your new password below.
          </p>

          <form onSubmit={onSubmitNewPassword}>
            <div className="input-group mb-4">
              <span className="input-group-text bg-light border-end-0 rounded-start-pill ps-4">
                <i className="bi bi-lock-fill text-primary"></i>
              </span>
              <input
                type="password"
                className="form-control border-start-0 rounded-end-pill"
                placeholder="********"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ height: "50px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill" disabled={loading}>
              {loading ? (
                <><Spinner size="sm" /> Resetting...</>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
