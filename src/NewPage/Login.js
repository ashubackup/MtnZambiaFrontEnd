import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import { login } from "../Data/data";
import Post from "../Api/Post";
import Modal from "../Components/Modal";
import InfoModal from "../Components/InfoModal";

const Login = () => {
  const location = useLocation();
  const [msisdn, setMsisdn] = useState("");

  useEffect(() => {
    const msisdn_from_header = location?.state?.msisdn;
    console.log(location, "location...state...");
    setMsisdn(msisdn_from_header);
  }, [location]);
  const [openModal, setOpenModal] = useState(false);
  const [billPending, setBillPending] = useState(false);
  const [alreadysub, setAlreadysub] = useState(false);
  const closeHandler = () => {
    setBillPending(false);
  };

  // console.log("msisdb",msisdn)

  const navigate = useNavigate();

  const callonBackend = () => {
    let request = { ani: msisdn };

    let promise = Post(login, request);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e);
    });
  };

  const handleResposne = (e) => {
    if (e === 1) {
      // alert("Billing is pending");
      setBillPending(true);
      //billing pending
    } else if (e === 2) {
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", 1);
      //success
      navigate("/homepage");
    } else if (e === 3) {
      // alert("Billing is pending");
      // not sub redirect to subscription page
      setOpenModal(true);
      // navigate("/subscribe");
    } else {
      //billing pending
      // alert("Billing is ");
      setBillPending(true);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Layout>
      <SubLayout>
        <div className={classes.main}>
          <div className={classes.logo}>
            <img src="/assets/logo.png" alt="" />
          </div>

          <div className={classes.tabs_container}>
            <div className={classes.tabs_sub_container}>
              <div className={classes.tab_1} onClick={() => navigate("/login")}>
                <p className={classes.tab}>Login</p>
              </div>
              <div
                className={classes.tab_2}
                onClick={() => navigate("/subscribe")}
              >
                <p className={classes.tab}>Subscribe</p>
              </div>
            </div>
          </div>

          <div className={classes.form_container}>
            <form
              className={classes.form}
              //    onSubmit={submitHandler}
            >
              <div className={classes.input_group}>
                <span className={classes.country_code}>+260</span>
                <input
                  className={classes.input}
                  type="number"
                  placeholder="ENTER YOUR PHONE NUMBER"
                  value={msisdn}
                  onChange={(e) => setMsisdn(e.target.value)}
                ></input>
              </div>

              <button
                onClick={() => {
                  callonBackend();
                }}
                type="button"
                className={classes.subscribe_btn}
              >
                Login
              </button>
            </form>
          </div>
          <div className={classes.footer_container}>
            <div className={classes.footer_sub_container}>
              <img src="/assets/mtn.png" alt="mtn" className={classes.footer} />
              <p className={classes.footer_text}>
                By clicking <strong>subscribe</strong> , you have read,
                understood and agree to be bound by the{" "}
                <strong>Bigcash </strong> service’s <br />
                <strong> Terms & Conditions and FAQ’s </strong>
              </p>
            </div>
          </div>
        </div>
      </SubLayout>
      {billPending && (
        <InfoModal
          subscriptionModal={false}
          billModal={false}
          billPending={billPending}
          closeHandler={closeHandler}
        />
      )}
      <Modal open={openModal} closeHandler={closeModal} />
    </Layout>
  );
};

export default Login;
