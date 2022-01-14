import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Footer from "../../components/Footer";
import { Grid, Paper } from "@material-ui/core";
import ContactForm from "./contact-form";
import GoogleMap from "../StaticPage/map/google-map-react";
const locations = require("../StaticPage/map/locations.json");

const ContactUS = () => {
  return (
    <div className="StaticPage">
      <Header />
      <div className="bredcrum-conatiner ">
        <div className="bredcrum-conatiner__bredcrum_inr">
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
                className="bredcrum-conatiner__bredcrum-normaltext"
              >
                Contact us
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container maxWidth="lg">
          <div className="StaticPage__div">
            <Paper elevation={0}>
              <div className="StaticPage__div__container">
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__mainHeading"
                >
                  Contact US
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <div className="contact-head">
                      <div className="contact-head__text">India</div>
                      <p>
                        409, D-21 Corporate Park,
                        <br />
                        Dwarka, ND 110077
                      </p>
                      <div className="contact-head__text__con-info-panel">
                        <div className="contact-head__text__con-info-panel__con-info">
                          Phone:{" "}
                          <a href="tel:+91 11 46109435">
                            <span>+91 11 46109435</span>
                          </a>
                        </div>
                        <div className="contact-head__text__con-info-panel__con-info">
                          Email:{" "}
                          <a href="mailto:info@e2eresearch.com">
                            info@e2eresearch.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                    <div className="contact-head">
                      <div className="contact-head__text">US</div>
                      <p>
                        19 W, 34th Street Suite, 1021
                        <br />
                        New York, NY 10001
                      </p>
                      <div className="contact-head__text__con-info-panel">
                        <div className="contact-head__text__con-info-panel__con-info">
                          Phone:{" "}
                          <a href="tel:1-917-962-0521">
                            <span>+1-917-962-0521</span>
                          </a>
                        </div>
                        <div className="contact-head__text__con-info-panel__con-info">
                          Email:{" "}
                          <a href="mailto:info@e2eresearch.com">
                            info@e2eresearch.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
                <div className="Info-data">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <div className="Info-data__wrapper">
                        <p className="Info-data__wrapper__context-text">
                          Let's Work Together
                        </p>
                        <p>We’d love to hear from you!</p>
                      </div>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                      <div className="Form_container">
                        <ContactForm />
                      </div>
                    </Grid>
                    <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                      <div>
                        <p className="Info-data__wrapper__context-text">Map</p>
                        <GoogleMap locations={locations} />
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.264378928!2d77.06487091549418!3d28.56182279402765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04a34db9b4ab%3A0x8966e0b626355651!2sE2E%20Research%20Services%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1641906380680!5m2!1sen!2sin" width="100%" height="300" allowfullscreen="" loading="lazy"></iframe> */}
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUS;
