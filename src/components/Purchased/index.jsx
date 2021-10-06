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
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import checkCircle from "../../assets/images/check-circle.svg";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";
// import { BASE_URL, BASE_URL_1, STRIPE } from "../../config/ApiUrl";
import { ReactComponent as CheckCircleIcon } from "../../assets/images/check-circle.svg";
import TimerIcon from "@material-ui/icons/Timer";
// import { BASE_URL } from "../../config/ApiUrl";
import { useDispatch, useSelector } from "react-redux";
//import PauseIcon from "@material-ui/icons/Pause";
import GetAppIcon from "@material-ui/icons/GetApp";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import Toaster from "../../util/Toaster";
import CustomPopup from "../CustomPopup";
import SubscriptionRenew from "../../components/SubscriptionType/subscriptRenew";
// import { useHistory } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Tooltip from "@material-ui/core/Tooltip";
// import { loadStripe } from "@stripe/stripe-js";
// import { styled } from "@mui/system";
import SwitchUnstyled from "@mui/core/SwitchUnstyled";
import { logOutUser } from "../../redux/user/user-action";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { getItemFromCart } from "../../redux/cart/action";
// import { PaymentData } from "../../redux/payment/paymeant-action";
import EmptyPage from "../emptyPage";
import emptyWidgett from "../../assets/images/empty-widget.gif";
import CustomButton from "../../components/widgets/Button";
import warning_icon from "../../assets/images/warning_icon.svg";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ErrorMessages } from "../../constants/Messages";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 6,
    borderRadius: 6,
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
  //const user = useSelector((state) => state.user.token);
  // const [embedCodeDownolad, setCodeDwoanlod] = useState([]);
  const [widgetList, setWidgetList] = useState([]);
  //   const [is_renew, setRenew] = useState(false);
  const [isextend, setExtend] = useState("false");
  const [productShow, setProductShow] = useState([]);
  // const user = useSelector((state) => state.user.token);
  const token = useSelector((state) => state.user.token);
  const [isPausePopup, setPausePopup] = useState(false); // Popup on play and Pause
  const [PlayPauseValue, setPlayPauseValue] = useState("");
  const [filter, setFilter] = useState("all");

  const [sucess, setSucess] = useState("Copy");
  const history = useHistory();

  var curentPlanID = localStorage.getItem("productShow");
  var curentUpdatePrice = localStorage.getItem("valuePrice");

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

  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    dispatch(loadingStart());
    let subscriptionRenew = localStorage.getItem("ExtendData") ? true : false;
    async function paymentSuccess() {
      if (!subscriptionRenew) {
        await fetch(BASE_URL + "payments/success/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
          body: JSON.stringify({
            user: token.user.pk,
            session_id: session_id,
            is_renew: "false",
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (
              result.details == "code CE13204 Internal server error!" ||
              result.details == "Payment already done !"
            ) {
              localStorage.removeItem("ExtendData");
              dispatch(loadingStop());
            } else {
              myWwidgets();
              localStorage.removeItem("ExtendData");
              dispatch(loadingStop());
              Toaster.sucess(result.details, "topCenter");
            }
          });
      } else {
        await fetch(BASE_URL + "payments/success/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },

          body: JSON.stringify({
            user: token.user.pk,
            session_id: session_id,
            is_renew: "true",
            plan_new_value: curentUpdatePrice,
            subscription: curentPlanID,
          }),
        })
          .then((response) => response.json())
          .then((result) => {
            if (
              result.details == "code CE13204 Internal server error!" ||
              result.details == "Payment already done !"
            ) {
              localStorage.removeItem("ExtendData");
              dispatch(loadingStop());
              //Toaster.error("Some thing went wrong", "topCenter");
            } else {
              myWwidgets();
              localStorage.removeItem("ExtendData");
              dispatch(loadingStop());
              Toaster.sucess(result.details, "topCenter");
            } // history.push(history.path);
          });
      }
    }
    paymentSuccess();
    myWwidgets();
  }, [token]);

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
        if (result.code == "token_not_valid") {
          dispatch(logOutUser());
          localStorage.removeItem("auth");
          dispatch(loadingStop());
          history.push("/");
        } else {
          setWidgetList(result);
          const isShowArr = [];
          result.forEach((el, index) => {
            isShowArr.push(false);
          });
          console.log(result);
          setShow(isShowArr);
          dispatch(loadingStop());
        }
      });
  };

  const PlayNPause = async (purchaseId, Paused) => {
    let pausedStatus = String(Paused);
    dispatch(loadingStart());
    setPausePopup(false);
    await fetch(BASE_URL + "subscription/pause_resume/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.access_token}`,
      },
      body: JSON.stringify({
        user: token.user.pk,
        purchased_id: purchaseId,
        is_paused: pausedStatus,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code == "token_not_valid") {
          dispatch(loadingStop());
          Toaster.error("Somthing went wrong", "topCenter");
        } else {
          Toaster.sucess(result.message, "topCenter");
          myWwidgets();
          dispatch(loadingStop());
        }
      });
  };

  const handleExtendLocal = (widgetId) => {
    localStorage.setItem("productShow", widgetId.plan.id);
  };

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
              <Typography color="textPrimary" component="div">
                My Widgets
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        {widgetList.length !== 0 ? (
          <Container
            maxWidth="lg"
            className="purchased-tool__container  margin-top-174 shopping-cart-data"
          >
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                className="purchased-tool__hedding purchased-tool__borderdata"
              >
                <Typography
                  color="textPrimary"
                  component="div"
                  className="hedding-text"
                >
                  My Widgets
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                className="purchased-tool__hedding purchased-tool__tabing"
              >
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "all" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("all")}
                >
                  All
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "active" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("active")}
                >
                  Active Only
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "expiresoon" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("expiresoon")}
                >
                  Expiring Soon
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "expired" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("expired")}
                >
                  Expired
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "paused" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("paused")}
                >
                  Paused
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "days" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("days")}
                >
                  Days Subs
                </Typography>
                <Typography
                  color="textPrimary"
                  component="div"
                  className={`tab--button border-radius ${
                    filter == "hits" ? "tab--active" : ""
                  } `}
                  onClick={() => setFilter("hits")}
                >
                  Hits Subs.
                </Typography>
              </Grid>
            </Grid>

            {/*Card start */}
            {widgetList.map((item, index) => {
              if (
                filter == "active"
                  ? item.is_active
                  : filter == "expiresoon"
                  ? item.is_expiring_soon
                  : filter == "expired"
                  ? !item.is_active
                  : filter == "paused"
                  ? item.is_paused
                  : filter == "days"
                  ? item.plan.plan_type == "days"
                  : filter == "hits"
                  ? item.plan.plan_type == "hits"
                  : filter == "all"
                  ? item.id
                  : item.id
              ) {
                let purchasedDateTime = new Date(item.purchase_date);
                purchasedDateTime = purchasedDateTime.toLocaleString("en-US");
                const purchase_date = purchasedDateTime.split(",")[0];
                const purchase_time = purchasedDateTime.split(",")[1];

                let planExpiry = new Date(item.plan_expire_date);
                planExpiry = planExpiry.toLocaleString("en-US");
                const planExpiry_date = planExpiry.split(",")[0];
                const planExpiry_time = planExpiry.split(",")[1];

                const ConsumptionValue =
                  (item.remaining_value * 100) / item.plan.plan_value;

                // const ProductStatusIcon = item.is_paused ? (
                //   <CheckCircleIcon />
                // ) : (
                //   <CheckCircleIcon />
                // );

                // const ProductStatusIcon = item.is_paused
                //   ? CheckCircleIcon
                //   : null;
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
                              {/* <img src={checkCircle} /> */}
                              {item?.is_paused ? (
                                <PauseCircleOutlineIcon className="fill_yellow" />
                              ) : item.plan_expire_date ? (
                                <TimerIcon className="fill_red" />
                              ) : item.is_active ? (
                                <CheckCircleIcon />
                              ) : !item.is_active ? (
                                <ErrorOutlineIcon className="fill_red" />
                              ) : (
                                ""
                              )}

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
                              src={BASE_URL + "media/" + item.widget.imgUrl}
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
                                  <Tooltip title={sucess} placement="top">
                                    <CopyToClipboard
                                      text={item.secrate_key}
                                      className="subscription-day margin-rightdata copy-to-clip display-flex"
                                    >
                                      <span
                                        className="subscription-day margin-rightdata copy-to-clip display-flex"
                                        onClick={() => {
                                          setSucess("Copied");
                                          setTimeout(
                                            () => setSucess("Copy"),
                                            500
                                          );
                                        }}
                                      >
                                        {item.secrate_key.substr(0, 10)}
                                        ************
                                        <FileCopyIcon className="subscription-day__icon" />
                                      </span>
                                    </CopyToClipboard>
                                  </Tooltip>
                                </Typography>
                                <Typography
                                  component="div"
                                  className="purchased-tool__tool-type display-flex"
                                >
                                  <span className="subscription-type-text">
                                    Trial Key:
                                  </span>
                                  <Tooltip title={sucess} placement="top">
                                    <CopyToClipboard
                                      text={item.trial_key}
                                      className="subscription-day margin-rightdata copy-to-clip display-flex"
                                    >
                                      <span
                                        className="subscription-day margin-rightdata copy-to-clip display-flex"
                                        onClick={() => {
                                          setSucess("Copied");
                                          setTimeout(
                                            () => setSucess("Copy"),
                                            500
                                          );
                                        }}
                                      >
                                        <span className="display-flex">
                                          {item.trial_key.substr(0, 10)}
                                          ************
                                        </span>
                                        <FileCopyIcon className="subscription-day__icon" />
                                      </span>
                                    </CopyToClipboard>
                                  </Tooltip>
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} className="grid-flex">
                              <Typography
                                component="div"
                                className=" border-radius icon-margin"
                              >
                                <Tooltip title="Play / Pause" placement="top">
                                  <SwitchUnstyled
                                    defaultChecked={
                                      item.is_paused ? false : true
                                    }
                                    onClick={() => {
                                      setPausePopup(true);
                                      setPlayPauseValue(item);
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                              <Tooltip title="Embeded Code" placement="top">
                                <Typography
                                  component="div"
                                  className="extend-validity"
                                  // onClick={() => //handleExtend(item)}
                                  onClick={() => {
                                    setRenew(true);
                                    setProductShow(item);
                                    setExtend("true");
                                    handleExtendLocal(item);
                                  }}
                                >
                                  Extend validity
                                </Typography>
                              </Tooltip>
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
                                  {!item.is_paused ? (
                                    <>
                                      <span className="subscription-type-text expiry-type">
                                        Expiry Date:
                                      </span>
                                      <span className="subscription-day expiry-type margin-rightdata">
                                        {planExpiry_date}
                                      </span>
                                    </>
                                  ) : (
                                    ""
                                  )}
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
                                      ConsumptionValue > 79
                                        ? "progress-bar progress-green"
                                        : ConsumptionValue > 49 &&
                                          ConsumptionValue < 80
                                        ? "progress-bar progress-yellow"
                                        : ConsumptionValue > 19 &&
                                          ConsumptionValue < 50
                                        ? "progress-bar progress-embeded"
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
                                    currentActive[index] =
                                      !currentActive[index];
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
                            <Grid
                              item
                              xs={12}
                              container
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
                                      {item.payment_method.replace(/'/g, "")}
                                    </span>
                                  </div>
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={6}
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
                                    <Tooltip
                                      title="Embeded Code"
                                      placement="top"
                                    >
                                      <SystemUpdateAltIcon />
                                    </Tooltip>
                                  </Typography>
                                </div>
                              </Grid>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                );
              }
            })}
          </Container>
        ) : (
          <EmptyPage
            heading={ErrorMessages.purchaseCart}
            imgUrl={emptyWidgett}
            buttonName="Continue Shoping"
          />
        )}
        {/*Renew Subscription*/}
        <CustomPopup
          open={is_renew}
          onClose={() => setRenew(false)}
          headerText="Extend Validity"
          footerButton={true}
          className="border-radius popup-container__iner--sm"
        >
          <SubscriptionRenew
            updateData={productShow}
            onClose={() => setRenew(false)}
          />
        </CustomPopup>

        <CustomPopup
          open={isPausePopup}
          className="popup-container__iner--sm border-radius loginAlert "
        >
          <Grid container spacing={4} align="center">
            <Grid item xs={12}>
              <img
                className="message__img"
                src={warning_icon}
                alt="Registration Sucessfully"
              />
              <Typography component="p" className="sucess_message">
                {`Your are ${
                  PlayPauseValue.is_paused
                    ? "Once you play subscription, it will cost 1 day for the minimum. Are you sure you want to start playing it?"
                    : "Integrated widget will stop running once paused. Are you sure you want to stop playing it?"
                }`}
              </Typography>
              {/* <p className="sucess_message"></p> */}
              <CustomButton
                className="primary-button"
                style={{ marginRight: "20px" }}
                onClick={() =>
                  PlayNPause(PlayPauseValue.plan.id, PlayPauseValue.is_paused)
                }
              >
                {PlayPauseValue.is_paused ? "Play Now" : "Pause Now"}
              </CustomButton>
              <CustomButton
                className="secondary-button"
                onClick={() => {
                  setPausePopup(false);
                  window.location.reload(true);
                }}
              >
                Cancel
              </CustomButton>
            </Grid>
          </Grid>
        </CustomPopup>

        <Footer />
      </div>
    </>
  );
}

export default Purchased;
