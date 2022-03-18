import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/Item";

const Register = () => {
  // const history = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  // onChange inputs
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  // register onSubmit
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/user/register`, {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log(res.data);
      setUser({ username: "", email: "", password: "" });
      setErr(res.data.msg);
      // history("/admin");
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="main-container">
          <h3> Login for Admin </h3>

          <div className="login-center">
            <form onSubmit={registerSubmit}>
              <p> {err} </p>

              <label htmlFor="username">Username</label>
              <input
                value={user.username}
                onChange={onchangeInput}
                type="text"
                placeholder="import username..."
                name="username"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                value={user.email}
                onChange={onchangeInput}
                type="email"
                placeholder="import email..."
                name="email"
                id="Email"
                required
              />

              <label htmlFor="password">Pasword</label>
              <input
                value={user.password}
                onChange={onchangeInput}
                type="password"
                placeholder="import password..."
                name="password"
                required
              />

              <div className="login-btn">
                <button type="submit">Register</button>

                <Link to="/">
                  <button> Home </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* register */}
    </div>
  );
};

export default Register;
