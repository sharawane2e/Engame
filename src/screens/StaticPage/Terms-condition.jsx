import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const TermsCondition = () => {
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
        <Container maxWidth="xl">
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

                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Our contact information
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Eveniet, itaque totam laborum adipisci, cum aspernatur iste
                  aliquam accusamus rerum quos eligendi rem consequuntur quod
                  illo voluptatem esse placeat asperiores reiciendis.
                </Typography>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TermsCondition;
