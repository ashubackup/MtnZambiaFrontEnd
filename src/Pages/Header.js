import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../NewComponentCSS/Layout";
import classes from "../NewPage/Intro.module.css";
import Lottie from "lottie-react";
import loader from "../Animation/loader.json";
import { login } from "../Data/data";
import Post from "../Api/Post";

const Header = () => {
  const [msisdn, setMsisdn] = useState("");
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
      navigate("/subscribe", {
        state: {
          msisdn: number,
        },
      });
      //billing pending
    } else if (e === 2) {
      localStorage.setItem("ani", number);
      localStorage.setItem("serviceId", 1);
      //success
      navigate("/homepage");
    } else if (e === 3) {
      // alert("Billing is pending");
      // not sub redirect to subscription page
      navigate("/subscribe", {
        state: {
          msisdn: number,
        },
      });
      // navigate("/subscribe");
    } else {
      //billing pending
      // alert("Billing is ");
      navigate("/subscribe", {
        state: {
          msisdn: number,
        },
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const msisdnParam = urlParams.get("msisdn");
    console.log(msisdnParam, "msp");
    if (msisdnParam) {
      callonBackend(msisdnParam);
      //   setMsisdn(msisdnParam);
      // navigate("/login", {
      //   state: {
      //     msisdn: msisdnParam,
      //   },
      // });
    } else {
      navigate("/subscribe", {
        state: {
          msisdn: msisdn,
        },
      });
    }
  }, []);
  return (
    <Layout>
      <div className={classes.main}>
        <div className={classes.image}>
          <img src="/assets/logo.png" alt="" />
        </div>

        <Lottie animationData={loader} className={classes.animation} />
      </div>
    </Layout>
  );
};

export default Header;
