import React, { useEffect, useState } from "react";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import classes from "./NotifyPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../Api/Post";
import { login } from "../Data/data";
import Encode from "../EcodeRequest/Encode";

const NotifyPage = () => {

  const {encryptPayload} = Encode();
  const location = useLocation();
  const navigate = useNavigate();
  const [callCount, setCallCount] = useState(0);
  const [isRequestPending,setIsRequestPending]=useState(false);

  const showMessage = location?.state?.showMessage;
  const msisdn = location?.state?.msisdn;

  // if (!showMessage || !msisdn) {
  //   navigate("/subscribe");
  // }

  const callonBackend = () => {
    let request = { ani: msisdn };
let encrypt = encryptPayload(request);
    setIsRequestPending(true);
    let promise = Post(login, encrypt);
    promise.then((e) => {
      setIsRequestPending(false);
      setCallCount((prevValue)=>prevValue+1)
      handleResposne(e);
    });
  };

  const handleResposne = (e) => {
    if (e.status === '200') {
      // success...
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", 1);
      navigate("/homepage");
    } else if (callCount >= 1) {
      navigate("/login");
    } 
    else{
      return;
    }
    // else {
    //   setCallCount(callCount + 1);
    // }
  };

  useEffect(() => {
    if (msisdn) {
      // setTimeout(() => {
      //   callonBackend();
      // }, 10000);
  
      const intervalId = setInterval(() => {
        if (!document.hidden && !isRequestPending) {
          callonBackend();
        }
      }, 10000);
      return () => clearInterval(intervalId);
    }
    else{
      navigate("/subscribe");
    }
  }, [msisdn,isRequestPending]);

  return (
    <Layout>
      <SubLayout>
        <div className={classes.main}>
          <div className={classes.logo}>
            <img src="/assets/logo.png" alt="" />
          </div>
          <div className={classes.message_box_container}>
            <div className={classes.message_box}>
              <p className={classes.message}>
              Your subscription is in progress you will be redirected shortly.
              </p>
            </div>
          </div>
        </div>
      </SubLayout>
    </Layout>
  );
};

export default NotifyPage;
