import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import leader from "../Images/leader.png";
import menu_icon from "../Images/menu-icon.svg";
import one from "../Images/1.png";
import five_star from "../Images/5star.png";
import two from "../Images/2.png";
import four_star from "../Images/4star.png";
import three from "../Images/3.png";
import four from "../Images/4.png";
import five from "../Images/5.png";
import three_star from "../Images/3star.png";
import six from "../Images/6.png";
import seven from "../Images/7.png";
import eight from "../Images/8.png";
import two_star from "../Images/2star.png";
import nine from "../Images/9.png";
import ten from "../Images/10.png";
import one_star from "../Images/1star.png";
import Menu from "../Components/Menu";
import { sendWinnersApi, userPointsApi } from "../Data/data";
import Loader from "../Components/Loader";
import Post from "../Api/Post";
import "../Css/newcss.css";
import classes from "./LeaderboardNew.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const LeaderboardNew = () => {
  let positionImg;
  let ratingImg;

  //to go on other page
  const navigate = useNavigate();
  const [userDailyPoints, setUserDailyPoints] = useState({});
  const [userMonthlyPoints, setUserMonthlyPoints] = useState({});

  //Loading Method
  useEffect(() => {
    // checkColor();
    getUserPoints();
    getWinnersData();
    // eslint-disable-next-line
  }, []);

  const getUserPoints = async () => {
    try {
      const ani = localStorage.getItem("ani");
      const response = await axios.get(`${userPointsApi}${ani}`);
      // const response = await axios.get(`${userPointsApi}260787626418`);
      setUserDailyPoints(response?.data?.Daily);
      setUserMonthlyPoints(response?.data?.Monthly);
      console.log(response, "response");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  //Hooks to Store Winners
  const [winners, setWinners] = useState([]);

  //Getting Winners Data  from Backend
  const getWinnersData = () => {
    let serviceId = localStorage.getItem("serviceId");

    let request = { serviceId: serviceId };
    // let request = { serviceId: 1 };

    let promise = Post(sendWinnersApi, request);
    promise.then((e) => {
      // console.log("e ", e);
      handlingResponse(e);
    });
  };

  //Handle API Response
  const handlingResponse = (e) => {
    if (e === "Network Error") {
      navigate("/error");
    } else {
      setWinners(e.response);
      setLoader("none"); //Hiding Loader
    }
  };

  //Hook to store loader state
  const [loader, setLoader] = useState("block");

  //Hook to Store Color
  const [color, setColor] = useState("");
  const [colorTwo, setColorTwo] = useState("");

  //Method to Get Color according to serviceId
  const checkColor = () => {
    let serviceId = localStorage.getItem("serviceId");

    // if(serviceId==='11')
    // {
    //   setColor('#FFCC00');
    //   setColorTwo('black');
    // }
    // else if(serviceId==='1')
    // {
    //   setColor('#5bc2e7');
    //   setColorTwo('#00263');
    // }
    // else
    // {
    //   setColor('#5bc2e7');
    //   setColorTwo('#00263');
    // }
  };

  return (
    <>
      <Loader value={loader} />
      <Menu
        one="inactive"
        two="inactive"
        three="active"
        four="inactive"
        five="inactive"
        six="inactive"
      />

      <div className="container white-bg container-2 bg-color-yellow">
        <div className="cus-header">
          <div className="col-md-7 col-xs-7 pl-0">
            <div className="page-icon">
              <img src={leader} /> Leaderboard
            </div>
          </div>
          <div className="col-md-5 col-xs-5">
            <span
              className="cus-menu navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false"
            >
              <img alt="logo" src={menu_icon} />
              <span className="text-unselect cursor-pointer">menu</span>
            </span>
          </div>
        </div>
        <div className="container-area">
          <div className={classes.scores_container}>
            <div className={classes.score_container}>
              <div className={classes.daily_score}>
                <p className={classes.score}>{userDailyPoints?.score}</p>
              </div>
              <p className={classes.info}>Your Daily Score</p>
            </div>
            <div className={classes.score_container}>
              <div className={classes.daily_score}>
                <p className={classes.score}>{userMonthlyPoints?.score}</p>
              </div>
              <p className={classes.info}>Your Monthly Score</p>
            </div>
            <div className={classes.score_container}>
              <div className={classes.position_container}>
                <p className={classes.score}>{userDailyPoints?.position}</p>
              </div>
              <p className={classes.info}>Your Daily Position</p>
            </div>
            <div className={classes.score_container}>
              <div className={classes.position_container}>
                <p className={classes.score}>{userMonthlyPoints?.position}</p>
              </div>
              <p className={classes.info}>Your Monthly Position</p>
            </div>
          </div>

          <div className="score-area-table text-unselect">
            <div className="blue-row">
              {/* style={{ backgroundColor: `${colorTwo}` }} */}
              <div
                className="col-md-3 col-xs-3"
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  textWrap: "nowrap",
                }}
              >
                Position{" "}
              </div>
              <div
                className="col-md-3 col-xs-3"
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  textWrap: "nowrap",
                }}
              ></div>
              <div
                className="col-md-3 col-xs-3"
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  textWrap: "nowrap",
                }}
              >
                Daily Score{" "}
              </div>
              <div
                className="col-md-3 col-xs-3"
                style={{
                  color: "white",
                  fontSize: "12px",
                  fontWeight: "600",
                  textWrap: "nowrap",
                }}
              >
                Monthly Score
              </div>
            </div>
            <div className="white-bg-shadow">
              {winners.length > 0 &&
                winners.map((value, index) => {
                  if (index + 1 === 1) {
                    positionImg = one;
                    ratingImg = five_star;
                  } else if (index + 1 === 2) {
                    positionImg = two;
                    ratingImg = four_star;
                  } else if (index + 1 === 3) {
                    positionImg = three;
                    ratingImg = four_star;
                  } else if (index + 1 === 4) {
                    positionImg = four;
                    ratingImg = four_star;
                  } else if (index + 1 === 5) {
                    positionImg = five;
                    ratingImg = three_star;
                  } else if (index + 1 === 6) {
                    positionImg = six;
                    ratingImg = three_star;
                  } else if (index + 1 === 7) {
                    positionImg = seven;
                    ratingImg = three_star;
                  } else if (index + 1 === 8) {
                    positionImg = eight;
                    ratingImg = two_star;
                  } else if (index + 1 === 9) {
                    positionImg = nine;
                    ratingImg = two_star;
                  } else if (index + 1 === 10) {
                    positionImg = ten;
                    ratingImg = one_star;
                  }
                  return (
                    <div className="rating-row" key={index}>
                      <div className="col-md-3 col-xs-3">
                        <img alt="logo" src={positionImg} />
                      </div>
                      <div className="col-md-3 col-xs-3"
                      style={{paddingTop:'7px',paddingLeft:'0px'}}
                      >
                        <img alt="logo" src={ratingImg} />
                      </div>
                      <div className="col-md-6 border-row col-xs-6">
                        {" "}
                        <div className="col-md-5 col-xs-5 pp">
                          {value.airtime}
                        </div>
                        <div className="col-md-2 col-xs-2">|</div>
                        <div className="col-md-5 col-xs-5 pp">{value.cash}</div>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div className="cus-score-btn-blue">
              <Link
                to="/homepage"
                style={{ textDecoration: "none" }}
                className="cus-score-btn-blue-span"
              >
                {/* style={{ color: `${color}`, backgroundColor: `${colorTwo}` }} */}{" "}
                Continue Playing
              </Link>
            </div>

            <Footer
              one="inactive"
              two="inactive"
              three="active"
              four="inactive"
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LeaderboardNew;
