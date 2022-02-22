import * as React from "react";
import { useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CustomButton from "../widgets/Button";
import { Typography } from "@mui/material";

const CartViewLoader = () => {
  const history = useHistory();

  const handelRedirectCart = () => {
    history.push("./cart");
  };

  return (
    <div className="bredcrum-conatiner ">
      <div className=" cartLoaderContaine.r">
        <div className="quickCart__cartDetails__topBanner">
          <div className="quickCart__cartDetails__topBanner__leftPart">
            <Typography
              component="p"
              className="quickCart__cartDetails__topBanner__leftPart__shopingCart"
            >
              Shopping cart
            </Typography>
          </div>
          <div className="quickCart__cartDetails__topBanner__rightPart">
            <Typography
              component="p"
              className="quickCart__cartDetails__topBanner__rightPart__viewCart"
              onClick={handelRedirectCart}
            >
              View cart
            </Typography>
          </div>
        </div>
        <Container
          maxWidth="lg"
          className="shoping-cart__container margin-top-174"
        >
          <Paper className="cartLoader border--colordata border-radius paper-first-container" >
            <Grid container spacing={3} className=" paper-first-container">
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" height="100%" width="100%" />
              </Grid>

              <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                <Skeleton
                  animation="wave"
                  height="40%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height="40%" />
              </Grid>

              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" width="40%" height={20} />

                <Skeleton variant="text" width="40%" height={20} />
              </Grid>
            </Grid>
          </Paper>
          <Paper className="cartLoader border--colordata border-radius">
            <Grid container spacing={3}>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" height="100%" width="100%" />
              </Grid>

              <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                <Skeleton
                  animation="wave"
                  height="40%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height="40%" />
              </Grid>

              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" width="40%" height={20} />

                <Skeleton variant="text" width="40%" height={20} marginBottom = {20} />
              </Grid>
            </Grid>
          </Paper>
          {/* <Paper className="cartLoader border--colordata border-radius">
            <Grid container spacing={3}>
              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" height="100%" width="100%" />
              </Grid>

              <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
                <Skeleton
                  animation="wave"
                  height="40%"
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height="40%" />
              </Grid>

              <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                <Skeleton variant="text" width="40%" height={20} />

                <Skeleton variant="text" width="40%" height={20} />
              </Grid>

              
              
            </Grid>
           
          </Paper> */}

          <Paper className="cartLoader__paper-last-container">
          <Grid container spacing={3}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
                <Skeleton variant="text" height="50px" width="100%" />
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className="skeleton-button" >
                <Skeleton variant="text" height="70px" width="160px" className="checkout-button" />
               
              </Grid>
              </Grid>
              </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default CartViewLoader;
