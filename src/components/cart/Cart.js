import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import {
//   Grid,
//   Container,
//   Typography,
//   ButtonBase,
//   Breadcrumbs,
//   Tooltip,
//   Paper,
// } from "@mui/material";
import { Breadcrumbs } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import ButtonBase from "@material-ui/core/ButtonBase";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Header from "../Header";
import Footer from "../Footer";
import CustomPopup from "../CustomPopup";
import CustomButton from "../../components/widgets/Button";
import { BASE_URL, CHECKOUT, STRIPE } from "../../config/ApiUrl";
import { loadStripe } from "@stripe/stripe-js";
import { getItemFromCart, removeFromCart } from "../../redux/cart/action";
import SubscriptionUpdate from "../../components/SubscriptionType/subscriptUpdate";
import EmptyPage from "../emptyPage";
import emptyImg from "../../assets/images/empty.gif";
import ApiRequest from "../../util/ApiRequest";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import BlankSection from "../emptyPage/blankSection";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart.cartItems);
  const [is_renew, setRenew] = useState(false);
  const [productShow, setProductShow] = useState([]);
  const [isPageRendring, setIsPageRendring] = useState(true);

  useEffect(async () => {
    // debugger;
    dispatch(loadingStart());
    dispatch(
      getItemFromCart(() => {
        setIsPageRendring(false);
        dispatch(loadingStop());
      })
    );
  }, []);

  const handleRemove = (isProduct) => {
    dispatch(removeFromCart(isProduct));
  };

  const handleCheckout = async () => {
    let CheckOutValue = {
      user: user.user.pk,
      is_renew: "false",
    };
    const stripe = await loadStripe(STRIPE);

    dispatch(loadingStart());
    ApiRequest.request(CHECKOUT, "POST", CheckOutValue).then((res) => {
      stripe.redirectToCheckout({ sessionId: res.sessionId });
    });
  };

  return (
    <>
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
                Shopping Cart
              </Typography>
            </Breadcrumbs>
          </Container>
        </div>
        {isPageRendring ? (
          <BlankSection height="100vh" />
        ) : !isPageRendring && cart && cart.length ? (
          <div className="shoping-cart shopping-cart-data">
            <Container
              maxWidth="lg"
              className="shoping-cart__container sticky-position margin-top-174"
            >
              <Grid
                container
                spacing={3}
                className="shoping-cart__container-inr"
              >
                <Grid
                  item
                  xl={12}
                  lg={12}
                  md={12}
                  sm={12}
                  xs={12}
                  className="shoping-cart__left-card"
                >
                  Shopping Cart
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xl={9} lg={9} md={12} sm={12} xs={12}>
                  {cart.map((item, index) => {
                    return (
                      <Paper
                        className="shoping-cart__tool-card card-box-shadow border--colordata border-radius"
                        key={index}
                      >
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
                            <ButtonBase className="curent-tool-img">
                              <img
                                alt={item.widget?.name}
                                title={item.widget?.name}
                                src={BASE_URL + item.widget?.imgUrl}
                              />
                            </ButtonBase>
                          </Grid>
                          <Grid
                            item
                            xl={10}
                            lg={10}
                            md={10}
                            sm={12}
                            xs={12}
                            sm
                            container
                          >
                            <Grid
                              item
                              xs
                              container
                              direction="row"
                              spacing={2}
                              className="shoping-cart__subscription-card"
                            >
                              <Grid item xs>
                                <Typography
                                  gutterBottom
                                  component="div"
                                  className="shoping-cart__tool-title"
                                >
                                  {item.widget.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  gutterBottom
                                  className="shoping-cart__tool-discription"
                                >
                                  Description Description Description
                                  Description Description Description\
                                  Description Descri
                                  ptionDescriptionptionDescriptionptionDescriptionptionDescriptionptionDescriptionptionDescription
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item xl={2} lg={2} md={2} sm={2} xs={12}>
                              <Typography
                                component="div"
                                className="shoping-cart__total-amount"
                              >
                                {item.currency}
                                {Number(item.price).toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} container>
                              <Grid item md={10} sm={10} xs={10}>
                                <Typography
                                  component="div"
                                  className="shoping-cart__validity-input"
                                >
                                  <Typography
                                    component="p"
                                    className="shoping-cart__subscription-text"
                                  >
                                    Subscription for
                                  </Typography>
                                  <Typography component="span">
                                    {item.plan_value}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    className="shoping-cart__input-days"
                                  >
                                    {item.plan_type}
                                  </Typography>
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                md={2}
                                sm={2}
                                xs={12}
                                className="shoping-cart__tool-icons"
                              >
                                <Typography component="div">
                                  <Tooltip title="Edit" placement="top">
                                    <EditIcon
                                      className="shoping-cart__tool-tick"
                                      onClick={() => {
                                        setRenew(true);
                                        setProductShow(item);
                                      }}
                                    />
                                  </Tooltip>
                                  <Typography
                                    component="span"
                                    className="gray-color"
                                  >
                                    |
                                  </Typography>

                                  <Tooltip title="Delete" placement="top">
                                    <DeleteIcon
                                      className="shoping-cart__tool-delete"
                                      onClick={() => {
                                        // dispatch(removeFromCart(item.id));
                                        handleRemove(item.id);
                                        //setProduct(item.id);
                                      }}
                                    />
                                  </Tooltip>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    );
                  })}
                  {/* <div className="continue-button">
                    <Link to="/">
                      <CustomButton className="secondary-button">
                        <PlayCircleFilledWhiteIcon className="margin-right" />
                        Continue Shopping
                      </CustomButton>
                    </Link>
                  </div> */}
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
                    <div className="shoping-cart__coupon-hedding">
                      Need to pay
                    </div>
                    <div className="shoping-cart__coupon-amount">
                      $
                      {cart
                        .map((item) => item.price)
                        .reduce((acc, value) => +acc + +value)}
                    </div>
                    <div className="shoping-cart__coupon-code">
                      {/* <span align="center">Promotion code</span> */}
                      <div
                        className="shoping-cart__coupon-apply"
                        align="center"
                      >
                        <input
                          type="text"
                          className="shoping-cart__coupon-apply-input"
                          placeholder="Enter Promotion code"
                        />
                        <button>Apply</button>
                      </div>
                    </div>
                    <CustomButton
                      onClick={handleCheckout}
                      className="primary-button checkout-button"
                    >
                      <CheckCircleIcon /> Checkout
                    </CustomButton>
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
              {/*End card data*/}
            </Container>
          </div>
        ) : (
          <EmptyPage
            heading="Your cart is empty, Need to shop"
            imgUrl={emptyImg}
            buttonName="Continue Shoping"
          />
        )}
      </div>

      {/*Update into card*/}
      <CustomPopup
        open={is_renew}
        onClose={() => setRenew(false)}
        headerText="Edit Subscription"
        footerButton={true}
        className="border-radius popup-container__iner--sm"
      >
        <SubscriptionUpdate
          updateData={productShow}
          onClose={() => setRenew(false)}
        />
      </CustomPopup>
      {/*End*/}
      <Footer />
    </>
  );
};

export default Cart;
