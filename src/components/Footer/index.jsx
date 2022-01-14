import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = (props) => {
  return (
    <>
      <div className="footer">
        <Grid container className="footer__gridmain">
          <Grid
            item
            xl={8}
            lg={8}
            md={8}
            sm={8}
            xs={12}
            className="footer__gridmain__gridInnerChild"
          >
            <Typography
              variant="div"
              component="div"
              className="footer__gridmain__gridInnerChild__atag"
            >
              <Link to="/privacy-policy">Privacy Policy</Link>{" "}
            </Typography>
            <Typography
              variant="div"
              component="div"
              className="footer__gridmain__gridInnerChild__atag"
            >
              {" "}
              <Link to="/refund-policy">Refund Policy</Link>
            </Typography>
            <Typography
              variant="div"
              component="div"
              className="footer__gridmain__gridInnerChild__atag"
            >
              <Link to="/terms-condition">Terms & Condition</Link>
            </Typography>
            <Typography
              variant="div"
              component="div"
              className="footer__gridmain__gridInnerChild__atag"
            >
              {" "}
              <Link to="/contact-us">Contact US</Link>
            </Typography>
          </Grid>

          <Grid
            item
            xl={4}
            lg={4}
            md={4}
            sm={4}
            xs={12}
            className="footer__gridmain__rightChild"
          >
            <Typography variant="p" gutterBottom>
              Copyright &copy; 2021 E2E Research Services Pvt. Ltd.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Footer;
