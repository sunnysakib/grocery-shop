import React, { useContext, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { userContext } from "../../App";
import "./Login.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import google from "../../icons/Group 573.png";

const Login = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const [newUser, setNewUser] = useState(false);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [user, setUser] = useState({

    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  // HANDLE SIGN IN
  const googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { email, displayName } = result.user;
        const signInInfo = { email: email, name: displayName };
        setLoggedInUser(signInInfo);
        history.replace(from);
        // console.log(signInInfo.email);
      })
      .catch((error) => {
        var email = error.email;
        console.log(email);
      });
  };

  // HANDLE CHANGE
  const handleChange = (e) => {
    let validForm = true;
    if (e.target.name === "email") {
      const validEmail = /\S+@\S+\.\S+/.test(e.target.value);
      validForm = validEmail;
    }
    if (e.target.name === "password") {
      const validPassword =
        e.target.value.length > 6 && /\d{1}/.test(e.target.value);
      validForm = validPassword;
    }

    if (validForm) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    // NEW USER
    if (newUser && user.email && user.password){
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          updateUserName(user.name);
          console.log(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error);
        });
    }
   
    // NOT NEW USER
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          // console.log(res);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
    
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          console.log(error);
        });
    }
  };

  const updateUserName = (name) => {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        //..
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="loginStyle">
      {newUser ? <h3>Create an account</h3> : <h3>Login</h3>}
      <form>
        {newUser && (
          <div class="mb-3">
            <input
              onBlur={handleChange}
              type="text"
              name="name"
              class="form-control"
              id="exampleInputName1"
              placeholder="Name"
            ></input>
          </div>
        )}
        <div>
          <input
            onBlur={handleChange}
            type="email"
            name="email"
            class="form-control"
            id="exampleInputEmail1"
            placeholder={newUser ? "email" : "Username or email"}
            aria-describedby="emailHelp"
          ></input>
          <div id="emailHelp" style={{ color: "red" }} class="form-text">
            <small>{user.error}</small>
          </div>
        </div>
        <div class="mb-3">
          <input
            onBlur={handleChange}
            type="password"
            name="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          ></input>
        </div>
        {!newUser && (
          <div>
            <input type="checkbox" name="newUser" id="" />
            <label htmlFor="newUser">Remember Me</label>
          </div>
        )}
        <input
          className="submitBtn"
          onClick={handleSubmit}
          type="submit"
          value={newUser ? "Sign up" : "Login"}
        />
      </form>
      <label htmlFor="newUser">
        {newUser ? "Already" : "Don't"} have an account?{" "}
        <p className="link" onClick={() => setNewUser(!newUser)} >
          {newUser ? "Login" : "Create an account"}
        </p>
      </label>
      <div className="googleSignInDiv">
        <h6>OR</h6>
        <button className="googleBtn" onClick={googleSignIn}>
          <img src={google} alt="" /> Sign in with google
        </button>
      </div>
    </div>
  );
};

export default Login;

