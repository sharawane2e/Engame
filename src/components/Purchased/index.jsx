import React, { useRef, useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Footer from "../../components/Footer";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import e2eLogo from "../../assets/images/E2E-logo.png";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import TimerIcon from "@material-ui/icons/Timer";
import checkCircle from "../../assets/images/check-circle.svg";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";
import { useDispatch, useSelector } from "react-redux";
import PauseIcon from "@material-ui/icons/Pause";
import GetAppIcon from "@material-ui/icons/GetApp";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
// import { useHistory } from "react-router-dom";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#8aff8a",
  },
}))(LinearProgress);

function Purchased(props) {
  const [isActive, setActive] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const toggleClass = () => {
    console.log();
    setActive(!isActive);
  };

  // let history = useHistory();
  // console.log(history);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    console.log(session_id);

    async function paymentSuccess() {
      await fetch(BASE_URL + "payments/success/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({ user: token.user.pk, session_id: session_id }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.details);
          if (result) {
            Toaster.sucess(result.details, "topCenter");
          }
          // history.push(history.path);
        });
    }
    paymentSuccess();
    //  my widgets
  }, []);

  useEffect(() => {
    const myWwidgets = async () => {
      dispatch(loadingStart());
      await fetch(BASE_URL + "widget/user/purchased/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          dispatch(loadingStop());
          setWidgets(result);
          // console.log(result);
        });
    };
    myWwidgets();
  }, [0]);

  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
        <Header />
        <div className="bredcrum-conatiner__bredcrum_inr sticky-position">
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="bredcrum-conatiner__bredcrum-text"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link color="inherit" to="/cart">
                Shopping Cart
              </Link>
              <Typography color="textPrimary">My Widgets</Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container
          maxWidth="lg"
          className="purchased-tool__container  margin-top-174"
        >
          <Grid container spacing={3}>
            <Grid item xs={4} className="purchased-tool__hedding">
              <Typography component="div" className="hedding-text">
                My Widgets
              </Typography>
            </Grid>
            <Grid item xs={8} className="purchased-tool__hedding grid-flex">
              <Typography
                component="div"
                className="tab--button border-radius tab--active"
              >
                All
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Active Only
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Expiring Soon
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Expired
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Paused
              </Typography>
            </Grid>
          </Grid>
          {/*Card start */}
          {widgets.map((item, index) => {
            let purchasedDateTime = new Date(item.purchase_date);
            purchasedDateTime = purchasedDateTime.toLocaleString("en-US");
            const purchase_date = purchasedDateTime.split(",")[0];
            const purchase_time = purchasedDateTime.split(",")[1];
            return (
              <Grid container spacing={3} key={index}>
                <Grid item xs={12}>
                  <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        xs={12}
                        container
                        className="purchased-tool__tool-type-data"
                      >
                        <div className="purchased-tool__purchased-date">
                          <img src={checkCircle} />
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            Purchased Date:
                          </span>
                          <span className="purchased-tool__date-type-text">
                            {purchase_date}
                          </span>
                          <span className="purchased-tool__date-type-time">
                            {purchase_time}
                          </span>
                        </div>
                      </Grid>

                      <Grid
                        item
                        xs={2}
                        container
                        className="purchased-tool__tool-image purchased-image"
                      >
                        <img alt="" src={BASE_URL_1 + item.widget.imgUrl} />
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        sm
                        container
                        className="purchased-tool__tool-data"
                      >
                        <Grid item xs={10}>
                          <Grid item>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-title"
                            >
                              {item.widget.name}
                            </Typography>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-type"
                            >
                              <span className="subscription-type-text">
                                Subscription Key:
                              </span>
                              <span className="subscription-day margin-rightdata copy-to-clip">
                                {item.secrate_key.substr(0, 10)}************
                                <FileCopyIcon
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      item.secrate_key
                                    );
                                    Toaster.sucess("Code copied!", "topCenter");
                                  }}
                                />
                              </span>
                            </Typography>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-type"
                            >
                              <span className="subscription-type-text">
                                Trial Key:
                              </span>
                              <span className="subscription-day margin-rightdata copy-to-clip">
                                {item.trial_key.substr(0, 10)}************
                                <FileCopyIcon
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      item.trial_key
                                    );
                                    Toaster.sucess("Code copied!", "topCenter");
                                  }}
                                />
                              </span>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={2} className="grid-flex">
                          <Typography
                            component="div"
                            className="purchased-tool__embeded-icon border-radius icon-margin"
                          >
                            <PauseIcon />
                          </Typography>
                          <Typography
                            component="div"
                            className="purchased-tool__embeded-icon border-radius"
                          >
                            <SystemUpdateAltIcon />
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          container
                          className="purchased-tool__tool-margin"
                        >
                          <Grid item xs={4}>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-type"
                            >
                              <span className="subscription-type-text expiry-type">
                                Expiry Date:
                              </span>
                              <span className="subscription-day expiry-type margin-rightdata">
                                21/06/2021
                                <span class="purchased-tool__date-type-time curent-time">
                                  12:00PM
                                </span>
                              </span>
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-type align-center"
                            >
                              <span className="subscription-type-text ">
                                {/* 210 days left */}
                                {item.plan.plan_value}&nbsp;&nbsp;
                                {item.plan.plan_type}
                              </span>
                              <BorderLinearProgress
                                variant="determinate"
                                value={100}
                                className="progress-yellow"
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={6} className="grid-flex">
                            <div
                              className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle"
                              onClick={toggleClass}
                            >
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                {isActive ? "Show Less" : "Show More"}
                              </span>
                              <span className="purchased-tool__date-type-text">
                                {isActive ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        container
                        className={
                          isActive
                            ? "purchased-tool__tool-data accordion-margin show--accordion"
                            : "purchased-tool__tool-data accordion-margin hide--accordion"
                        }
                      >
                        <Grid item xs={6}>
                          <Typography component="div">
                            <div className="purchased-tool__purchased-date">
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                Total Amount:$512
                              </span>
                            </div>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          className="purchased-tool__expiry-date"
                        >
                          <Typography
                            component="div"
                            className="cursor--pointer"
                          >
                            <div className="purchased-tool__purchased-date purchased-tool__hover">
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                <GetAppIcon />
                              </span>
                              <span className="purchased-tool__date-type-text purchased-types">
                                Net banking
                              </span>
                            </div>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography component="div">
                            <div className="purchased-tool__purchased-date">
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                Payment Method: Net banking
                              </span>
                            </div>
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          className="purchased-tool__expiry-date"
                        >
                          <Typography
                            component="div"
                            className="cursor--pointer"
                          >
                            <div className="purchased-tool__purchased-date purchased-tool__hover">
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                <GetAppIcon />
                              </span>
                              <span className="purchased-tool__date-type-text purchased-types">
                                Consumption statement
                              </span>
                            </div>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            );
          })}
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default Purchased;
