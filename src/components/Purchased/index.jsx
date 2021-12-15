import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SwitchUnstyled from "@mui/core/SwitchUnstyled";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ReactComponent as EmbdedCodeImg } from "../../assets/images/embed-code.svg";
import { ReactComponent as ConsumptionReportImg } from "../../assets/images/consumption-report.svg";
import { ReactComponent as DownloadInvoiceImg } from "../../assets/images/Invoice.svg";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import TimerIcon from "@material-ui/icons/Timer";
import { ReactComponent as CheckCircleIcon } from "../../assets/images/check-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
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
import { ErrorMessages } from "../../constants/Messages";
import { removeFromCart } from "../../redux/cart/action";
import {
  PURCHASED_ITEM,
  PLAY_PAUSE,
  PAYMENT_SUCESS,
  CONSUMPTION_STATEMENT,
} from "../../config/ApiUrl";
import NoSearchFound from "../NoSearchFound";
import NoresultImg from "../../assets/images/not-found.svg";
import { getItemFromCart } from "../../redux/cart/action";
import PurchasedLoader from "./purchaseLoader";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import LocalStorageUtils from "../../util/LocalStorageUtils";
import LocalStorageType from "../../config/LocalStorageType";

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

const Purchased = (props) => {
  const dispatch = useDispatch();
  const [isShow, setShow] = useState([]);
  const [is_renew, setRenew] = useState(false);
  const [widgetList, setWidgetList] = useState([]);
  const [productShow, setProductShow] = useState([]);
  const token = useSelector((state) => state.user.token);
  const [isPausePopup, setPausePopup] = useState(false); // Popup on play and Pause
  const [PlayPauseValue, setPlayPauseValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [isPurchaseEmpty, setIsPurchaseEmpty] = useState();

  const [sucess, setSucess] = useState("Copy");

  var curentPlanID = localStorage.getItem("productShow");
  var curentUpdatePrice = localStorage.getItem("valuePrice");

  useEffect(() => {
    // dispatch(loadingStart());
    paymentSuccess();
  }, [token]);

  // Download embded code
  const downloadfile = (fileName, embedcode) => {
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(
      new Blob([embedcode], {
        type: "application/octet-stream",
      })
    );
    link.download = fileName + ".html";
    document.body.appendChild(link);
    link.click();
  };

  // Consumption report
  const downloadConsumptionStatement = async (purchased_id, widgetName) => {
    dispatch(loadingStart());

    let PurchasedData = {
      user: token.user.pk,
      purchased_id: purchased_id,
    };

    await ApiRequest.request(CONSUMPTION_STATEMENT, "POST", PurchasedData).then(
      (res) => {
        if (res.hasOwnProperty("status") && !res?.state) {
          Toaster.error(res.detail.message, "topCenter");
          setTimeout(() => {
            dispatch(loadingStop());
          }, 1000);
        } else {
          const convertTOJson = () => {
            const lines = res.split("\n");
            const result = [];
            const headers = lines[0].split(",");

            for (let i = 1; i < lines.length; i++) {
              if (!lines[i]) continue;
              const obj = {};
              const currentline = lines[i].split(",");

              for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
              }
              result.push(obj);
            }
            return result;
          };
          const apiData = convertTOJson();

          const fileName = `${widgetName}-consumption-report`;
          const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const fileExtension = ".xlsx";

          const exportToExcel = (apiData, fileName) => {
            const ws = XLSX.utils.json_to_sheet(apiData);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
            });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
          };

          exportToExcel(apiData, fileName);

          dispatch(loadingStop());
        }
      }
    );
  };

  const paymentSuccess = async () => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id")
      ? params.get("session_id")
      : null;
    let subscriptionRenew = (await localStorage.getItem("ExtendData"))
      ? true
      : false;

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

    if (session_id) {
      await ApiRequest.request(PAYMENT_SUCESS, "POST", PaymentSucessData)
        .then((res) => {
          if (res.status) {
            dispatch(removeFromCart());
            LocalStorageUtils.setLocalStorage(
              LocalStorageType.REMOVE,
              "ExtendData"
            );
          }
        })
        .finally(() => {
          PurchaseList();
          dispatch(getItemFromCart());
        });
    } else {
      PurchaseList();
      // dispatch(getItemFromCart());
    }
  };

  //  Purchase list
  const PurchaseList = async () => {
    ApiRequest.request(PURCHASED_ITEM)
      .then(async (res) => {
        await setWidgetList(res.data);
        const isShowArr = [];
        res.data.forEach((el, index) => {
          isShowArr.push(false);
        });
        if (res.data.length == 0) {
          setIsPurchaseEmpty(true);
        } else {
          setIsPurchaseEmpty(false);
        }
      })
      .finally(() => {
        dispatch(loadingStop());
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

    ApiRequest.request(PLAY_PAUSE, "POST", ItemData).then((res) => {
      if (res.status) {
        PurchaseList();
      } else {
        Toaster.error(res.detail.message, "topCenter");
      }
    });
  };

  const handleExtendLocal = (widgetId) => {
    LocalStorageUtils.setLocalStorage(
      LocalStorageType.SET,
      "productShow",
      widgetId.plan.id
    );
  };

  const FilterData = widgetList?.filter((item, index) => {
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
      return item;
    }
  });

  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
        <Header />
        <div className="bredcrum-conatiner__bredcrum_inr ">
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
        {!widgetList.length == 0 ? (
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
            <Grid container spacing={3} className="purchased-tool__filterTabs">
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
                  Days Subs.
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

            {FilterData.length > 0 ? (
              FilterData?.map((item, index) => {
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
                              src={BASE_URL + "/media/" + item.widget.imgUrl}
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
                                        {item.secrate_key.substr(0, 5)}
                                        ********
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
                                          {item.trial_key.substr(0, 5)}
                                          ********
                                        </span>
                                        <FileCopyIcon className="subscription-day__icon" />
                                      </span>
                                    </CopyToClipboard>
                                  </Tooltip>
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xs={2} className="grid-flex">
                              <Tooltip title="Play / Pause" placement="top">
                                <Typography
                                  component="div"
                                  className=" border-radius "
                                >
                                  <SwitchUnstyled
                                    checked={item.is_paused ? false : true}
                                    onClick={() => {
                                      setPausePopup(true);
                                      setPlayPauseValue(item);
                                    }}
                                  />
                                </Typography>
                              </Tooltip>
                              <Tooltip title="Extend validity" placement="top">
                                <Typography
                                  component="div"
                                  className="extend-validity"
                                  // onClick={() => //handleExtend(item)}
                                  onClick={() => {
                                    setRenew(true);
                                    setProductShow(item);
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
                                      <span className=" expiry-type margin-rightdata">
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
                                  className="purchased-tool__tool-type align-center progress-bar"
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
                              <Grid item xs={12} sm={6}>
                                <Typography component="div">
                                  <div className="purchased-tool__purchased-date">
                                    <span className="purchased-tool__date-type-text purchased-curent-text">
                                      Total Amount:
                                    </span>
                                    <span className="purchased-tool__date-type-text bold-style">
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
                                xs={12}
                                sm={6}
                                className="mobile__only"
                              >
                                <Typography
                                  component="div"
                                  className="cursor--pointer purchased-tool__doenloadP"
                                >
                                  DOWNLOAD
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                sm={6}
                                className="purchased-tool__expiry-date"
                              >
                                <div className="desktop__only">
                                  <Typography
                                    component="div"
                                    className="cursor--pointer purchased-tool__Indicator"
                                  >
                                    <div className="purchased-tool__purchased-date ">
                                      <span className="purchased-tool__date-type-text purchased-curent-text"></span>
                                      <span className="purchased-tool__date-type-text purchased-types">
                                        DOWNLOAD
                                      </span>
                                    </div>
                                  </Typography>
                                </div>
                                <div className="purchased-tool__embeded-Fdiv">
                                  <Tooltip
                                    title="Download Invoice"
                                    placement="top"
                                  >
                                    <Typography
                                      component="div"
                                      className="purchased-tool__embeded-icon border-radius"
                                    >
                                      <DownloadInvoiceImg />
                                    </Typography>
                                  </Tooltip>
                                </div>
                                <div className="purchased-tool__embeded-div">
                                  <Tooltip
                                    title="Consumption statement"
                                    placement="top"
                                  >
                                    <Typography
                                      component="div"
                                      className="purchased-tool__embeded-icon border-radius"
                                      onClick={() =>
                                        downloadConsumptionStatement(
                                          item.id,
                                          item.widget.name
                                        )
                                      }
                                    >
                                      <ConsumptionReportImg />
                                    </Typography>
                                  </Tooltip>
                                </div>
                                <div className="purchased-tool__embeded-div">
                                  <Tooltip title="Embeded Code" placement="top">
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
                                      <EmbdedCodeImg />
                                    </Typography>
                                  </Tooltip>
                                </div>
                              </Grid>
                            </Grid>
                          ) : null}
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                );
              })
            ) : (
              <NoSearchFound img={NoresultImg} heading="No result found" />
            )}
          </Container>
        ) : isPurchaseEmpty && FilterData.length == 0 ? (
          <EmptyPage
            heading={ErrorMessages.purchaseCart}
            imgUrl={emptyWidgett}
            buttonName="Continue Shoping"
          />
        ) : (
          <PurchasedLoader />
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
                {PlayPauseValue.is_paused &&
                PlayPauseValue.plan?.plan_type == "days"
                  ? ErrorMessages.DAYS_WIDGET_ON_PLAY
                  : !PlayPauseValue.is_paused &&
                    PlayPauseValue.plan?.plan_type == "days"
                  ? ErrorMessages.DAYS_WIDGET_ON_PAUSE
                  : PlayPauseValue.is_paused &&
                    PlayPauseValue.plan?.plan_type == "hits"
                  ? ErrorMessages.HITS_WIDGET_ON_PLAY
                  : ErrorMessages.HITS_WIDGET_ON_PAUSE}
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
};

export default Purchased;
