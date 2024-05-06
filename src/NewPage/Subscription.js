import React, { useState } from "react";
import Layout from "../NewComponentCSS/Layout";
import SubLayout from "../NewComponentCSS/SubLayout";
import classes from "./Subscription.module.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Post from "../Api/Post";
import { subreq } from "../Data/data";
import InfoModal from "../Components/InfoModal";

const Subscription = () => {
  const navigate = useNavigate();
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
  const [alreadysub,setAlreadysub] = useState(false);

  const closeHandler = () => {
    setSubscriptionModal(false);
    setBillModal(false);
    setAlreadysub(false);
  };

  // console.log(margin)

  // const options={"Daily K350"}
  const handleInputChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const getSubData = () => {
    console.log("msisdn", msisdn);
    console.log("selected option", selectedOption.value);
    let request = { ani: msisdn, pack: selectedOption.value };
    let promise = Post(subreq, request);
    promise.then((e) => {
      console.log("e ", e);
      handleResposne(e);
    });
  };
  const handleResposne = (e) => {
    if (e === 0) {
      //message
      setSubscriptionModal(true);
    } else if (e === 1) {
      //already subscribe
      navigate("/homepage");
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

              <Select
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
                // menuIsOpen={true}
              />

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

        {(subscriptionModal || billModal || alreadysub) && (
          <InfoModal
            subscriptionModal={subscriptionModal}
            billModal={billModal}
            alreadysub={alreadysub}
            closeHandler={closeHandler}
          />
        )}
      </SubLayout>
    </Layout>
  );
};

export default Subscription;
