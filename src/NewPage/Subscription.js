import React, { useState, useEffect } from "react";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import classes from "./Subscription.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import Post from "../Api/Post";
import { subreq } from "../Data/data";
import InfoModal from "../Components/InfoModal";
import { toast } from "react-toastify";
import FailedModal from "../Components/FailedModal";

const Subscription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [msisdn, setMsisdn] = useState("");
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

  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const msisdn_from_header = location?.state?.msisdn;
    console.log(msisdn_from_header, "location...state...");
    setMsisdn(msisdn_from_header);
  }, [location]);

  const closeHandler = () => {
    setSubscriptionModal(false);
    setBillModal(false);
    setAlreadysub(false);
    setOpen(false);
  };

  // console.log(margin)

  // const options={"Daily K350"}
  // const handleInputChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  // };

  const getSubData = () => {
    console.log("msisdn", msisdn);
    console.log("selected option", selectedOption);
    if (!msisdn || !selectedOption) {
      setOpen(true);
      return;
    }
    let request = { ani: msisdn, pack: selectedOption };
    let promise = Post(subreq, request);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e);
    });
  };
  const handleResposne = (e) => {
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
  };

  return (
    <Layout>
      <SubLayout>
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

          <div className={classes.form_container}>
            <form
              className={classes.form}
              //  onSubmit={submitHandler}
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

              <div className={classes.radio_btns}>
                <div className={classes.radio_btn}>
                  <input
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

              {/* <Select
                isSearchable={false}
                className={classes.selector}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "black",
                    color: "white",
                    height: "3rem",
                    fontSize: "1.5rem",
                    fontFamily: "Inter,sans-serif",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    fontSize: "1.3rem",
                  }),
                  placeholder: (baseStyles) => ({
                    ...baseStyles,
                    color: "white",
                    fontSize: "1.3rem",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected ? "#019FE340" : "#fff",
                    color: state.isSelected ? "#172A6E" : "#172A6E",
                    cursor: "pointer",
                  }),
                }}
                value={selectedOption}
                onChange={handleInputChange}
                options={options}
                placeholder="Select Package"
                onMenuOpen={() => setMargin(true)}
                onMenuClose={() => {
                  setMargin(false);
                }}
              /> */}

              <button
                type="button"
                onClick={() => {
                  getSubData();
                }}
                className={`${
                  margin ? classes.subscribe_btn_down : classes.subscribe_btn
                }`}
              >
                Subscribe
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

        {(subscriptionModal || billModal || alreadysub) && (
          <InfoModal
            subscriptionModal={subscriptionModal}
            billModal={billModal}
            alreadysub={alreadysub}
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
