import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { connect, useDispatch } from "react-redux";
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
import { removeFromCart } from "../../redux/cart/action";
import Footer from "../Footer";

const Cart = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItem, setTotalItem] = useState(0);
  const dispatch = useDispatch();
  console.log(cart);
  useEffect(() => {
    let items = 0;
    let price = 0;
    cart.forEach((item) => {
      items += item.qty;
      price += +item.price;
    });
    setTotalPrice(price);
    setTotalItem(items);
  }, [cart, totalItem, totalPrice, setTotalItem, setTotalPrice]);

  return (
    <>
      <div className="shoping-cart bredcrum-conatiner">
        <Header />
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
        {cart.length !== 0 ? (
          <Container
            maxWidth="lg"
            className="shoping-cart__container sticky-position margin-top-174"
          >
            <Grid container spacing={3} className="shoping-cart__container-inr">
              <Grid
                item
                xl={8}
                lg={8}
                md={8}
                sm={12}
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
                sm={12}
                xs={12}
                className="shoping-cart__right-card"
              >
                <Link to="/">
                  {" "}
                  <CustomButton className="secondary-button">
                    <PlayCircleFilledWhiteIcon className="margin-right" />{" "}
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
                      className="shoping-cart__tool-card card-box-shadow border-allside-gray border-radius"
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
                              alt=""
                              src={"//192.168.1.124:8000" + item.image}
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
                                {item.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                gutterBottom
                                className="shoping-cart__tool-discription"
                              >
                                Description Description Description Description
                                Description Description\ Description Descri
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
                              {item.price}
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
                                  <option>Number of days</option>
                                  <option>2</option>
                                  <option>1</option>
                                  <option>1</option>
                                  <option>1</option>
                                  <option>1</option>
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
                                  id={"input-filed" + item.id}
                                  variant="outlined"
                                />
                                <span className="shoping-cart__input-days">
                                  Days
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
                                <DoneIcon className="shoping-cart__tool-tick" />{" "}
                                |{" "}
                                <DeleteIcon
                                  className="shoping-cart__tool-delete"
                                  onClick={() =>
                                    dispatch(removeFromCart(item.product))
                                  }
                                />
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
                    {" "}
                    <CustomButton className="secondary-button shopping-button">
                      <PlayCircleFilledWhiteIcon className="margin-right" />{" "}
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
                    ${totalPrice}
                  </div>
                  <div className="shoping-cart__coupon-code">
                    <span align="center">Promotion code</span>
                    <div className="shoping-cart__coupon-apply" align="center">
                      <input
                        type="text"
                        className="shoping-cart__coupon-apply-input"
                      />
                      <button>Apply</button>
                    </div>
                  </div>
                  <CustomButton className="primary-button checkout-button">
                    <CheckCircleIcon /> <Link to="/purchased">Checkout</Link>
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
      <Footer />
    </>
  );
};

const mapDispatchToProp = (state) => {
  return {
    cart: state.cart.cartItems,
  };
};

export default connect(mapDispatchToProp)(Cart);
