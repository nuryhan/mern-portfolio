import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Register from "./Register";
import api from "../../api/Item";
import { AppContext } from "../context/GlobalContext";

const Login = () => {
  const state = useContext(AppContext);
  const [isLogin, setIsLogin] = state.isLogin;
  const history = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState("");

  // onChange inputs
  const onchangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErr("");
  };

  // login onSubmit
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/user/login`, {
        email: user.email,
        password: user.password,
      });
      // console.log(res.data);
      setUser({ username: "", email: "", password: "" });

      localStorage.setItem("tokenStore", res.data.token);

      setIsLogin(true);

      setErr(res.data.msg);

      history("/admin");
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="login">
        <div className="main-container">
          <h3> Login for Admin </h3>

          <div className="login-center">
            <form onSubmit={loginSubmit}>
              <p> {err}</p>

              <label htmlFor="email">Email</label>
              <input
                value={user.email}
                onChange={onchangeInput}
                type="email"
                placeholder="import email..."
                name="email"
                id="email"
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
                <button type="submit">Login</button>

                <Link to="/">
                  <button> Home </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* register */}
      {/* <Register /> */}
    </>
  );
};

export default Login;
