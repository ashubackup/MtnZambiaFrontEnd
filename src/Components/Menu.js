import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import arrow_left from "../Images/arrow-left.svg";
import bigcash_logo from "../Images/bigcash-logo.png";
// import logob from "../NewImages/Hulu-Logo.png";
// import { toast } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";
import { unsubApi } from "../Data/data";
import FailedModal from "./FailedModal";

const Menu = (prop) => {
  //To Load on Start
  useEffect(() => {
    checkColor();
  }, []);

  //Hook to Store Color
  const [colorTwo, setColorTwo] = useState("");
  const [loader, setLoader] = useState("none");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  //Method to Get Color according to serviceId
  const checkColor = () => {
    let serviceId = localStorage.getItem("serviceId");

    // if(serviceId==='11')
    // {
    //   setColorTwo('black');
    // }
    // else if(serviceId==='1')
    // {
    //   setColorTwo('#00263a');
    // }
    // else
    // {
    //   setColorTwo('#00263a');
    // }
  };

  const unsubscribeHandler = async () => {
    try {
      setLoader("block");
      const ani = localStorage.getItem("ani");
      const response = await axios.get(`${unsubApi}?msisdn=${ani}`);
      console.log(response, "response...");

      if (response?.data == "Success") {
        localStorage.removeItem("ani");
        localStorage.removeItem("serviceId");
        setLoader("none");
        console.log("execute successsd");

        navigate("/unsubscribe/success", {
          state: {
            show: true,
          },
        });

        // navigate("/subscribe");
      } else {
        console.log("execute failed");
        setLoader("none");
        setOpen(true);
        setText("Failed To Unsubscribe!");
      }
    } catch (error) {
      setOpen(true);
      setText(
        error?.response?.data?.message ||
          error?.response?.message ||
          error?.message ||
          error
      );
    }
  };

  const closeHandler = () => {
    setOpen(false);
    setText("");
  };

  return (
    <>
      <Loader value={loader} />
      <div
        className="collapse navbar-collapse"
        id="bs-example-navbar-collapse-1"
      >
        <div className="arrow_btn">
          <span
            className="collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <img src={arrow_left} alt="arrow" className="img-responsive" />
          </span>
        </div>
        <div className="menu_inner">
          {/* {/ {/ style={{backgroundColor:`${colorTwo}`}} /} /} */}
          <div className="menu_logo text-center">
            <a href="">
              <img src={bigcash_logo} alt="Logo" className="img-responsive" />
            </a>
          </div>
          <br />

          <ul className="nav navbar-nav">
            <li className={prop.one}>
              <Link to="/homepage">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 17.0001V11.4522V11.4514C20 10.9176 20 10.6505 19.9351 10.402C19.8775 10.1816 19.7827 9.97269 19.6548 9.78426C19.5104 9.57164 19.3096 9.39575 18.9074 9.04389L14.1074 4.84389C13.3608 4.1906 12.9875 3.864 12.5674 3.73976C12.1972 3.63028 11.8028 3.63028 11.4326 3.73976C11.0127 3.86393 10.6398 4.19025 9.894 4.84281L9.89278 4.84389L5.09277 9.04389L5.09182 9.04473C4.69032 9.39603 4.48944 9.57181 4.34521 9.78427C4.2173 9.97269 4.12255 10.1816 4.06497 10.402C4 10.6506 4 10.9178 4 11.4522V17.0001C4 17.932 4 18.3978 4.15224 18.7654C4.35523 19.2554 4.74481 19.6448 5.23486 19.8478C5.60241 20 6.06835 20 7.00023 20C7.93211 20 8.39782 20 8.76537 19.8478C9.25542 19.6448 9.64467 19.2554 9.84766 18.7654C9.9999 18.3978 10 17.9319 10 17V16C10 14.8954 10.8954 14 12 14C13.1046 14 14 14.8954 14 16V17C14 17.9319 14 18.3978 14.1522 18.7654C14.3552 19.2554 14.7448 19.6448 15.2349 19.8478C15.6024 20 16.0683 20 17.0002 20C17.9321 20 18.3978 20 18.7654 19.8478C19.2554 19.6448 19.6447 19.2554 19.8477 18.7654C19.9999 18.3978 20 17.932 20 17.0001Z"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Home Page</span>
              </Link>
            </li>
            <li className={prop.two}>
              <Link to="/score">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>User Score</span>
              </Link>
            </li>
            <li className={prop.three}>
              <Link to="/leader">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 21V5.00001M20 15.6867V4.31324C14.1818 8.86261 9.81818 -0.236073 4 4.3133V15.6867C9.81818 11.1373 14.1818 20.236 20 15.6867Z"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Leaderboard</span>
              </Link>
            </li>
            <li className={prop.four}>
              <Link to="/prize">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20H18.4C18.9601 20 19.2405 20 19.4544 19.891C19.6425 19.7951 19.7948 19.6422 19.8906 19.454C19.9996 19.2401 20 18.96 20 18.4V13.6C20 13.0399 19.9996 12.7599 19.8906 12.546C19.7948 12.3579 19.6425 12.2049 19.4544 12.109C19.2405 12 18.9597 12 18.3996 12H13.5996M12 20V13.6M12 20H5.59961C5.03956 20 4.75981 20 4.5459 19.891C4.35774 19.7951 4.20487 19.6422 4.10899 19.454C4 19.2401 4 18.96 4 18.4V13.6C4 13.0399 4 12.7599 4.10899 12.546C4.20487 12.3579 4.35774 12.2049 4.5459 12.109C4.75981 12 5.03956 12 5.59961 12H10.3996M12 13.6C12 13.0399 12 12.7599 12.109 12.546C12.2049 12.3579 12.3577 12.2049 12.5459 12.109C12.7598 12 13.0396 12 13.5996 12M12 13.6C12 13.0399 11.9996 12.7599 11.8906 12.546C11.7948 12.3579 11.6425 12.2049 11.4544 12.109C11.2405 12 10.9597 12 10.3996 12M13.5996 12H19.3996C19.9597 12 20.2405 12 20.4544 11.891C20.6425 11.7951 20.7948 11.6422 20.8906 11.454C20.9996 11.2401 21 10.96 21 10.4V9.59998C21 9.03992 20.9996 8.75993 20.8906 8.54602C20.7948 8.35786 20.6425 8.20487 20.4544 8.10899C20.2405 8 19.9597 8 19.3996 8H13.5996C13.0396 8 12.7598 8 12.5459 8.10899C12.3577 8.20487 12.2049 8.35786 12.109 8.54602C12 8.75993 12 9.03992 12 9.59998M13.5996 12C13.0396 12 12.7598 12 12.5459 11.891C12.3577 11.7951 12.2049 11.6422 12.109 11.454C12 11.2401 12 10.96 12 10.4M10.3996 12H4.59961C4.03956 12 3.75981 12 3.5459 11.891C3.35774 11.7951 3.20487 11.6422 3.10899 11.454C3 11.2401 3 10.96 3 10.4V9.59998C3 9.03992 3 8.75993 3.10899 8.54602C3.20487 8.35786 3.35774 8.20487 3.5459 8.10899C3.75981 8 4.03956 8 4.59961 8H10.3996C10.9597 8 11.2405 8 11.4544 8.10899C11.6425 8.20487 11.7948 8.35786 11.8906 8.54602C11.9996 8.75993 12 9.03992 12 9.59998M10.3996 12C10.9597 12 11.2405 12 11.4544 11.891C11.6425 11.7951 11.7948 11.6422 11.8906 11.454C11.9996 11.2401 12 10.96 12 10.4M12 10.4V9.59998M12 5.5V8M12 5.5C12 4.11929 13.1193 3 14.5 3C15.8807 3 17 4.11929 17 5.5C17 6.88071 15.8807 8 14.5 8H12M12 5.5C12 4.11929 10.8807 3 9.5 3C8.11929 3 7 4.11929 7 5.5C7 6.88071 8.11929 8 9.5 8H12"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Prizes</span>
              </Link>
            </li>
            <li className={prop.five}>
              <Link to="/terms">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 14C21 13.4477 20.5523 13 20 13C19.4477 13 19 13.4477 19 14H21ZM10.0002 5C10.5525 5 11.0002 4.55228 11.0002 4C11.0002 3.44772 10.5525 3 10.0002 3V5ZM4.21799 5.09204L5.10899 5.54603L4.21799 5.09204ZM5.0918 4.21799L5.54579 5.10899L5.0918 4.21799ZM5.0918 19.782L5.54579 18.891H5.54579L5.0918 19.782ZM4.21799 18.908L3.32698 19.362H3.32698L4.21799 18.908ZM19.7822 18.908L18.8912 18.454L19.7822 18.908ZM18.9078 19.782L18.4538 18.891L18.9078 19.782ZM10 14H9C9 14.5523 9.44772 15 10 15V14ZM10 11L9.29289 10.2929C9.10536 10.4804 9 10.7348 9 11H10ZM19 2L19.7071 1.29289C19.3166 0.902369 18.6834 0.902369 18.2929 1.29289L19 2ZM22 5L22.7071 5.70711C23.0976 5.31658 23.0976 4.68342 22.7071 4.29289L22 5ZM13 14V15C13.2652 15 13.5196 14.8946 13.7071 14.7071L13 14ZM16.7071 4.29289C16.3166 3.90237 15.6834 3.90237 15.2929 4.29289C14.9024 4.68342 14.9024 5.31658 15.2929 5.70711L16.7071 4.29289ZM18.2929 8.70711C18.6834 9.09763 19.3166 9.09763 19.7071 8.70711C20.0976 8.31658 20.0976 7.68342 19.7071 7.29289L18.2929 8.70711ZM19 14V16.8H21V14H19ZM16.8002 19H7.2002V21H16.8002V19ZM5 16.8V7.20001H3V16.8H5ZM7.2002 5H10.0002V3H7.2002V5ZM5 7.20001C5 6.62346 5.00078 6.25119 5.02393 5.96785C5.04612 5.69619 5.0838 5.59548 5.10899 5.54603L3.32698 4.63805C3.13419 5.01643 3.06287 5.40964 3.03057 5.80499C2.99922 6.18866 3 6.65646 3 7.20001H5ZM7.2002 3C6.65663 3 6.18874 2.99922 5.80498 3.03057C5.40962 3.06286 5.01624 3.13416 4.63781 3.32698L5.54579 5.10899C5.59517 5.08383 5.69595 5.04613 5.9678 5.02393C6.25126 5.00078 6.62365 5 7.2002 5V3ZM5.10899 5.54603C5.205 5.35761 5.35788 5.20474 5.54579 5.10899L4.63781 3.32698C4.07306 3.61473 3.61447 4.07382 3.32698 4.63805L5.10899 5.54603ZM7.2002 19C6.62367 19 6.25127 18.9992 5.96782 18.9761C5.69598 18.9538 5.59519 18.9161 5.54579 18.891L4.63781 20.673C5.01623 20.8658 5.40959 20.9371 5.80496 20.9694C6.18873 21.0008 6.65662 21 7.2002 21V19ZM3 16.8C3 17.3436 2.99922 17.8114 3.03057 18.195C3.06287 18.5904 3.13419 18.9836 3.32698 19.362L5.10899 18.454C5.0838 18.4045 5.04612 18.3038 5.02393 18.0322C5.00078 17.7488 5 17.3766 5 16.8H3ZM5.54579 18.891C5.35784 18.7952 5.20498 18.6424 5.10899 18.454L3.32698 19.362C3.61449 19.9262 4.0731 20.3853 4.63781 20.673L5.54579 18.891ZM19 16.8C19 17.3767 18.9993 17.7489 18.9762 18.0323C18.954 18.304 18.9164 18.4046 18.8912 18.454L20.6732 19.362C20.8661 18.9835 20.9373 18.5902 20.9696 18.1949C21.0008 17.8113 21 17.3435 21 16.8H19ZM16.8002 21C17.3438 21 17.8115 21.0008 18.1951 20.9694C18.5904 20.9371 18.9835 20.8657 19.3618 20.673L18.4538 18.891C18.4043 18.9162 18.3036 18.9539 18.0321 18.9761C17.7489 18.9992 17.3767 19 16.8002 19V21ZM18.8912 18.454C18.7956 18.6417 18.6424 18.7949 18.4538 18.891L19.3618 20.673C19.9258 20.3856 20.3854 19.9269 20.6732 19.362L18.8912 18.454ZM11 14V11H9V14H11ZM10.7071 11.7071L19.7071 2.70711L18.2929 1.29289L9.29289 10.2929L10.7071 11.7071ZM18.2929 2.70711L21.2929 5.70711L22.7071 4.29289L19.7071 1.29289L18.2929 2.70711ZM21.2929 4.29289L12.2929 13.2929L13.7071 14.7071L22.7071 5.70711L21.2929 4.29289ZM13 13H10V15H13V13ZM15.2929 5.70711L18.2929 8.70711L19.7071 7.29289L16.7071 4.29289L15.2929 5.70711Z"
                    // fill="#fff"
                  />
                </svg>
                <span>T’s & C’s</span>
              </Link>
            </li>
            <li className={prop.six}>
              <Link to="/faq">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 14.8V7.19995V7.19666C21 6.07875 21 5.51945 20.7822 5.09204C20.5905 4.71572 20.2841 4.40973 19.9078 4.21799C19.48 4 18.9203 4 17.8002 4H6.2002C5.08009 4 4.51962 4 4.0918 4.21799C3.71547 4.40973 3.40973 4.71572 3.21799 5.09204C3 5.51986 3 6.07985 3 7.19995V18.671C3 19.7367 3 20.2696 3.21846 20.5432C3.40845 20.7813 3.69644 20.9197 4.00098 20.9194C4.35115 20.919 4.76744 20.5861 5.59961 19.9203L7.12357 18.7012C7.44844 18.4413 7.61084 18.3114 7.79172 18.219C7.95219 18.137 8.12279 18.0771 8.29932 18.0408C8.49829 18 8.70652 18 9.12256 18H17.8001C18.9202 18 19.48 18 19.9078 17.782C20.2841 17.5902 20.5905 17.2844 20.7822 16.908C21 16.4806 21 15.9212 21 14.8032V14.8Z"
                    stroke="#fff"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>FAQ’s</span>
              </Link>
            </li>
          </ul>
          {/* <Link to={"/profile"} className="btn-b-m" href="#">
            Buy More Playtime
          </Link> */}
          <div className="foot_menu text-center">
            <span
              className="collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <svg
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.8749 28.8749L4.125 4.125M28.8751 4.125L4.125 28.8751"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="unsubscribe_container">
                <button
                  className="unsubscribe_btn"
                  onClick={() => unsubscribeHandler()}
                >
                  Unsubscribe
                </button>
              </div>
            </span>
            <p>
              <span
                className="text-unselect"
                style={{ color: "#FFCB05", fontFamily: "Inter,sans-serif" }}
              >
                Copyright © {new Date().getFullYear()} <br /> <b>Bigcash</b>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
      {open && (
        <FailedModal open={open} closeHandler={closeHandler} text={text} />
      )}
    </>
  );
};
export default Menu;