import React, { useState, useEffect } from "react";
import axios from "axios";
import { getRoutines, BASE } from "../api";

const AddActivity = ({
  setRoutines,
  activitiesCopy,
  setActivityActive,
  id,
}) => {
  const [form, setForm] = useState({ activityId: "", count: "", duration: "" });

  const [selectActivity, setSelectActivity] = useState();

  useEffect(() => {
    setSelectActivity(activitiesCopy[0]);
  }, [activitiesCopy]);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleActivityChange = (e) => {
    e.preventDefault();
    const addedActivityId = e.target.value;
    const finalActivityId = activitiesCopy.find(
      (activity) => activity.id == addedActivityId
    );
    setSelectActivity(finalActivityId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE}/api/routines/${id}/activities`, {
        activityId: selectActivity.id,
        count: form.count,
        duration: form.duration,
      });
      console.log(res.data);
      const routinesList = await getRoutines();
      setRoutines(routinesList);
      alert("Added activity to your routine!");
      handleReset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      setActivityActive("NoActive");
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setForm({ name: "", goal: "", isPublic: "true" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select onChange={handleActivityChange}>
          {activitiesCopy.map((activity) => {
            return (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            );
          })}
        </select>
        <br />
        <input
          placeholder="Count"
          name="count"
          value={form.count}
          onInput={handleInput}
        />
        <br />
        <input
          placeholder="Duration"
          name="duration"
          value={form.duration}
          onInput={handleInput}
        />
        <br />
        <button className="submit" type="submit">
          Add Activity to Routine
        </button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </>
  );
};

export default AddActivity;
