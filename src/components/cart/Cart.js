import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useDispatch, useSelector } from "react-redux";
import empty from "../../assets/images/empty.gif";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../components/widgets/Button";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";
// import { removeFromCart } from "../../redux/cart/action";
import Footer from "../Footer";
import { BASE_URL, BASE_URL_1, STRIPE } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { loadStripe } from "@stripe/stripe-js";
import { getItemFromCart, removeFromCart } from "../../redux/cart/action";
import Tooltip from "@material-ui/core/Tooltip";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart.cartItems);
  const [is_renew, setRenew] = useState("false");

  useEffect(() => {
    dispatch(getItemFromCart());
  }, []);

  const handleRemove = (isProduct) => {
    dispatch(removeFromCart(isProduct));
  };

  // handleCheckout
  const handleCheckout = async () => {
    dispatch(loadingStart());
    const stripe = await loadStripe(STRIPE);
    try {
      await fetch(BASE_URL + "payments/checkout-session/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.access_token}`,
        },
        body: JSON.stringify({ user: user.user.pk }),
      })
        .then((response) => response.json())
        .then((result) => {
          //sessionStorage.setItem("sessionId", result.sessionId);
          stripe.redirectToCheckout({ sessionId: result.sessionId });
          dispatch(loadingStop());
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="bredcrum-conatiner ">
        <div className="bredcrum-conatiner__bredcrum_inr sticky-position">
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="bredcrum-conatiner__bredcrum-text"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              {/* <Link color="inherit" to="" >
                        Shopping Cart
              </Link> */}
              <Typography color="textPrimary">Shopping Cart</Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <div className="shoping-cart">
          {cart.length !== 0 ? (
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
                  xl={8}
                  lg={8}
                  md={8}
                  sm={6}
                  xs={12}
                  className="shoping-cart__left-card"
                >
                  Shopping Cart
                </Grid>
                <Grid
                  item
                  xl={4}
                  lg={4}
                  md={4}
                  sm={6}
                  xs={12}
                  className="shoping-cart__right-card"
                >
                  <Link to="/">
                    <CustomButton className="secondary-button">
                      <PlayCircleFilledWhiteIcon className="margin-right" />
                      Continue Shopping
                    </CustomButton>
                  </Link>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xl={9} lg={9} sm={9} xs={12}>
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
                          >
                            <ButtonBase className="curent-tool-img">
                              <img
                                alt={item.widget.name}
                                title={item.widget.name}
                                src={BASE_URL_1 + item.widget.imgUrl}
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
                              <Grid
                                item
                                md={6}
                                sm={12}
                                xs={12}
                                container
                                direction="column"
                              >
                                <Typography
                                  gutterBottom
                                  component="div"
                                  className="shoping-cart__subscription"
                                >
                                  <span>Subscription:</span>
                                  <select className="border-radius">
                                    <option
                                      value="days"
                                      selected={
                                        item.plan_type === "days"
                                          ? item.plan_type
                                          : null
                                      }
                                    >
                                      Number of days
                                    </option>
                                    <option
                                      value="hits"
                                      selected={
                                        item.plan_type === "hits"
                                          ? item.plan_type
                                          : null
                                      }
                                    >
                                      Number of hits
                                    </option>
                                  </select>
                                </Typography>
                              </Grid>

                              <Grid item md={4} sm={10} xs={10}>
                                <Typography
                                  component="div"
                                  className="shoping-cart__validity-input"
                                >
                                  <span>Validity:</span>
                                  <TextField
                                    type="number"
                                    id={"input-filed" + item.id}
                                    variant="outlined"
                                    value={item.plan_value}
                                    // onChange={item.plan_value}
                                  />
                                  <span className="shoping-cart__input-days">
                                    {item.plan_type}
                                  </span>
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
                                  <DoneIcon className="shoping-cart__tool-tick" />
                                  |
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
                  <div className="continue-button">
                    <Link to="/">
                      <CustomButton className="secondary-button">
                        <PlayCircleFilledWhiteIcon className="margin-right" />
                        Continue Shopping
                      </CustomButton>
                    </Link>
                  </div>
                </Grid>
                <Grid
                  item
                  xl={3}
                  lg={3}
                  sm={3}
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
                          className="shoping-cart__coupon-apply-input" placeholder="Enter Promotion code"
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
                </Grid>
              </Grid>
              {/*End card data*/}
            </Container>
          ) : (
            <div className="empty_cart margin-top-174">
              <img src={empty} alt="" />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
