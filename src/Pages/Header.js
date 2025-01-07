import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../NewComponentCSS/Layout";
import classes from "../NewPage/Intro.module.css";
import Lottie from "lottie-react";
import loader from "../Animation/loader.json";
import { login } from "../Data/data";
import Post from "../Api/Post";
import Encode from "../EcodeRequest/Encode";

const Header = () => {
  
  const { encryptPayload } = Encode(); // Correctly access the encryptPayload function

  const [msisdn, setMsisdn] = useState("");

  const navigate = useNavigate();

  const callonBackend = (number,ext_ref) => {
    let request = { ani: number };
    let encryptedRequest = encryptPayload(request);
    console.log("headerEncrypt",encryptedRequest)
    let promise = Post(login, encryptedRequest);
    console.log("promise",promise);
    promise.then((e) => {
      handleResposne(e, number,ext_ref);
    });
  };

  const handleResposne = (e, number,ext_ref) => {
    if (e.status === "404") {
      navigate(`/subscribe?extId=${ext_ref}`, {
        state: {
          msisdn: number,
        },
      });
      //billing pending
    } else if (e.status === "200") {
      localStorage.setItem("ani", number);
      localStorage.setItem("serviceId", 1);
      //success
      navigate("/homepage");
    }
    else {
      //billing pending
      // alert("Billing is ");
      navigate(`/subscribe?extId=${ext_ref}`, {
        state: {
          msisdn: number,
        },
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const msisdnParam = urlParams.get("msisdn");

    /* FROM HEADER GET THE EXT_REF */
    const ext_ref = urlParams.get("extId");

    localStorage.setItem("extId",ext_ref);
    if (msisdnParam) {
      callonBackend(msisdnParam,ext_ref);
    } else if (ext_ref) {
      
    /* IF EXT_REF IS THERE THAN NAVIGATE TO SUBSCRIBE PAGE WITH QUERY EXT_REF=value */
      navigate(`/subscribe?extId=${ext_ref}`, {
        state: {
          msisdn: msisdn,
        },
      });
    } else {
    /* ELSE NAVIGATE TO JUST SUBSCRIBE IT WILL AUTOMATICALLY TAKE EXT_REF VALUE AS NULL */
      navigate(`/subscribe`, {
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
          <img
            src="/assets/logo.png"
            alt=""
            style={{ width: "150px", height: "150px", objectFit: "contain" }}
          />
        </div>

        <Lottie animationData={loader} className={classes.animation} />
        <div className={classes.footer_container}>
          <div className={classes.footer_sub_container}>
            <img src="/assets/mtn.png" alt="mtn" className={classes.footer} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Header;
