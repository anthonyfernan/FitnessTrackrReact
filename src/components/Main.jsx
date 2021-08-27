import React from "react";

const Main = () => {
  return (
    <div id="main">
      <h4>Welcome!</h4>
      <h4>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </h4>
    </div>
  );
};

export default Main;
