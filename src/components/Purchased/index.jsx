import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { CopyToClipboard } from "react-copy-to-clipboard";

import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SwitchUnstyled from "@mui/core/SwitchUnstyled";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Grid, Paper } from "@mui/material";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import GetAppIcon from "@material-ui/icons/GetApp";
import TimerIcon from "@material-ui/icons/Timer";
import { ReactComponent as CheckCircleIcon } from "../../assets/images/check-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ReceiptIcon from "@material-ui/icons/Receipt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import Header from "../Header";
import CustomPopup from "../CustomPopup";
import Footer from "../../components/Footer";
import Toaster from "../../util/Toaster";
import EmptyPage from "../emptyPage";
import ApiRequest from "../../util/ApiRequest";
import warning_icon from "../../assets/images/warning_icon.svg";
import CustomButton from "../../components/widgets/Button";
import emptyWidgett from "../../assets/images/empty-widget.gif";
import SubscriptionRenew from "../../components/SubscriptionType/subscriptRenew";
import { BASE_URL } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { logOutUser } from "../../redux/user/user-action";
import { useHistory } from "react-router-dom";
import { ErrorMessages } from "../../constants/Messages";
import { removeFromCart } from "../../redux/cart/action";
import {
  PURCHASED_ITEM,
  PLAY_PAUSE,
  PAYMENT_SUCESS,
} from "../../config/ApiUrl";

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
  },
}))(LinearProgress);

function Purchased(props) {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [is_renew, setRenew] = useState(false);
  const [widgetList, setWidgetList] = useState([]);
  const [isextend, setExtend] = useState("false");
  const [productShow, setProductShow] = useState([]);
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

  const paymentSuccess = () => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    let subscriptionRenew = localStorage.getItem("ExtendData") ? true : false;

    let NewPaymentSucessData = {
      user: token.user.pk,
      session_id: session_id,
      is_renew: "false",
    };

    let RenewPaymentSucessData = {
      user: token.user.pk,
      session_id: session_id,
      is_renew: "true",
      plan_new_value: curentUpdatePrice,
      subscription: curentPlanID,
    };

    let PaymentSucessData = subscriptionRenew
      ? RenewPaymentSucessData
      : NewPaymentSucessData;

    ApiRequest.request(PAYMENT_SUCESS, "POST")
      .then((res) => {
        console.log(res, "res");
        if (!res.status == 500) {
          PurchaseList();
          dispatch(removeFromCart());
          localStorage.removeItem("ExtendData");
          dispatch(loadingStop());
          Toaster.sucess(res.details, "topCenter");
        }
      })
      .catch((error) => {
        // localStorage.removeItem("ExtendData");
        dispatch(loadingStop());
      });
  };

  useEffect(() => {
    dispatch(loadingStart());
    paymentSuccess();
    PurchaseList();
  }, [token]);

  //  my widgets
  const PurchaseList = async () => {
    dispatch(loadingStart());
    ApiRequest.request(PURCHASED_ITEM)
      .then((res) => {
        setWidgetList(res);
        const isShowArr = [];
        res.forEach((el, index) => {
          isShowArr.push(false);
        });
        setShow(isShowArr);
        dispatch(removeFromCart());
        dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(logOutUser());
        localStorage.removeItem("auth");
        dispatch(loadingStop());
        history.push("/");
      });
  };

  const PlayNPause = async (purchaseId, Paused) => {
    let pausedStatus = String(Paused);

    let ItemData = {
      user: token.user.pk,
      purchased_id: purchaseId,
      is_paused: pausedStatus,
    };
    dispatch(loadingStart());
    setPausePopup(false);

    ApiRequest.request(PLAY_PAUSE, "POST", ItemData)
      .then((res) => {
        Toaster.sucess(res.message, "topCenter");
        PurchaseList();
        dispatch(loadingStop());
      })
      .catch((error) => {
        dispatch(loadingStop());
        Toaster.error("Somthing went wrong", "topCenter");
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
              <Typography
                color="textPrimary"
                component="div"
                className="bredcrum-conatiner__bredcrum-normaltext"
              >
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
            {/* {console.log(widgetList)} */}
            {widgetList?.map((item, index) => {
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
                              ) : item.is_expiring_soon ? (
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
                                  {!item.is_paused &&
                                  item?.plan?.plan_type == "days" ? (
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
                                      {item.payment_method}
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

          // '''
          // filter == "active"
          //         ? item.is_active
          //         : filter == "expiresoon"
          //         ? item.is_expiring_soon
          //         : filter == "expired"
          //         ? !item.is_active
          //         : filter == "paused"
          //         ? item.is_paused
          //         : filter == "days"
          //         ? item.plan.plan_type == "days"
          //         : filter == "hits"
          //         ? item.plan.plan_type == "hits"
          //         : filter == "all"
          //         ? item.id
          //         : item.id
          // ''''
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
