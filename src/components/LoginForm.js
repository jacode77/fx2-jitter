import { useState } from "react";

const LoginForm = ({ activateUser }) => {
  const initialFormData = {
    user: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  //   updates the user with each letter typed. Functions combine user/password
  const handleFormData = (e) => {
    // console.log(e.target.name);
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // sets the click event on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("you clicked submit");
    console.log(formData);
    activateUser(formData.user);
    // cleanup -> resets form after submit
    setFormData(initialFormData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="text"
            name="user"
            id="user"
            value={formData.user}
            onChange={handleFormData}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleFormData}
          />
        </div>
        <input type="submit" value="Login" />
      </form>
    </>
  );
};

export default LoginForm;
