import React, { useEffect } from "react";
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
import { BASE_URL } from "../../config/ApiUrl";
import { useSelector } from "react-redux";
import PauseIcon from "@material-ui/icons/Pause";
import GetAppIcon from "@material-ui/icons/GetApp";

function Purchased(props) {
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    console.log(session_id);
    async function paymentSuccess() {
      fetch(BASE_URL + "payments/success/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({ user: token.user.pk, session_id: session_id }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }
    paymentSuccess();
  }, []);
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
            <Grid item xs={12} className="purchased-tool__hedding">
              <Typography component="div" className="hedding-text">
                My Widgets
              </Typography>
            </Grid>
          </Grid>
          {/*Card start */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border-allside-gray border-radius">
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
                        10/01/2021
                      </span>
                      <span className="purchased-tool__date-type-time">
                        12:00PM
                      </span>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    container
                    className="purchased-tool__tool-image"
                  >
                    <ButtonBase>
                      <img alt="" src={e2eLogo} />
                    </ButtonBase>
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
                          Target Drag & Drop
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Subscription type:
                          </span>
                          <span className="subscription-day">Days</span>
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Trial Key:
                          </span>
                          <span className="subscription-day">251AB</span>
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
                      <Typography component="div">fsdbkjfdhsfkj</Typography>
                    </Grid>
                    <Typography
                      component="div"
                      className="purchased-tool__tool-type"
                    >
                      <span className="subscription-type-text">
                        Expiry Date:
                      </span>
                      <span className="subscription-day">
                        21/06/2021 12:00PM
                      </span>
                    </Typography>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    container
                    className="purchased-tool__tool-data accordion-margin"
                  >
                    <Grid item xs={6}>
                      <Typography component="div">
                        <span className="purchased-on">Total Amount:</span>
                        <span className="purchased-date">$512</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="">
                        <span className="purchased-on">
                          <GetAppIcon />
                        </span>
                        <span className="purchased-date">Net banking</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography component="div">
                        <span className="purchased-on">Total Amount:</span>
                        <span className="purchased-date">$512</span>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="">
                        <span className="purchased-on">Payment Method: </span>
                        <span className="purchased-date"> Net banking</span>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {/*Card end */}
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default Purchased;
