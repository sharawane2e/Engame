import * as React from "react";
import { Link } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import CustomButton from "../widgets/Button";

const CartSingleItemLoader = () => {
  return (
    <Paper className="shoping-cart__tool-card card-box-shadow border--colordata border-radius">
      <Grid container spacing={3}>
        <Grid
          item
          xl={2}
          lg={2}
          md={2}
          sm={2}
          xs={12}
          container
          className="shoping-cart__tool-images"
        >
          <Grid item xs>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        </Grid>
        <Grid item xl={10} lg={10} md={10} sm={12} xs={12} sm container>
          <Grid
            item
            xs
            container
            direction="row"
            spacing={2}
            className="shoping-cart__subscription-card"
          >
            <Grid item xl={11} lg={11} md={11} sm={11} xs={12}>
              <Skeleton variant="text" width="40%" />

              <Skeleton variant="rectangular" height={50} />

              <Skeleton variant="text" width="70%" />
            </Grid>
          </Grid>
          <Grid item xl={1} lg={1} md={1} sm={1} xs={12}>
            <Skeleton variant="rectangular" width="100%" height={20} />
          </Grid>
          <Grid item xs={12} sm={12} container>
            <Grid item md={10} sm={10} xs={10}>
              <Skeleton variant="text" width="50%" />
            </Grid>
            <Grid
              item
              md={2}
              sm={2}
              xs={12}
              className="shoping-cart__tool-icons"
            >
              <Skeleton variant="rectangular" width="50%" height={20} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const CartLoader = (props) => {
  return (
    <div className="bredcrum-conatiner ">
      <div className="shoping-cart shopping-cart-data">
        <Container
          maxWidth="lg"
          className="shoping-cart__container sticky-position margin-top-174"
        >
          <Grid container spacing={3}>
            <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
              <CartSingleItemLoader />
              <CartSingleItemLoader />
            </Grid>
            <Grid
              item
              xl={3}
              lg={3}
              md={12}
              sm={12}
              xs={12}
              className="border-radius sticky-card-position"
            >
              <Paper className="shoping-cart__card-coupon " align="center">
                <div className="shoping-cart__coupon-hedding">Need to pay</div>
                <div className="shoping-cart__coupon-amount">
                  {/* {cartPrice} */}
                </div>
                <div className="shoping-cart__coupon-code">
                  {/* <span align="center">Promotion code</span> */}
                  <div className="shoping-cart__coupon-apply" align="center">
                    <Skeleton variant="text" width="100%" height={60} />
                  </div>
                </div>
                <Skeleton variant="text" width="100%" height={60} />
              </Paper>
              <div className="continue-button">
                <Link to="/">
                  <CustomButton className="secondary-button">
                    {/* <PlayCircleFilledWhiteIcon className="margin-right" /> */}
                    Continue Shopping
                  </CustomButton>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default CartLoader;
