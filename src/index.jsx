import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getRoutines, getActivities } from "./api";
import {
  Register,
  Login,
  Main,
  Routines,
  RoutinesForm,
  Activities,
  ActivitiesForm,
} from "./components";
import { getCurrentUser, clearCurrentUser } from "./auth";

const App = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);

  const handleLogout = () => {
    setUser();
    clearCurrentUser();
    window.location.assign("/");
    alert("Logout successful, come back soon!");
  };

  useEffect(() => {
    getRoutines()
      .then((routines) => {
        setRoutines(routines);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  useEffect(() => {
    getActivities()
      .then((activities) => {
        setActivities(activities);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  console.log("This is routines in app", routines);
  console.log("This is activities in app", activities);
  console.log("This is user in the app", user);

  return (
    <Router>
      <nav>
        <div id="title">
          <h1>FitnessTrackr</h1>
        </div>
        <div id="controls">
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          <Link to="/routines">Routines</Link>
          <Link to="/activities">Activities</Link>
          {user && (
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          )}
        </div>
      </nav>
      {user ? (
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/routines">
            <RoutinesForm setRoutines={setRoutines} />
            <Routines
              routines={routines}
              setRoutines={setRoutines}
              setActivities={setActivities}
              activities={activities}
            />
          </Route>
          <Route exact path="/activities">
            <ActivitiesForm setActivities={setActivities} />
            <Activities activities={activities} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>
          <Route exact path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route exact path="/routines">
            <Routines routines={routines} activities={activities} />
          </Route>
          <Route exact path="/activities">
            <Activities activities={activities} />
          </Route>
        </Switch>
      )}
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
