import React from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = (props) => {
  return (
    <>
      <div className="footer">
        <Grid container className="footer__gridmain">
          <Grid item xs={10} className="footer__gridmain__gridInnerChild">
            <Typography variant="div" component="div" className="footer__gridmain__gridInnerChild__atag">
              <Link to="/privacy-policy">Privacy Policy</Link> </Typography>
            <Typography variant="div" component="div" className="footer__gridmain__gridInnerChild__atag"> <Link to="/refund-policy">Refund Policy</Link></Typography>
            <Typography variant="div" component="div" className="footer__gridmain__gridInnerChild__atag"><Link to="/terms-condition">Terms & Condition</Link></Typography>
            <Typography variant="div" component="div" className="footer__gridmain__gridInnerChild__atag"> <Link to="/contact-us">Contact US</Link></Typography>

          </Grid>

          <Grid item xs={2} className="footer__gridmain__rightChild">
            <Typography variant="p" gutterBottom >
              Copyright &copy; 2021 E2E Research Services Pvt. Ltd.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Footer;
