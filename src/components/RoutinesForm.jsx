import React, { useState } from "react";
import axios from "axios";
import { getCurrentToken } from "../auth";
import { getRoutines, BASE } from "../api";

const RoutinesForm = ({ user, setRoutines }) => {
  const [form, setForm] = useState({ name: "", goal: "", isPublic: "true" });

  const handleReset = () => {
    setForm({ name: "", goal: "", isPublic: "true" });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${BASE}/api/routines`,
        {
          name: form.name,
          goal: form.goal,
          isPublic: true,
        },
        {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + getCurrentToken(),
          },
        }
      );

      const routineList = await getRoutines();
      console.log("this is routineList", routineList);

      setRoutines(routineList);

      alert("Routine created, noice bro!");
      handleReset();
    } catch (err) {
      alert("This routine already exists!");
      handleReset();
      console.error(err, "Error creating a routine");
    }
  };

  return (
    <div id="routineForm">
      <form onSubmit={handleSubmit}>
        <div className="routinesForm">
          <input
            placeholder="Name the routine"
            name="name"
            value={form.name}
            onInput={handleInput}
          />
          <br />
          <textarea
            placeholder="What is the goal of the routine?"
            name="goal"
            value={form.goal}
            onInput={handleInput}
          />
          <br />
          <button className="submit" type="submit">
            Create Routine
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoutinesForm;
