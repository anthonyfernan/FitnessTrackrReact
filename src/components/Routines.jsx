import React, { useState } from "react";
import { destroyRoutine, getRoutines, getActivities } from "../api";
import { getCurrentUser } from "../auth";
import { Edit, AddActivity } from "./";

const Routines = ({ routines, setRoutines, setActivities, activities }) => {
  const user = getCurrentUser();

  const [editing, setEditing] = useState("NotActive");
  const [activityActive, setActivityActive] = useState("NotActive");

  const activitiesCopy = activities;
  const routinesCopy = routines;

  const handleDelete = async (e) => {
    try {
      await destroyRoutine(e.target.id);
      const routinesList = await getRoutines();
      setRoutines(routinesList);
      alert("You deleted your routine sucessfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="routines">
      <h2>All Routines</h2>
      {routines.map(({ id, name, goal, creatorName, activities }) => (
        <div key={id} className="routines">
          <h3>Routine Name: {name}</h3>
          <h4>Goal: {goal}</h4>
          <h5>Activities:</h5>
          {activities.map(({ id, name, description, count, duration }) => (
            <div key={id} className="routineActivities">
              <p>Name: {name}</p>
              <p>Description: {description}</p>
              <p>Count: {count}</p>
              <p>Duration: {duration}</p>
            </div>
          ))}
          <p>Created by: {creatorName}</p>
          {user.username === creatorName ? (
            <>
              <div>
                <button onClick={handleDelete} type="button" id={id}>
                  Delete
                </button>

                <button
                  onClick={() => setEditing("Active")}
                  type="button"
                  id={`editId${id}`}
                  key={`editKey${id}`}
                >
                  Edit
                </button>

                {editing === "Active" && (
                  <Edit
                    routines={routines}
                    activities={activities}
                    setRoutines={setRoutines}
                    setEditing={setEditing}
                    id={id}
                    name={name}
                    goal={goal}
                  />
                )}

                <button
                  onClick={() => setActivityActive("Active")}
                  type="button"
                  id={`activityId${id}`}
                  key={`activityKey${id}`}
                >
                  + Activity
                </button>

                {activityActive === "Active" && (
                  <AddActivity
                    setRoutines={setRoutines}
                    activitiesCopy={activitiesCopy}
                    routinesCopy={routinesCopy}
                    activities={activities}
                    setActivityActive={setActivityActive}
                    id={id}
                  />
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </div>
  );
};

export default Routines;
