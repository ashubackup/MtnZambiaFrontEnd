import React from "react";
import classes from "./InfoModal.module.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

const InfoModal = ({
  subscriptionModal,
  billModal,
  alreadysub,
  closeHandler,
  billPending,
  errorModal,
}) => {
  const closeModal = () => {
    closeHandler();
  };
  return (
    <div
      className={`${
        subscriptionModal ||
        billModal ||
        billPending ||
        alreadysub ||
        errorModal
          ? `${classes.modal_container} ${classes.modal_show}`
          : classes.modal_container
      }`}
    >
      <div className={classes.modal_sub_container}>
        <div className={classes.icon}>
          {subscriptionModal ? (
            <FaCheckCircle className={classes.icon_style} />
          ) : billPending ? (
            <IoIosWarning className={classes.icon_style_danger} />
          ) : (
            <IoIosCloseCircle className={classes.icon_style_danger} />
          )}
        </div>
        <div className={classes.modal_content}>
          <div className={classes.main_heading}>
            {subscriptionModal ? (
              <p>Your subscription is in progress you will notify shortly </p>
            ) : billPending ? (
              <p>Billing is Pending !</p>
            ) : alreadysub ? (
              <p>You have Already Subscribed Requested Services !</p>
            ) : errorModal ? (
              <p>Something Went Wrong , Try Again Later!</p>
            ) : (
              <p>Billing Failed !</p>
            )}
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

export default InfoModal;
