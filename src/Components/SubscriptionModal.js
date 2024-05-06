import React from "react";
import classes from "./SubscriptionModal.module.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SubscriptionModal = ({ open, closeHandler }) => {

  const closeModal = () => {
    closeHandler();
  };
  return (
    <div
      className={`${
        open
          ? `${classes.modal_container} ${classes.modal_show}`
          : classes.modal_container
      }`}
    >
      <div className={classes.modal_sub_container}>
        <div className={classes.icon}>
          <FaCheckCircle className={classes.icon_style} />
        </div>
        <div className={classes.modal_content}>
          <div className={classes.main_heading}>
            <p>Your subscription is in progress you will notify shortly </p>
          </div>
        </div>
        <div className={classes.btn_container}>
          <button className={classes.cancel_btn} onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
