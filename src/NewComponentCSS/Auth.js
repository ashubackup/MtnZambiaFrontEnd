import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../Api/Post";
import { login } from "../Data/data";
import Encode from "../EcodeRequest/Encode";

const Auth = ({ children }) => {

  const { encryptPayload } = Encode();
  const navigate = useNavigate();

  const callonBackend = (number) => {
    let request = { ani: number };
    let encrypt = encryptPayload(request)
    let promise = Post(login, encrypt);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e, number);
    });
  };

  const handleResposne = (e, number) => {
    if (e.status === '404') {
      navigate("/login");
      //billing pending
    } else if (e.status === '200') {
      // user can access the portal...
      return;
    } else if (e === '402' || e.status=== '403') {
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
