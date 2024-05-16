import React, { useEffect ,useState} from "react";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import classes from "./NotifyPage.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Post from "../Api/Post";
import { login } from "../Data/data";

const NotifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [callCount, setCallCount] = useState(0);

  const showMessage = location?.state?.showMessage;
  const msisdn = location?.state?.msisdn;

  if (!showMessage || !msisdn) {
    navigate("/subscribe");
  }

  const callonBackend = () => {
    let request = { ani: msisdn };

    let promise = Post(login, request);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e);
    });
  };

  const handleResposne = (e) => {
    if (e === 2) {
      // success...
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", 1);
      navigate("/homepage");
    } else if (callCount >= 4) {
      navigate("/subscribe");
    } else {
      setCallCount(callCount + 1);
    }
  };

  useEffect(() => {
    callonBackend();

    const intervalId = setInterval(() => {
      if (!document.hidden) {
        callonBackend();
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

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
                Your subscription is in progress you will notify shortly
              </p>
            </div>
          </div>
        </div>
      </SubLayout>
    </Layout>
  );
};

export default NotifyPage;
