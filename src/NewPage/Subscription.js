import React, { useState, useEffect, useRef } from "react";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import classes from "./Subscription.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Post from "../Api/Post";
import { evinaApi, subreq } from "../Data/data";
import InfoModal from "../Components/InfoModal";
import { toast, ToastContainer } from "react-toastify";
import FailedModal from "../Components/FailedModal";
import CryptoJS from "crypto-js";
import axios from "axios";
import Lottie from "lottie-react";
import loader from "../Animation/loader.json";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import Encode from "../EcodeRequest/Encode";

const Subscription = () => {
  const { encryptPayload } = Encode(); // Correctly access the encryptPayload function
  const navigate = useNavigate();
  const location = useLocation();
  const [msisdn, setMsisdn] = useState("");
  const [extRef, setExtRef] = useState("");
  const [loading, setLoading] = useState(false);

  const [options, setOptions] = useState([
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Monthly", label: "Monthly" },
  ]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [margin, setMargin] = useState(false);
  const [subscriptionModal, setSubscriptionModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [alreadysub, setAlreadysub] = useState(false);

  const [errorModal, setErrorModal] = useState(false);

  const [uuid, setUuid] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const [open, setOpen] = useState(false);

  const [subscribeLoading, setSubscribeLoading] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ext_ref = urlParams.get("extId");
    setExtRef(ext_ref);
    const msisdn_from_header = location?.state?.msisdn;
    setMsisdn(msisdn_from_header);
    getEvinaScript();
  }, [location]);

  // const checkEvinaScript = async (e) => {
  //   e.preventDefault();
  //   if (!msisdn || !selectedOption) {
  //     setOpen(true);
  //     return;
  //   }
  //   try {
  //     setSubscribeLoading(true);
  //     const response = await axios.get(
  //       `${evinaCheckApi}?uuid=${uuid}&timestamp=${timestamp}`
  //     );
  //     if (response?.data?.ft == "1000" && response?.data?.success == true) {
  //       getSubData();
  //     } else {
  //       setSubscribeLoading(false);
  //       toast.error("Error Subscribing , please try again later...");
  //     }
  //   } catch (error) {
  //     setSubscribeLoading(false);
  //     toast.error(
  //       error?.response?.data?.message ||
  //         error?.data?.message ||
  //         error?.message ||
  //         error
  //     );
  //   }
  // };

  // const getEvinaScript = async () => {
  //   try {
  //     const response = await axios.post(evinaApi);
  //     setUuid(response?.data?.uuid);
  //     setTimestamp(response?.data?.timestamp);
  //     const jsonObject = JSON.parse(response?.data?.Response);
  //     const sValue = jsonObject.s;

  //     let scriptContent = sValue;

  //     if (scriptContent) {
  //       const existingScript = document.getElementById("evina-script");
  //       if (existingScript) {
  //         existingScript.remove();
  //       }


  //       let top_head = document.getElementsByTagName("head")[0];
  //       let anti_script = document.createElement("script");

  //       anti_script.id = "evina-script";
  //       anti_script.innerHTML = scriptContent;
  //       top_head.insertBefore(anti_script, top_head.firstChild);

  //       var event = new Event("DCBProtectRun");
  //       document.dispatchEvent(event);
  //       document.addEventListener("gateway-load", (event) => {
  //         //Enable form submission
  //         setLoading(false);
  //       });
  //     }
  //   } catch (error) {
  //     toast.error(
  //       error?.response?.data?.message ||
  //         error?.data?.message ||
  //         error?.message ||
  //         error
  //     );
  //   }
  // };


  const getEvinaScript = async () => {
    try {
      setLoading(true);
      const response = await axios.post(evinaApi);
      setUuid(response?.data?.uuid);
      setTimestamp(response?.data?.timestamp);
      const jsonObject = JSON.parse(response?.data?.Response);

      const sValue = jsonObject.s;

      let scriptContent = sValue;

      console.log({jsonObject,sValue,scriptContent},'data')

      if (scriptContent) {
        const existingScript = document.getElementById("evina-script");
        if (existingScript) {
          existingScript.remove();
        }


        let top_head = document.getElementsByTagName("head")[0];
        let anti_script = document.createElement("script");

        anti_script.id = "evina-script";
        anti_script.innerHTML = scriptContent;
        top_head.insertBefore(anti_script, top_head.firstChild);

        var event = new Event("DCBProtectRun");
        document.dispatchEvent(event);
        document.addEventListener("gateway-load", (event) => {
          //Enable form submission
          setLoading(false);
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  const closeHandler = () => {
    setSubscriptionModal(false);
    setBillModal(false);
    setAlreadysub(false);
    setOpen(false);
    setErrorModal(false);
  };

  const getSubData = (e) => {
    e.preventDefault();
    if (!msisdn || !selectedOption) {
      setOpen(true);
      return;
    }
    setSubscribeLoading(true);
 
    let request = {
      ani: msisdn,
      pack: selectedOption,
      extId: extRef ? extRef : null,
      uuid: uuid,
      timestamp: timestamp,
      // hash: hash,
    };
    let encrypt = encryptPayload(request);


    // let promise = Post("http://192.168.1.23:9765/subReq", request);
    let promise = Post(subreq, encrypt);
    promise
      .then((e) => {
        setSubscribeLoading(false);
        console.log("e:::S",e)
        handleResposne(e);
      })
  };
  const handleResposne = (e) => {
    console.log(":e",e)
    if (e == "Request failed with status code 403") {
      setErrorModal(true);
    }
    if (e === 0) {
      //message
      // setSubscriptionModal(true);
      navigate("/notify", {
        state: {
          showMessage: true,
          msisdn: msisdn,
        },
      });
    } else if (e === 1) {
      //already subscribe
      setAlreadysub(true);

      // navigate("/homepage");
    } else if (e === 4) {
      setAlreadysub(true);
      //already subscribed
    } else if (e === 2) {
      // Billing Failed
      setBillModal(true);
    }
    else{
      console.log("skjdsfhjs")
      setErrorModal(true);
    }
  };

  return (
    <Layout>
      <SubLayout>
        <ToastContainer />
        <div className={classes.main}>
          <div className={classes.logo}>
            <img src="/assets/logo.png" alt="logo" />
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

          {loading ? (
            <Lottie animationData={loader} className={classes.animation} />
          ) : (
            <>
              <div className={classes.form_container}>
                {/* <form className={classes.form} onSubmit={checkEvinaScript}> */}
                <form className={classes.form} onSubmit={getSubData}>
                  <div className={classes.input_group}>
                    <span className={classes.country_code}>+260</span>
                    <input
                      className={classes.input}
                      type="number"
                      placeholder="ENTER YOUR PHONE NUMBER"
                      value={msisdn}
                      required
                      onChange={(e) => setMsisdn(e.target.value)}
                    ></input>
                  </div>

                  <div className={classes.radio_btns}>
                    <div className={classes.radio_btn}>
                      <input
                        required
                        className={classes.radio}
                        type="radio"
                        id="daily"
                        name="fav_language"
                        value="Daily"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <label className={classes.label} for="daily">
                        Daily K2.5
                      </label>
                    </div>
                    <div className={classes.radio_btn}>
                      <input
                        className={classes.radio}
                        type="radio"
                        id="weekly"
                        name="fav_language"
                        value="Weekly"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <label className={classes.label} for="daily">
                        Weekly K5
                      </label>
                    </div>
                    <div className={classes.radio_btn}>
                      <input
                        className={classes.radio}
                        type="radio"
                        id="monthly"
                        name="fav_language"
                        value="Monthly"
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      <label className={classes.label} for="daily">
                        Monthly K15
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    // onClick={() => {
                    //   // getSubData();
                    //   checkEvinaScript();
                    // }}
                    className={`${
                      margin
                        ? classes.subscribe_btn_down
                        : classes.subscribe_btn
                    }`}
                    id="cta_button"
                    disabled={subscribeLoading}
                  >
                    {subscribeLoading ? (
                      <span className={classes.spinner}></span>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
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

        {(subscriptionModal || billModal || alreadysub || errorModal) && (
          <InfoModal
            subscriptionModal={subscriptionModal}
            billModal={billModal}
            alreadysub={alreadysub}
            errorModal={errorModal}
            closeHandler={closeHandler}
          />
        )}
        {open && (
          <FailedModal
            open={open}
            text="Please fill out all the details including Number and Pack"
            closeHandler={closeHandler}
          />
        )}
      </SubLayout>
    </Layout>
  );
};

export default Subscription;
