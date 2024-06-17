import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Logo from "../Pages/1Logo";
// import Intro from "../Pages/2Intro";
import Intro12 from "../NewPage/Intro.js";
import Home from "../Pages/3Home";
import PageNotFound from "../Pages/404";
import Score from "../Pages/4Score";
import ErrorPage from "../Pages/500";
import Leaderboard from "../Pages/5Leaderboard";
import Prize from "../Pages/6.Prize";
import Terms from "../Pages/7.Terms";
import Faq from "../Pages/8.Faq";
import { Homepage } from "../Pages/Homepage";
import { Gamerprofile } from "../Pages/Gamerprofile";
import { Checkout } from "../Pages/Checkout";
import { Test } from "../Pages/Test";
import Login from "../NewPage/Login";
import Subscription from "../NewPage/Subscription";
import Welcome from "../NewPage/Welcome";
import BillingPending from "../Pages/BillingPending";
import NotifyPage from "../NewPage/NotifyPage.js";
import Header from "../Pages/Header.js";
import Auth from "../NewComponentCSS/Auth.js";
import UnSubSuccessPage from "../NewPage/UnSubSuccessPage.js";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Logo/>} exact={true}></Route> */}
          {/* <Route path="/" element={<Intro/>} exact={true}></Route> */}
          <Route path="/" element={<Intro12 />} exact={true} />
          <Route
            path="/home"
            element={
              <Auth>
                <Home />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route
            path="/score"
            element={
              <Auth>
                <Score />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route
            path="/leader"
            element={
              <Auth>
                <Leaderboard />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route
            path="/prize"
            element={
              <Auth>
                <Prize />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route
            path="/terms"
            element={
              <Auth>
                <Terms />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route
            path="/faq"
            element={
              <Auth>
                <Faq />
              </Auth>
            }
            exact={true}
          ></Route>
          <Route path="*" element={<PageNotFound />} exact={true}></Route>
          <Route path="/error" element={<ErrorPage />} exact={true}></Route>
          <Route
            path="/billingPending"
            element={<BillingPending />}
            exact={true}
          ></Route>
          <Route
            path="/homepage"
            element={
              <Auth>
                <Homepage />
              </Auth>
            }
            exact={true}
          />
          <Route
            path="/profile"
            element={
              <Auth>
                <Gamerprofile />
              </Auth>
            }
            exact={true}
          />
          <Route
            path="/checkout"
            element={
              <Auth>
                <Checkout />
              </Auth>
            }
            exact={true}
          />
          <Route
            path="/test"
            element={
              <Auth>
                <Test />
              </Auth>
            }
            exact={true}
          />
          <Route path="/login" element={<Login />} exact={true} />
          <Route path="/subscribe" element={<Subscription />} exact={true} />
          <Route path="/welcome" element={<Welcome />} exact={true} />
          <Route path="/notify" element={<NotifyPage />} exact={true} />
          <Route path="/headers" element={<Header />} exact={true} />
          <Route path="/unsubscribe/success" element={<UnSubSuccessPage />}exact={true}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Routing;
