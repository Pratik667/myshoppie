import "./Login.css";
import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios"; // Import Axios

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("Welcome to JinStore");

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  // If token exists, redirect to dashboard
  if (token) {
    return <Navigate to="/dashboard" />;
  }

const handleGoogleLogin = async (credentialResponse, event) => {
    if (event && event.preventDefault) event.preventDefault();

    setError("");
    setLoading(true);
    console.log("Google login success:", credentialResponse);

    try {
      const response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/register-sso",
        { credential: credentialResponse.credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAlertMsg(response.data.message);
      setOpen(true);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code outside 2xx
        setError(error.response.data.message); // This will be "User already exists"
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server.");
        console.log(error.request);
      } else {
        // Something else happened
        setError("Error in Registering the user.");
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };


  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state
    setError("");
    setLoading(true); // Start loading
    let response;
    try {
      response = await axios.post(
        "https://ukkh4uvf1d.execute-api.eu-north-1.amazonaws.com/api/users/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } },
      );
      // Success: status is 2xx
      setAlertMsg(response.data.message);
      setOpen(true);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // The request was made and the server responded with a status code outside 2xx
        setError(error.response.data.message); // This will be "User already exists"
        console.log(error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server.");
        console.log(error.request);
      } else {
        // Something else happened
        setError("Error in Registering the user.");
        console.log(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="register-page">
        <div className="login-container">
          <h2 className="login-heading">Register</h2>
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
             <p className="separator">(or)</p>
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          handleGoogleLogin(credentialResponse);
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
            <div className="goto-link m-2 ml-0">
              Already an User? <Link to="/login">Login</Link>
            </div>
          </form>
          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}
        </div>
      </section>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className="productcard-dialog"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ mt: 5 }}>{alertMsg}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => navigate("/login")}>
            Okay
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default Register;
