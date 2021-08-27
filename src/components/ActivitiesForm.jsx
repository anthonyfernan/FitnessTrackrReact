import React, { useState } from "react";
import axios from "axios";
import { getCurrentToken } from "../auth";
import { getActivities, BASE } from "../api";

const ActivitiesForm = ({ setActivities }) => {
  const [form, setForm] = useState({ name: "", description: "" });

  const handleReset = () => {
    setForm({ name: "", description: "" });
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
        `${BASE}/api/activities`,
        {
          name: form.name,
          description: form.description,
        },
        { headers: { Authorization: "Bearer " + getCurrentToken() } }
      );

      const activityList = await getActivities();
      setActivities(activityList);
      alert("Activity created, get swoll!");
      handleReset();
    } catch (error) {
      alert("This activity already exists!");
      console.error(error);
      handleReset();
    }
  };

  return (
    <div id="activityForm">
      <form onSubmit={handleSubmit}>
        <div className="activitiesForm">
          <input
            placeholder="Name the activity"
            name="name"
            value={form.name}
            onInput={handleInput}
          />
          <br />
          <input
            placeholder="Describe the activity"
            name="description"
            value={form.description}
            onInput={handleInput}
          />
          <br />
          <button className="submit" type="submit">
            Create Activity
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivitiesForm;
