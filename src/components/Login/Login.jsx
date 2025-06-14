import "./Login.css";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const resetFields = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleToggleMode = () => {
    setIsCreateAccount(prev => !prev);
    resetFields();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting, isCreateAccount=", isCreateAccount);
    setLoading(true);

    try {
      if (isCreateAccount) {
        // --------- Registration Flow ---------
        if(!email.endsWith("@gmail.com")){
          toast.warning("Use Gmail for registration");
          setEmail("");
          setPassword("");
          return;
        }
        if(password.length<6){
          toast.warning("Password must be minimum 6 characters long");
          setPassword("");
          return;
        }
        const response = await axios.post(`${backendUrl}/register`, {
          username: name,
          email,
          password,
        });

        if (response.status >= 200 && response.status < 300) {
          toast.success("Account created successfully.");

          
          try {
            const loginRes = await axios.post(`${backendUrl}/login`, {
              email,
              password,
            });
            if (loginRes.status === 200) {
              setIsLoggedIn(true);
              await getUserData();
              navigate("/");
              toast.success("Logged in after registration");
            } else {
              navigate("/login");
              resetFields();
            }
          } catch (loginError) {
            navigate("/login");
            toast.info("Please login to continue");
            resetFields();
          }
        } else {
          toast.error(response.data || "Registration failed");
          resetFields();
        }
      } else {
        if(password.length<6){
          toast.warning("Password must be minimum 6 characters long");
          setPassword("");
          return;
        }
        const response = await axios.post(`${backendUrl}/login`, {
          email,
          password,
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          await getUserData();
          navigate("/");
          toast.success("Login successful");
        } else {
          toast.error("Invalid email or password. Try again");
          resetFields();
        }
      }
    } catch (error) {
      // Log for debugging
      console.error("Auth error:", error.response || error);
      const msg = error.response?.data || "An error occurred";
      toast.error(msg);
      resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100 vw-100"
      style={{
        background: "linear-gradient(90deg, #6a5af9, #8268f9)",
        padding: "1rem",
      }}
    >
      <div
        className="bg-white shadow-lg rounded-4 p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="text-center mb-4">
          <img src='https://eduport-wda-project.s3.eu-north-1.amazonaws.com/designer8.png' alt="Eduport Logo" width={60} className="mb-2" />
          <h4 className="fw-bold login-header">
            {isCreateAccount ? "Create Account" : "Login to Eduport"}
          </h4>
        </div>

        <form onSubmit={onSubmitHandler}>
          {isCreateAccount && (
            <div className="mb-3">
              <label htmlFor="name" className="login-form-label fw-semibold">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter full name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="login-form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="login-form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          {!isCreateAccount && (
            <div className="mb-3 text-end">
              <NavLink
                to="/reset-password"
                className="text-decoration-none small"
              >
                Forgot Password?
              </NavLink>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold d-flex align-items-center justify-content-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Processing...
              </>
            ) : isCreateAccount ? (
              "Create Account"
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-0 small login-p">
            {isCreateAccount ? "Already have an account?" : "Don't have an account?"}
            {/* Use a button type="button" so it never submits form */}
            <button
              type="button"
              className="btn btn-link p-0 ms-1 fw-semibold"
              onClick={handleToggleMode}
              style={{ textDecoration: "underline" }}
            >
              {isCreateAccount ? "Login here" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
