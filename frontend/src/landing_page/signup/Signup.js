import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setMessage("Signed up successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Something went wrong!");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const handleForgotPassword = () => {
    const email = prompt("Enter your registered email:");
    if (email) {
      alert(`Password reset link sent to: ${email}`);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Signup/Login</h2>

        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <div style={styles.passwordContainer}>
          <input
            style={{ ...styles.input, margin: 0 }}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={togglePassword}
            style={styles.eyeButton}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button style={styles.button} type="submit">
          Signup
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.links}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleForgotPassword();
            }}
            style={styles.linkText}
          >
            Forgot Password?
          </a>
        </p>
        <p style={styles.links}>
          Already have an account?{" "}
          <a href="/login" style={styles.linkText}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "105vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(135deg, #f0f5f5ff, #f1f6f7ff)",
    fontFamily: "Poppins, sans-serif",
  },
  form: {
    backgroundColor: "#fff",
    padding: "3rem 2.5rem",
    borderRadius: "18px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeIn 0.8s ease-in-out",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontWeight: "600",
  },
  input: {
    margin: "10px 0",
    padding: "12px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    marginTop: "10px",
  },
  eyeButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  button: {
    marginTop: "15px",
    padding: "12px 20px",
    backgroundColor: "#5563DE",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#3e4db8",
  },
  message: {
    marginTop: "15px",
    color: "green",
  },
  links: {
    marginTop: "10px",
    color: "#333",
  },
  linkText: {
    color: "#5563DE",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Signup;
