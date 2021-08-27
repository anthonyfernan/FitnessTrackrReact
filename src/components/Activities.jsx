import React from "react";

const Activities = ({ activities }) => {
  return (
    <div className="activities">
      <h2>All Activities</h2>
      {activities.map(({ id, name, description }) => (
        <div key={id} className="activities">
          <p>Name: {name}</p>
          <p>Description: {description}</p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
