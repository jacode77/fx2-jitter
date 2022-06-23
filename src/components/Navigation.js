import { AppBar, Toolbar, Typography, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getMyMessages } from "../services/messagesServices";
import { useGlobalState } from "../utils/stateContext";

const Navigation = () => {
  const { store, dispatch } = useGlobalState();
  const { loggedInUser } = store;
  // Must keep hook out of the function
  const navigate = useNavigate();
  // setup proper logout functionality
  const logout = (e) => {
    e.preventDefault();
    // need to clear sessionStorage so the user session doesn't persist. Clear is a better option to clear both the loggedin user and token
    sessionStorage.clear();
    // sessionStorage.removeItem("username");
    // clears/modifies state
    dispatch({
      type: "setLoggedInUser",
      data: null,
    });
    dispatch({
      type: "setToken",
      data: null,
    });
    // redirects to /messages once logged out
    navigate("/messages");
  };

  const myMessages = () => {
    getMyMessages()
      .then((messages) => {
        // triggers the reducer to display the data
        dispatch({
          type: "setMessageList",
          data: messages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppBar position="sticky">
      <Typography variant="h4">Jitter</Typography>
      <Toolbar>
        <Tabs value={false}>
          <Tab label="Home" component={Link} to="/messages" />
          <Tab label="About" component={Link} to="/about" />
          {loggedInUser && (
            <Tab label="New message" component={Link} to="/messages/new" />
          )}
          {loggedInUser && (
            <Tab
              label="My messages"
              component={Link}
              onClick={myMessages}
              to="/messages/mymessages"
            />
          )}
          {loggedInUser && (
            <Tab
              label="Logout"
              onClick={logout}
              component={Link}
              to="/messages"
            />
          )}
          {!loggedInUser && <Tab label="Login" component={Link} to="/login" />}
          {!loggedInUser && (
            <Tab label="Signup" component={Link} to="/signup" />
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
