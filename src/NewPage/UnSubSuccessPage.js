import React, { useEffect } from "react";
import classes from "./UnSubSuccessPage.module.css";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import { useLocation, useNavigate } from "react-router-dom";

const UnSubSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location?.state?.show) {
      navigate("/subscribe");
    }
  }, []);
  return (
    <Layout>
      <SubLayout>
        <div className={classes.main}>
          <img
            src="/assets/logo.png"
            alt="mtn"
            style={{ width: "150px", height: "100px", objectFit: "contain" }}
          />
          <div className={classes.message_box_container}>
            <div className={classes.message_box}>
              <p className={classes.message}>
                You have successfully unsubscribed from the service.
              </p>
            </div>
          </div>
        </div>
      </SubLayout>
    </Layout>
  );
};

export default UnSubSuccessPage;
