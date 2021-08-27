import React, { useState } from "react";
import axios from "axios";
import { storeCurrentUser } from "../auth";
import { BASE } from "../api";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${BASE}/api/users/login`,

        {
          username: form.username,
          password: form.password,
        }
      );
      storeCurrentUser(res.data.user, res.data.token);
      setUser(res.data.user);
      console.log("this is res.data", res.data);
      alert("Login successful, welcome back!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="forms">
      <form onSubmit={handleSubmit}>
        <div className="login">
          <input
            placeholder="username"
            name="username"
            value={form.username}
            onInput={handleInput}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={form.password}
            onInput={handleInput}
          />
          <button className="submit" type="submit">
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
