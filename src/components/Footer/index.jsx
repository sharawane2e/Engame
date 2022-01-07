import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = (props) => {
  return (
    <>
      <div className="footer">
        <Typography variant="p" gutterBottom className="">
          Copyright &copy; 2021 E2E Research Services Pvt. Ltd.
        </Typography>
      </div>
      <div className="lowerFooter">
        <Grid container>
          <Grid item xs={2} sm={3} md={3}>
            <Link to="/privacy-policy">Privacy Policy</Link>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Link to="/refund-policy">Refund Policy</Link>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Link to="/terms-condition">Terms & Condition</Link>
          </Grid>
          <Grid item xs={2} sm={3} md={3}>
            <Link to="/contact-us">Contact US</Link>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Footer;
