import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerify = () => {
  const inputRef = useRef([]);
  const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
  const { getUserData, isLoggedIn, userData, backendUrl, setUserData } =
    useContext(AppContext);
  const navigate = useNavigate();

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

    const nextIndex = pasteData.length < 6 ? pasteData.length : 5;
    inputRef.current[nextIndex]?.focus();
  };

  // OTP verification
       const handleVerify = async (e) => {
         e.preventDefault();
         setLoading(true);
         const otp = inputRef.current
           .filter((input) => input !== null)
           .map((input) => input.value)
           .join("");
       
         if (otp.length !== 6) {
           toast.error("Please enter a valid OTP");
           return;
         }
         try {
           const response = await axios.post(`${backendUrl}/verify-email`, { email: userData.email, otp });
       
           toast.success("Email verified successfully");
           navigate("/");
           const data = await getUserData();
           setUserData(data);
         } catch (error) {
           console.log(error);
           let errorMessage = "An error occurred while verifying the OTP";
           if (axios.isAxiosError(error) && error.response) {
             errorMessage = error.response.data || errorMessage;
           }
           toast.error(errorMessage);
         }finally{
           setLoading(false);
         }
       };
     

      // Resend OTP
      const handleResend = async () => {
        setLoading2(true);
      if(userData.authenticated) {
        toast.error("Admin already registred");
        navigate('/');
      }
        try {
          await axios.post(`${backendUrl}/verify-email-otp`, { email: userData.email });
          toast.success("OTP resent successfully");
        } catch (error) {
          toast.error("Failed to resend OTP");
        } finally{
          setLoading2(false)
        }
      };
  return (
    <div
  className="d-flex align-items-center justify-content-center vh-100 vw-100"
  style={{ background: "linear-gradient(90deg, #6a5af9, #8268f9)" }}
>
  <div
    className="bg-white shadow rounded-4 p-5"
    style={{ maxWidth: "420px", width: "100%" }}
  >
    <div className="text-center mb-4">
      <i className="bi bi-shield-lock-fill text-primary fs-2"></i>
      <h4 className="mt-2 fw-bold text-dark">Verify Your Email</h4>
      <p className="text-muted mb-0">Enter the 6-digit code sent to your inbox</p>
    </div>

    <div className="d-flex justify-content-center gap-2 my-4">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRef.current[index] = el)}
          className="form-control text-center otp-input"
          style={{
            width: "48px",
            height: "52px",
            fontSize: "20px",
            fontWeight: "bold",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            transition: "0.2s ease-in-out"
          }}
          onChange={(e) => {
            if (e.target.value.length === 1 && index < 5) {
              inputRef.current[index + 1]?.focus();
            } else if (e.target.value.length === 0 && index > 0) {
              inputRef.current[index - 1]?.focus();
            }
          }}
          onPaste={handlePaste}
        />
      ))}
    </div>

    <button
      className="btn btn-primary w-100 rounded-pill py-2 fw-semibold"
      onClick={handleVerify}
      disabled={loading}
    >
      {loading ? "Verifying..." : "Verify Code"}
    </button>

    <div className="text-center mt-3">
      <small className="text-muted">
        Didn’t get the code? <a href="#" className="text-decoration-none">Resend</a>
      </small>
    </div>
  </div>
</div>

  );
};

export default EmailVerify;
