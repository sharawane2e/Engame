import React from "react";
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

function Purchased(props) {
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
              <Typography color="textPrimary">Purchased tool</Typography>
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
                Purchased Tool
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
                    xs={2}
                    container
                    className="purchased-tool__tool-image"
                  >
                    <ButtonBase>
                      <img alt="" src={e2eLogo} />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={10} sm container>
                    <Grid item xs={3} container direction="column" spacing={2}>
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
                          </span>{" "}
                          <span className="subscription-day">Days</span>
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Access code:
                          </span>{" "}
                          <span className="subscription-day">251AB</span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container
                      direction="column"
                      spacing={2}
                      className="purchased-tool__tool-nodays"
                    >
                      <Grid item>
                        <Typography
                          gutterBottom
                          component="div"
                          className="purchased-tool__tool-left-day"
                        >
                          10 days left
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sm
                      xs={5}
                      className="purchased-tool__tool-validity"
                    >
                      <Typography component="div" className="tool-extned">
                        Extend validity
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        component="div"
                        className="purchased-tool__embeded-icon border-radius"
                      >
                        <SystemUpdateAltIcon />
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  className="purchased-tool__date-time"
                >
                  <Grid item xs={6}>
                    <Typography component="div">
                      <span className="purchased-on">Purchased on:</span>{" "}
                      <span className="purchased-date">10/01/2021 12:00PM</span>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} className="purchased-tool__expiry-date">
                    <Typography component="div" className="">
                      <span className="purchased-on">Expiry Date:</span>{" "}
                      <span className="purchased-date">
                        {" "}
                        21/06/2021 12:00PM
                      </span>
                    </Typography>
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
