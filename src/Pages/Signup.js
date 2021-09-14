import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import { UserContext } from "../Context/UserContext";
import { Redirect } from "react-router";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const context = useContext(UserContext);

  const handleSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({ email: res.user.email, uid: res.user.uid });
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, { type: "error" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup();
  };

  if (context.user?.uid) {
    return <Redirect to="/Home" />;
  }

  return (
    <div className="grid align__item">
      <div className="register">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="site__logo"
          width="56"
          height="84"
          viewBox="77.7 214.9 274.7 412"
        >
          <defs>
            <linearGradient id="a" x1="0%" y1="0%" y2="0%">
              <stop offset="0%" stop-color="#8ceabb" />
              <stop offset="100%" stop-color="#378f7b" />
            </linearGradient>
          </defs>
          <path
            fill="url(#a)"
            d="M215 214.9c-83.6 123.5-137.3 200.8-137.3 275.9 0 75.2 61.4 136.1 137.3 136.1s137.3-60.9 137.3-136.1c0-75.1-53.7-152.4-137.3-275.9z"
          />
        </svg>

        <h2>Sign Up</h2>

        <form action="" method="post" className="form" onSubmit={handleSubmit}>
          <div className="form__field">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@mailaddress.com"
            />
          </div>

          <div className="form__field">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
            />
          </div>

          <div className="form__field">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
