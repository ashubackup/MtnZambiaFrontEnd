import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import { login} from "../Data/data";
import Post from "../Api/Post";
import Modal from "../Components/Modal";
import InfoModal from "../Components/InfoModal";
import FailedModal from "../Components/FailedModal";
import Encode from "../EcodeRequest/Encode";
import { enc } from "crypto-js";

const Login = () => {
  const [msisdn, setMsisdn] = useState("");

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [billPending, setBillPending] = useState(false);
  const [alreadysub, setAlreadysub] = useState(false);
  const [open, setOpen] = useState(false);
  const closeHandler = () => {
    setBillPending(false);
    setOpen(false);
  };

  const navigate = useNavigate();

  const { encryptPayload } = Encode();
  const callonBackend = () => {
    if (!msisdn) {
      setOpen(true);
      return;
    }
    if (msisdn.trim().length == 0) {
      setOpen(true);
      return;
    }
    let request = { ani: msisdn };
    let encrypt = encryptPayload(request);
    console.log("Encrypt",encrypt)
    let promise = Post(login, encrypt);
    promise.then((e) => {
      console.log("e::",e)
      handleResposne(e);
    });
  };

  const handleResposne = (e) => {
    console.log("status", typeof e.status)

    if (e.status === "402" || e.status==="403") {
      // alert("Billing is pending");
      setBillPending(true);
      //billing pending
    } else if (e.status === "200") {
      localStorage.setItem("ani", msisdn);
      localStorage.setItem("serviceId", 1);
      //success
      navigate("/homepage");
    } else if (e === "404") {
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
            <img src="/assets/logo.png" alt="mtn" />
          </div>

          <div className={classes.tabs_container}>
            <div className={classes.tabs_sub_container}>
              <div className={classes.tab_1} onClick={() => navigate("/login")}>
                <p className={classes.tab}>Login</p>
              </div>
              <div
                className={classes.tab_2}
                onClick={() => navigate("/subscribe")}
                // onClick={() =>
                //   navigate("/subscribe", {
                //     state: {
                //       msisdn: headerMsisdn,
                //     },
                //   })
                // }
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
                  callonBackend(msisdn);
                }}
                type="button"
                className={classes.subscribe_btn}
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className={classes.footer_container}>
          <div className={classes.footer_sub_container}>
            <img src="/assets/mtn.png" alt="mtn" className={classes.footer} />
            <p className={classes.footer_text}>
              By clicking <strong>subscribe</strong> , you have read, understood
              and agree to be bound by the <strong>Bigcash </strong> service’s{" "}
              <br />
              <strong> Terms & Conditions and FAQ’s </strong>
            </p>
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
      {open && (
        <FailedModal
          open={open}
          text="Please Enter the Number"
          closeHandler={closeHandler}
        />
      )}
    </Layout>
  );
};

export default Login;
