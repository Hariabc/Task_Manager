import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../api/authApi";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await signup({ name, email, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign Up</h2>
          <p>Create an account to start managing tasks.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form-inner">
          <div>
            <label htmlFor="signup-name">Name</label>
            <input
              id="signup-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your full name"
            />
          </div>
          <div>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="•••••••• (min. 6 characters)"
            />
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit">Sign Up</button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
