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
// import GetAppIcon from "@material-ui/icons/GetApp";
import TimerIcon from "@material-ui/icons/Timer";
import { ReactComponent as CheckCircleIcon } from "../../assets/images/check-circle.svg";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
// import ReceiptIcon from "@material-ui/icons/Receipt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ExportToCsv } from "export-to-csv";
import Header from "../Header";
import CustomPopup from "../CustomPopup";
import Footer from "../Footer";
import Toaster from "../../util/Toaster";
import EmptyPage from "../emptyPage";
import ApiRequest from "../../util/ApiRequest";
import warning_icon from "../../assets/images/warning_icon.svg";
import CustomButton from "../widgets/Button";
import emptyWidgett from "../../assets/images/empty-widget.gif";
import SubscriptionRenew from "../SubscriptionType/subscriptRenew";
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
  CONSUMPTION_STATEMENT,
} from "../../config/ApiUrl";
import exportFromJSON from "export-from-json";
import NoSearchFound from "../NoSearchFound";
import NoresultImg from "../../assets/images/not-found.svg";
import { getItemFromCart } from "../../redux/cart/action";
import BlankSection from "../emptyPage/blankSection";
import Skeleton from "@mui/material/Skeleton";

const PurchaseSingleItem = () => {
  return (
    <Grid container spacing={3}>
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
                <span className="purchased-tool__date-type-text purchased-curent-text">
                  <Skeleton variant="text" width={200} />
                </span>
              </div>
            </Grid>

            <Grid
              item
              xs={2}
              container
              className="purchased-tool__tool-image purchased-image"
            >
              <Skeleton variant="rectangular" width="100%" height={150} />
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
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="50%" />
                </Grid>
              </Grid>
              <Grid item xs={2} className="grid-flex">
                <Skeleton variant="text" width="70%" />
              </Grid>

              <Grid
                item
                xs={12}
                container
                className="purchased-tool__tool-margin"
              >
                <Grid item xs={4}>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item xs={6} className="grid-flex">
                  <div className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle">
                    <Skeleton variant="text" width={50} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const PurchasedLoader = (props) => {
  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
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
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
            </Grid>
          </Grid>
          <PurchaseSingleItem />
          <PurchaseSingleItem />
          <PurchaseSingleItem />
        </Container>
      </div>
    </>
  );
};

export default PurchasedLoader;
