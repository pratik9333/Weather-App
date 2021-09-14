import "./App.css";

//ReactRouter
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

//Firebase
import firebase from "firebase/app";
import "firebase/auth";

//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

//Pages
import SignUp from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import PageNotFound from "./Pages/PageNotFound";

//Conponent
import Navbar from "./Components/Navbar";

//UserContext
import { UserContext } from "./Context/UserContext";

//Use State
import { useState } from "react";

//FireBase Config
import firebaseconfig from "./Config/Firebase_Config";

firebase.initializeApp(firebaseconfig);

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <ToastContainer />
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Switch>
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/" component={SignUp} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
