import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import UserProfileDrawer from "./userProfileDrawer";
import Footer from "../Footer";

const UserProfile = (props) => {
  const token = useSelector((state) => state.user.token);
  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
        <Header />
        <div className="bredcrum-conatiner__bredcrum_inr ">
          <Container maxWidth="lg" className="breadcrum-main">
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
                User Profile
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <div className="Drawer-container">
          <UserProfileDrawer />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default UserProfile;
