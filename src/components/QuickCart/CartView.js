import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import CustomButton from "../widgets/Button";
import { BASE_URL, CHECKOUT } from "../../config/ApiUrl";
// import { loadStripe } from "@stripe/stripe-js";
import { getItemFromCart, removeFromCart } from "../../redux/cart/action";
import SubscriptionUpdate from "../SubscriptionType/subscriptUpdate";
import EmptyPage from "../emptyPage";
import emptyImg from "../../assets/images/empty.gif";
import ApiRequest from "../../util/ApiRequest";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import CartLoader from "../cart/cartLoader";
import { ErrorMessages } from "../../constants/Messages";
import Toaster from "../../util/Toaster";
import LocalStorageUtils from "../../util/LocalStorageUtils";
import LocalStorageType from "../../config/LocalStorageType";
import CancelIcon from "@mui/icons-material/Cancel";
import NoSearchFound from "../NoSearchFound";
import CartViewLoader from "../cart/cartViewLoader";

const CartView = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart.cartItems);
  const [is_renew, setRenew] = useState(false);
  const [productShow, setProductShow] = useState([]);
  const [isPageRendring, setIsPageRendring] = useState(true);
  const[checkoutResponse, setcheckoutResponse] = useState();

  useEffect(async () => {
    getCartItem()
  }, []);



  const handelRedirectCart = () => {
    history.push("./cart");
  };
  const getCartItem = ()=>{
    dispatch(
      getItemFromCart(() => {
        setIsPageRendring(false);
      })
    );
  }
  const handleRemove = async (isProduct) => {
    setIsPageRendring(true);
    await dispatch(removeFromCart(isProduct));
    await getCartItem();
  };

  const handleCheckout = async () => {
    let CheckOutValue = {
      user: user.user.pk,
      is_renew: "false",
    };
    // const stripe = await loadStripe(STRIPE);

   dispatch(loadingStart());
    ApiRequest.request(CHECKOUT, "POST", CheckOutValue).then((res) => {
      if (res.status) {
        setcheckoutResponse(res?.data[0]?.responseData)
        windowLocationHtml(res?.data[0]?.responseData);
      //  stripe.redirectToCheckout({ sessionId: res.data[0].sessionId });
        LocalStorageUtils.setLocalStorage(
          LocalStorageType.SET,
          "isPayment",
          true
        );
      } 
      else {
        Toaster.error(res?.detail?.message, "topCenter");
      }
      dispatch(loadingStop());
    });
  };
  const windowLocationHtml = (data)=>{
    let myWindow = window.open("","_self")
    myWindow.document.write(data)
}
  return (
    <>
      <div className="quickCart">
        {isPageRendring ? (
          <CartViewLoader />
        ) : !isPageRendring && cart && cart.length ? (
          <div className="shoping-cart shopping-cart-data quickCart__cartDetails">
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
              className="quickCart__cartDetails__itemDetails custom-scroll"
            >
              {cart.map((item, index) => {
                return (
                  <Paper
                    className="shoping-cart__tool-card card-box-shadow border--colordata border-radius"
                    key={index}
                  >
                    <Grid container spacing={3}>
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
                          <div className="quickCart__cartDetails__itemDetails__toolImg">
                            <img
                              alt={item.name}
                              title={item.name}
                              src={BASE_URL + item.widget?.imgUrl}
                              className="quickCart__widgetImages"
                            />
                          </div>
                        </Grid>
                        <Grid
                          item
                          xl={10}
                          lg={10}
                          md={10}
                          sm={10}
                          xs={12}
                          container
                        >
                          <Grid
                            item
                            xl={12}
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            container
                            direction="row"
                            spacing={2}
                            className="quickCart__cartDetails__itemDetails__subscription-card"
                          >
                            <Grid
                              item
                              xl={8}
                              lg={8}
                              md={8}
                              sm={8}
                              xs={8}
                              className="quickCart__cartDetails__itemDetails__subscription-card__div"
                            >
                              <Typography
                                gutterBottom
                                component="div"
                                className="quickCart__cartDetails__itemDetails__subscription-card__tool-title"
                              >
                                {item.widget.name}
                              </Typography>
                            </Grid>
                            <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
                              <Typography
                                component="div"
                                className="quickCart__cartDetails__itemDetails__Itemamount"
                              >
                                {item.currency}
                                {Number(item.price).toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12} container>
                            <Grid item md={11} sm={11} xs={11}>
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
                              md={1}
                              sm={1}
                              xs={1}
                              className="shoping-cart__tool-icons"
                            >
                              <Typography component="div">
                                {/* <Tooltip title="Edit" placement="top">
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
                                  </Typography> */}

                                <Tooltip title="Remove" placement="top">
                                  <CancelIcon
                                    className="shoping-cart__tool-delete quickCart__cartDetails__itemDetails__deleteIcon"
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
                    </Grid>
                  </Paper>
                );
              })}

              {/*End card data*/}
            </Container>
            <div className="quickCart__checkout">
              <Grid
                item
                xl={12}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="border-radius sticky-card-position"
              >
                <Paper
                  className="shoping-cart__card-coupon quickCart__checkout__card-coupon"
                  align="center"
                >
                  <div className="quickCart__checkout__card-coupon__totalAmount">
                    <div className="shoping-cart__coupon-hedding">Total</div>
                    <div className="quickCart__checkout__card-coupon__totalAmount__amount">
                    {cart[0]?.currency}
                      {cart
                        .map((item) => item.price)
                        .reduce((acc, value) => +acc + +value)}
                    </div>
                  </div>

                  <CustomButton
                    onClick={handleCheckout}
                    className="primary-button checkout-button"
                  >
                    {/* <CheckCircleIcon /> */}
                    Checkout
                  </CustomButton>
                </Paper>
              </Grid>
            </div>
          </div>
        ) : (
          <div className="quickCart__emptySection">
            <EmptyPage
              heading={ErrorMessages.cartEmpty}
              imgUrl={emptyImg}
              buttonName="Continue Shoping"
            />
          </div>
          // <CartViewLoader />

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
    </>
  );
};

export default CartView;
