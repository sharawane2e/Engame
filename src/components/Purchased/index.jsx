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
import CustomPopup from "../CustomPopup";
import SubscriptionRenew from "../../components/SubscriptionType/subscriptRenew";
// import { useHistory } from "react-router-dom";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Tooltip from "@material-ui/core/Tooltip";
import { loadStripe } from "@stripe/stripe-js";
import Switch from "@material-ui/core/Switch";
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/core/SwitchUnstyled";
import { logOutUser } from "../../redux/user/user-action";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { PaymentData } from "../../redux/payment/paymeant-action";

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

// For switch
const Root = styled("span")(`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 32px;
  height: 20px;
  
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: #B3C3D3;
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #FFF;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: rgba(255,255,255,1);
    box-shadow: 0 0 1px 8px rgba(0,0,0,0.25);
  }

  &.${switchUnstyledClasses.checked} { 
    .${switchUnstyledClasses.thumb} {
      left: 14px;
      top: 3px;
      background-color: #FFF;
    }

    .${switchUnstyledClasses.track} {
      background: #F15B5B;
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }`);

function Purchased(props) {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [is_renew, setRenew] = useState(false);
  const [isextend, setExtend] = useState("true");
  const [productShow, setProductShow] = useState([]);
  const user = useSelector((state) => state.user.token);
  // const [embedCodeDownolad, setCodeDwoanlod] = useState([]);
  const [sucess, setSucess] = useState("Copy");
  const history = useHistory();
  console.log(productShow);

  // localStorage.setItem(
  //   "productShow",
  //   productShow.length > 0 ? productShow.plan.id : ""
  // );
  var curentPlanID = localStorage.getItem("productShow");

  // console.log("productShow", productShow.plan.id);

  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } }; // for switch button

  const token = useSelector((state) => state.user.token);

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
          dispatch(loadingStop());
          setWidgets(result);
          console.log(result);
          const isShowArr = [];
          result.forEach((el, index) => {
            isShowArr.push(false);
          });
          setShow(isShowArr);
        }
      });
  };

  useEffect(() => {
    const search = props.location.search;
    console.log(props.location.search);
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");

    async function paymentSuccess() {
      if (isextend == "false" || isextend == false) {
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
              //window.location.reload();
            } else {
              Toaster.sucess(result.details, "topCenter");
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
            console.log("sss", result);
            if (
              result.details == "code CE13204 Internal server error!" ||
              result.deiail == "code CE13204 Internal server error!" ||
              result.details == "Payment already done !"
            ) {
              //Toaster.error("Some thing went wrong", "topCenter");
            } else {
              Toaster.sucess(result.details, "topCenter");
            } // history.push(history.path);
          });
      }
    }
    paymentSuccess();

    myWwidgets();
  }, [token]);

  const PlayNPause = async (purchaseId, Paused) => {
    let pausedStatus = String(Paused);
    dispatch(loadingStart());
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
          // window.location.reload();
          Toaster.sucess(result.message, "topCenter");
          myWwidgets();
          dispatch(loadingStop());
        }
      });
  };

  const handleExtendLocal = (widgetId) => {
    // const plan_new_value, planId
    localStorage.setItem("productShow", widgetId.plan.id);
    // console.log("widgets");
    // const plan = widgets.plan.id;
    // const plan_new_value = "2306";
    // const subscription = widgetId;
    // const widget = widgets.widget.id;
    // const price = "200";
    // const currency = "USD";
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
              {/* <Link color="inherit" to="/cart">
                Shopping Cart
              </Link> */}
              <Typography color="textPrimary" variant="span">
                My Widgets
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container
          maxWidth="lg"
          className="purchased-tool__container  margin-top-174"
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              className="purchased-tool__hedding purchased-tool__borderdata"
            >
              <Typography component="div" className="hedding-text">
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
              <Typography component="div" className="tab--button border-radius">
                Days Subs.
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Hits Subs.
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
                                      setTimeout(() => setSucess("Copy"), 500);
                                    }}
                                  >
                                    {item.secrate_key.substr(0, 10)}************
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
                                      setTimeout(() => setSucess("Copy"), 500);
                                    }}
                                  >
                                    <span className="display-flex">
                                      {item.trial_key.substr(0, 10)}************
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
                            <SwitchUnstyled
                              component={Root}
                              {...label}
                              defaultChecked={item.is_paused ? false : true}
                              onClick={() =>
                                PlayNPause(item.plan.id, item.is_paused)
                              }
                            />
                          </Typography>

                          <Typography
                            component="div"
                            className="extend-validity"
                            // onClick={() => //handleExtend(item)}
                            onClick={() => {
                              setRenew(true);
                              setProductShow(item);
                              setExtend(true);
                              handleExtendLocal(item);
                            }}
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

        {/*Renew Subscription*/}
        <CustomPopup
          open={is_renew}
          onClose={() => setRenew(false)}
          headerText="Renew Subscription"
          footerButton={true}
          className="border-radius popup-container__iner--sm"
        >
          <SubscriptionRenew
            updateData={productShow}
            onClose={() => setRenew(false)}
          />
        </CustomPopup>

        <Footer />
      </div>
    </>
  );
}

export default Purchased;
