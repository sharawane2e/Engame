import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Footer from "../../components/Footer";
import Paper from "@material-ui/core/Paper";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
// import TimerIcon from "@material-ui/icons/Timer";
import checkCircle from "../../assets/images/check-circle.svg";
import { BASE_URL, BASE_URL_1, STRIPE } from "../../config/ApiUrl";
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
import ReceiptIcon from "@material-ui/icons/Receipt";
import Tooltip from "@material-ui/core/Tooltip";
// import { loadStripe } from "@stripe/stripe-js";
import Switch from '@material-ui/core/Switch';
import { v4 as uuidv4 } from 'uuid';

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
    // backgroundColor: "#8aff8a",
  },
}))(LinearProgress);

function Purchased(props) {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [is_renew, setRenew] = useState("false");
  const user = useSelector((state) => state.user.token);
  // const [embedCodeDownolad, setCodeDwoanlod] = useState([]);
  const [copy, setCopy] = useState(false);


  // let history = useHistory();
  // console.log(history);

  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");

    

    async function paymentSuccess() {
      if (is_renew == "false") {
        await fetch(BASE_URL + "payments/success/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
          body: JSON.stringify({
            user: token.user.pk,
            session_id: session_id,
            is_renew: is_renew,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (result) {
              Toaster.sucess(result.details, "topCenter");
              //window.location.reload();
            }
            // history.push(history.path);
          });
      } else {
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
            if (result) {
              Toaster.sucess(result.details, "topCenter");
              //window.location.reload();
            }
            // history.push(history.path);
          });
      }
    }
    paymentSuccess();
    //  my widgets
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
          const isShowArr = [];
          result.forEach((el, index) => {
            isShowArr.push(false);
          });
          setShow(isShowArr);
        });
    };
    myWwidgets();
  }, [token]);

  const downloadfile = (fileName, embedcode) => {
    // console.log(embedcode);
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(
      new Blob([embedcode], {
        type: "application/octet-stream",
      })
    );
    link.download = fileName + ".text";
    document.body.appendChild(link);
    link.click();
  };

  const handleExtend = async (widgetId) => {
    // const plan_newValue,planId,
    //console.log("widgets", widgetId);
    // // const plan = widgets.plan.id;
    // // const plan_new_value = "2306";
    // // const subscription = widgetId;
    // // const widget = widgets.widget.id;
    // // const price = "200";
    // // const currency = "USD";
    // setRenew(true);
    // dispatch(loadingStart());
    // const stripe = await loadStripe(STRIPE);
    // try {
    //   await fetch(BASE_URL + "payments/checkout-session/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${user.access_token}`,
    //     },
    //     body: JSON.stringify({
    //       user: user.user.pk,
    //       is_renew: is_renew,
    //       plan_new_value: plan_new_value,
    //       plan: plan,
    //       subscription: subscription,
    //       widget: widget,
    //       price: price,
    //       currency: currency,
    //     }),
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       //sessionStorage.setItem("sessionId", result.sessionId);
    //       stripe.redirectToCheckout({ sessionId: result.sessionId });
    //       dispatch(loadingStop());
    //     });
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // useEffect(() => {
  //   isShow;
  // });

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

            const ConsumptionValue =
              (item.remaining_value * 100) / item.plan.plan_value;

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
                        <img
                          alt={item.widget.name}
                          title={item.widget.name}
                          src={BASE_URL_1 + item.widget.imgUrl}
                        />
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
                              className="purchased-tool__tool-type display-flex"
                            >
                              <span className="subscription-type-text">
                                Subscription Key:
                              </span>
                                <Tooltip title={copy? "Copied" : "copy"} placement="top">
                              <span 
                              className="subscription-day margin-rightdata copy-to-clip display-flex"
                              onClick={() => {
                                navigator.clipboard.writeText(
                                  item.secrate_key
                                  );
                                  setCopy(true);
                                  setTimeout(() => setCopy(false), 1000)
                                }}
                              >
                                {item.secrate_key.substr(0, 10)}************
                                  <FileCopyIcon className="subscription-day__icon" />
                              </span>
                                </Tooltip>
                            </Typography>
                            <Typography
                              component="div"
                              className="purchased-tool__tool-type display-flex"
                            >
                              <span className="subscription-type-text">
                                Trial Key:
                              </span>
                                <Tooltip title={copy? "Copied" : "copy"} placement="top">
                              <span 
                              className="subscription-day margin-rightdata copy-to-clip display-flex" 
                              onClick={() => {
                                    navigator.clipboard.writeText(
                                      item.trial_key
                                    );
                                    setCopy(true);
                                    setTimeout(() => setCopy(false), 1000);
                                  }}>
                               <span className="display-flex"> {item.trial_key.substr(0, 10)}************</span>
                                <FileCopyIcon className="subscription-day__icon"/>
                              </span>
                                </Tooltip>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item xs={2} className="grid-flex">
                          {/* <Typography
                            component="div"
                            className="purchased-tool__embeded-icon border-radius icon-margin"
                          >
                            
                          </Typography> */}
                          <Switch />
                         
                          <Typography
                            component="div"
                            className="extend-validity"
                            onClick={() => handleExtend(item.widget.id)}
                          >
                            {/* <Tooltip title="Embeded Code" placement="top"> */}
                            Extend validity
                            {/* </Tooltip> */}
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
                                {item.remaining_value}&nbsp;&nbsp;
                                {item.plan.plan_type} left
                              </span>

                              <BorderLinearProgress
                                variant="determinate"
                                value={ConsumptionValue}
                                className={
                                  ConsumptionValue > 80
                                    ? "progress-bar progress-green"
                                    : ConsumptionValue > 30 &&
                                      ConsumptionValue < 80
                                    ? "progress-bar progress-yellow"
                                    : "progress-bar progress-red"
                                }
                              />
                            </Typography>
                          </Grid>
                          <Grid item xs={6} className="grid-flex">
                            <div
                              className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle"
                              onClick={() => {
                                const currentActive = [...isShow];
                                currentActive[index] = !currentActive[index];
                                setShow(currentActive);
                              }}
                            >
                              <span className="purchased-tool__date-type-text purchased-curent-text">
                                {isShow[index] ? "Show Less" : "Show More "}
                              </span>
                              <span className="purchased-tool__date-type-text">
                                {isShow[index] ? (
                                  <ExpandLessIcon />
                                ) : (
                                  <ExpandMoreIcon />
                                )}
                              </span>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>

                      {isShow[index] ? (
                        <Grid item xs={12} container
                          className="purchased-tool__tool-data accordion-margin show--accordion"
                        >
                          <Grid item xs={6}>
                            <Typography component="div">
                              <div className="purchased-tool__purchased-date">
                                <span className="purchased-tool__date-type-text purchased-curent-text">
                                  Total Amount:
                                </span>
                                <span className="purchased-tool__date-type-text ">
                                  ${item.plan.price}
                                </span>
                              </div>
                            </Typography>

                            <Typography component="div">
                              <div className="purchased-tool__purchased-date">
                                <span className="purchased-tool__date-type-text purchased-curent-text">
                                  Payment Method:
                                </span>
                                <span className="purchased-tool__date-type-text">
                                  {item.payment_method}
                                </span>
                              </div>
                            </Typography>
                          </Grid>
                          
                          <Grid item xs={6}
                            className="purchased-tool__expiry-date"
                          >
                            <div>
                              <Typography
                                component="div"
                                className="cursor--pointer"
                              >
                                <div className="purchased-tool__purchased-date purchased-tool__hover">
                                  <span className="purchased-tool__date-type-text purchased-curent-text"></span>
                                  <span className="purchased-tool__date-type-text purchased-types">
                                    <GetAppIcon />
                                    Download Invoice
                                  </span>
                                </div>
                              </Typography>

                              <Typography
                                component="div"
                                className="cursor--pointer"
                              >
                                <div className="purchased-tool__purchased-date purchased-tool__hover">
                                  <span className="purchased-tool__date-type-text purchased-curent-text"></span>
                                  <span className="purchased-tool__date-type-text purchased-types">
                                    <ReceiptIcon /> Consumption statement
                                  </span>
                                </div>
                              </Typography>
                            </div>
                            <div className="pdl-2">
                              <Typography
                                component="div"
                                className="purchased-tool__embeded-icon border-radius"
                                onClick={() =>
                                  downloadfile(
                                    item.widget.name,
                                    item.widget.widget_embed_code
                                  )
                                }
                              >
                                <Tooltip title="Embeded Code" placement="top">
                                  <SystemUpdateAltIcon />
                                </Tooltip>
                              </Typography>
                            </div>
                          </Grid>
                          
                          {/* <Grid item xs={6}>
                            <Typography component="div">
                              <div className="purchased-tool__purchased-date">
                                <span className="purchased-tool__date-type-text purchased-curent-text">
                                  Payment Method:
                                </span>
                                <span className="purchased-tool__date-type-text">
                                  {item.payment_method}
                                </span>
                              </div>
                            </Typography>
                          </Grid> */}
{/*                           
                          <Grid item xs={6}
                            className="purchased-tool__expiry-date"
                          >
                            <Typography
                              component="div"
                              className="cursor--pointer"
                            >
                              <div className="purchased-tool__purchased-date purchased-tool__hover">
                                <span className="purchased-tool__date-type-text purchased-curent-text"></span>
                                <span className="purchased-tool__date-type-text purchased-types">
                                  <ReceiptIcon /> Consumption statement
                                </span>
                              </div>
                            </Typography>
                          </Grid> */}
                        </Grid>

                      ) : null}
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
