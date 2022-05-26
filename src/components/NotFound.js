import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <p>Sorry to disappoint but that page doesn't seem to exist</p>
      <p>Please try another link or return to Home</p>
      <Link to="/messages">Go back to home page</Link>
    </>
  );
};

export default NotFound;
