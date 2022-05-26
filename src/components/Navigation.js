import { Link, useNavigate } from "react-router-dom";

const Navigation = ({ loggedInUser, activateUser }) => {
  // Must keep hook out of the function
  const navigate = useNavigate();
  // setup proper logout functionality
  const logout = (e) => {
    e.preventDefault();
    // clears/modifies state
    activateUser("");
    // redirects to /messages once logged out
    navigate("/messages");
  };

  return (
    <nav>
      <Link to="/messages">Home</Link>
      <Link to="/about">About</Link>
      {loggedInUser ? (
        <>
          {/* Provides logged in users access to 'New Message' */}
          <Link to="/messages/new">New Message</Link>
          {loggedInUser}
          <Link to="/messages" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          Guest
          <Link to="/login">Login</Link>
          {/* Since we don't have a backend setup yet, keep as link to '/login' */}
          <Link to="/login">Sign up</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
