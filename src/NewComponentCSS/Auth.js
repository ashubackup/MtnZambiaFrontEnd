import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Api/Post";
import { login } from "../Data/data";

const Auth = ({ children }) => {
  const navigate = useNavigate();

  const callonBackend = (number) => {
    let request = { ani: number };

    let promise = Post(login, request);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e, number);
    });
  };

  const handleResposne = (e, number) => {
    if (e === 1) {
      navigate("/login");
      //billing pending
    } else if (e === 2) {
      // user can access the portal...
      return;
    } else if (e === 3) {
      // alert("Billing is pending");
      navigate("/login");
    } else {
      //billing pending
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("ani")) {
      callonBackend(localStorage.getItem("ani"));
    } else {
      navigate("/login");
    }
  }, []);
  return <>{children}</>;
};

export default Auth;
