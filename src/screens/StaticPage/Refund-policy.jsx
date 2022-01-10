import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { Breadcrumbs } from "@material-ui/core";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Footer from "../../components/Footer";

const RefundPolicy = () => {
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
                Refund Policy
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
                  Return & Refund Policy
                </Typography>

                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Thanks for shopping at My Site (change this).
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If you are not entirely satisfied with your purchase, we're
                  here to help.
                </Typography>
                {/* RETURN */}
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Returns
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  You have 30 (change this) calendar days to return an item from
                  the date you received it.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  To be eligible for a return, your item must be unused and in
                  the same condition that you received it.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Your item must be in the original packaging.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Your item needs to have the receipt or proof of purchase.
                </Typography>
                {/* REFUND */}
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Refunds
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Once we receive your item, we will inspect it and notify you
                  that we have received your returned
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  item. We will immediately notify you on the status of your
                  refund after inspecting the item.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If your return is approved, we will initiate a refund to your
                  credit card (or original method of payment).
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  You will receive the credit within a certain amount of days,
                  depending on your card issuer's policies.
                </Typography>
                {/* SHIPPING */}
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Shipping
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  You will be responsible for paying for your own shipping costs
                  for returning your item. Shipping costs are non­refundable.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If you receive a refund, the cost of return shipping will be
                  deducted from your refund.
                </Typography>
                {/* NON-REFUNDABLE */}
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Non- Refundable/ Non- returnable Products / Services:
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Certain Products / Services are non- returnable and Non
                  Refundable : such products and services cannot be claimed
                  under this refund / return policy.
                </Typography>
                {/* CONTACT-US */}
                <Typography
                  variant="h"
                  gutterBottom
                  className="StaticPage__div__container__heading"
                >
                  Contact Us
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  If you have any questions on how to return your item to us,
                  contact us.
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Email id here:
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Contact Number here :
                </Typography>
                <Typography
                  variant="p"
                  gutterBottom
                  className="StaticPage__div__container__discription"
                >
                  Postal Address :
                </Typography>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
