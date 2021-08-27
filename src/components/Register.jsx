import React, { useState } from "react";
import axios from "axios";
import { BASE } from "../api";

const Register = ({ setUser }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleInput = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BASE}/api/users/register/`, {
        username: form.username,
        password: form.password,
      });
      console.log(res.data);
      setUser(res.data.user);
      alert("Registration successful, please login!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="forms">
      <form onSubmit={handleSubmit}>
        <div className="register">
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
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
