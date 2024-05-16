import React, { useEffect } from "react";
import Layout from "../NewComponentCSS/Layout";
import classes from "./Intro.module.css";
import Lottie from "lottie-react";
import loader from "../Animation/loader.json";
import { useNavigate } from "react-router-dom";
// import { headerApi } from "../Data/data";
// import axios from "axios";
// import { toast } from "react-toastify";

const Intro12 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/headers");
    }, 1000);
  }, []);

  return (
    <>
      <Layout>
        <div className={classes.main}>
          <div className={classes.image}>
            <img src="/assets/logo.png" alt="" />
          </div>

          <Lottie animationData={loader} className={classes.animation} />
        </div>
      </Layout>
    </>
  );
};

export default Intro12;
