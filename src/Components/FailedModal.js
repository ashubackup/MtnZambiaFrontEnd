import React from "react";
import classes from "./InfoModal.module.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

const FailedModal = ({ text, open, closeHandler }) => {
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
          <IoIosCloseCircle className={classes.icon_style_danger} />
        </div>
        <div className={classes.modal_content}>
          <div className={classes.main_heading}>
            <p>{text}</p>
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

export default FailedModal;
