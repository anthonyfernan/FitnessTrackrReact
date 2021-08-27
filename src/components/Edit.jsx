import React, { useState } from "react";
import axios from "axios";
import { getCurrentToken } from "../auth";
import { getRoutines, BASE, getRoutineById } from "../api";

const Edit = ({ setRoutines, name, goal, setEditing, id }) => {
  const [form, setForm] = useState({ name: "", goal: "", isPublic: "true" });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      setEditing("NotActive");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePatch = async (e) => {
    e.preventDefault();
    await getRoutineById(id);

    try {
      const res = await axios.patch(
        `${BASE}/api/routines/${id}`,
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
      console.log("routineLIST INSIDE EDIT", routineList);

      setRoutines(routineList);
      alert("You edited your routine");
      setEditing("NotActive");
    } catch (error) {
      console.error(error);
    }
  };

  try {
    return (
      <>
        {/* <form onSubmit={handleSubmit}> */}
        <form>
          New Name
          <br />
          <input
            placeholder={name}
            name="name"
            value={form.name}
            onInput={handleInput}
          />
          <br />
          New Goal
          <br />
          <input
            placeholder={goal}
            name="goal"
            value={form.goal}
            onInput={handleInput}
          />
          <br />
          {/* <button onClick={() => setEditing("NotActive")}> */}
          {/* ADD ONCLICK HERE FOR PATCH HANDLER */}
          <button onClick={handlePatch}>Submit Changes</button>
          <button onClick={handleEdit}>Cancel</button>
        </form>
      </>
    );
  } catch (error) {
    console.error(error);
  }
};

export default Edit;
