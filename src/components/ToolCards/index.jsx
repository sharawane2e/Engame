import React, { useState, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ToolPerview from "../ToolPerview";
import CustomPopup from "../CustomPopup";
import RemoveRedEyeIcon from "@material-ui/icons/RemoveRedEye";
import { useDispatch, useSelector } from "react-redux";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Embedcode from "../EmbedCode";
import CustomButton from "../../components/widgets/Button";
import Subscription from "../../components/SubscriptionType";
// import Toaster from "../../util/Toaster";
import LoadingBox from "../FullPageLoader/LoadingBox";
import MessageBox from "../FullPageLoader/MessageBox";
import { listProducts } from "../../redux/product/product-action";
import { BASE_URL, BASE_URL_1 } from "../../config/ApiUrl";
import Footer from "../Footer";
import Tooltip from "@material-ui/core/Tooltip";
import { logOutUser } from "../../redux/user/user-action";
import { useHistory } from "react-router-dom";
import { loadingStop } from "../../redux/loader/loader-actions";
// import Swal from "sweetalert2";
import Login from "../Login";
import Registration from "../Registration";
import warning_icon from "../../assets/images/warning_icon.svg";
// import EmailActive from "../EmailActivation";
import Typography from "@material-ui/core/Typography";
import { ErrorMessages } from "../../constants/Messages";

// import PropTypes from "prop-types";
// import Box from "@material-ui/core/Box";
// import Typography from "@material-ui/core/Typography";
// import Skeleton from "@material-ui/lab/Skeleton";
// import { addToCart } from "../../redux/shopping/shopping-action";

const ToolCards = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  const [isLoginrequire, setisLoginrequire] = useState(false);
  const [popupId, setPopupId] = useState();
  const [ispopup, setPopup] = useState(false);
  const [isSubscription, setSubscriptionPopup] = useState(false);
  const productList = useSelector((state) => state.productList);
  const user = useSelector((state) => state.user.isLoggedIn);
  const token = useSelector((state) => state.user);
  const { loading, error, products } = productList;
  const [productShow, setProductShow] = useState(products);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const setLoginAlert = (e) => {
    setisLoginrequire(false);
    setLoginIsOpen(true);
  };

  useEffect(() => {
    // document.body.classList.toggle("modal-open", ispopup);
    //document.body.classList.toggle("modal-open", isSubscription);
    if (user) {
      setLoginIsOpen(false);
      setReginIsOpen(false);
    }
  }, [user]);

  useEffect(() => {
    dispatch(listProducts());
    if (user) {
      let id = token.token.access_token;
      fetch(BASE_URL + "widget/user/detail/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${id}`,
        },
      })
        .then((result) => result.json())
        .then((response) => {
          if (response.code == "token_not_valid") {
            dispatch(logOutUser());
            localStorage.removeItem("auth");
            dispatch(loadingStop());
            history.push("/");
            // console.log("token expire", response);
          } else {
            setProductShow(response);
          }
        });
    }
  }, [token]);

  return (
    <>
      <Toolbar className="toolcard">
        {loading ? (
          <>
            <LoadingBox />
            {/* <Box width={210} marginRight={0.5} my={5}>
              <Skeleton variant="rect" width={210} height={118} />
              <Box pt={0.5}>
                <Skeleton />
                <Skeleton width="60%" />
              </Box>
            </Box> */}
          </>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : (
          <Grid container spacing={4}>
            {user
              ? productShow.map((tooldata, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      sm={4}
                      key={index}
                      id={tooldata.id}
                    >
                      <Paper className="toolcard__imageblck ">
                        <div className="toolcard__image">
                          <img src={BASE_URL + "media/" + tooldata.imgUrl} />
                          {/* <span>{tooldata.imgUrl}</span> */}
                          <div className="toolcard__preview">
                            <CustomButton
                              className="toolcard__perview-button"
                              onClick={() => handleToolClick(tooldata)}
                            >
                              <RemoveRedEyeIcon className="eyes_icon" /> Preview
                            </CustomButton>
                          </div>
                        </div>

                        <div className="toolcard__align toolcard__toolicons">
                          <div className="toolcard__items toolcard__download">
                            {user ? (
                              <div
                                className="toolcard__sub-icons"
                                onClick={() => {
                                  setPopup(true);
                                  setPopupId(tooldata.id);
                                }}
                              >
                                <Tooltip title="Embeded Code" placement="top">
                                  <SystemUpdateAltIcon />
                                </Tooltip>
                              </div>
                            ) : null}
                          </div>
                          <div className="toolcard__items toolcard__shopping">
                            {user ? (
                              <div
                                className="toolcard__sub-icons"
                                onClick={(id) => {
                                  setSubscriptionPopup(true);
                                  setPopupId(tooldata.id);
                                }}
                              >
                                <Tooltip title="Add To Cart" placement="top">
                                  <ShoppingCartIcon />
                                </Tooltip>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </Paper>
                      <div className="toolcard__align toolcard__toolname">
                        <div className="toolcard__aligninr1 toolcard__font-family">
                          {tooldata.toolname}
                        </div>
                        {/* <div className="toolcard__aligninr toolcard__font-family">
                          ${tooldata.price}
                        </div> */}
                      </div>
                    </Grid>
                  );
                })
              : products.map((tooldata, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      lg={2}
                      sm={4}
                      key={index}
                      id={tooldata.id}
                    >
                      <Paper className="toolcard__imageblck">
                        <div className="toolcard__image">
                          <img src={BASE_URL_1 + tooldata.imgUrl} />
                          {/* <span>{tooldata.imgUrl}</span> */}
                          <div className="toolcard__preview">
                            <CustomButton
                              className="toolcard__perview-button"
                              onClick={() => handleToolClick(tooldata)}
                            >
                              <RemoveRedEyeIcon className="eyes_icon" /> Preview
                            </CustomButton>
                          </div>
                        </div>

                        <div className="toolcard__align toolcard__toolicons">
                          <div className="toolcard__items toolcard__download">
                            {user ? (
                              <div
                                className="toolcard__sub-icons"
                                onClick={() => {
                                  setPopup(true);
                                  setPopupId(tooldata.id);
                                }}
                              >
                                <SystemUpdateAltIcon />
                              </div>
                            ) : (
                              <div
                                className="toolcard__sub-icons"
                                onClick={() => setisLoginrequire(true)}
                              >
                                {/* <Tooltip title="Embeded Code" placement="top"> */}
                                <SystemUpdateAltIcon />
                                {/* </Tooltip> */}
                              </div>
                            )}
                          </div>
                          <div className="toolcard__items toolcard__shopping">
                            {user ? (
                              <div className="toolcard__sub-icons">
                                {/* <ShoppingCartIcon  onClick= {(id) => {setSubscriptionPopup(true); setPopupId(tooldata.id)}}/>  */}
                                <ShoppingCartIcon />
                              </div>
                            ) : (
                              <div
                                className="toolcard__sub-icons"
                                onClick={() => setisLoginrequire(true)}
                              >
                                {/* <Tooltip title="Add To Cart" placement="top"> */}
                                <ShoppingCartIcon />
                                {/* </Tooltip> */}
                              </div>
                            )}
                          </div>
                        </div>
                      </Paper>
                      <div className="toolcard__align toolcard__toolname">
                        <div className="toolcard__aligninr1 toolcard__font-family">
                          {tooldata.toolname}
                        </div>
                        {/* <div className="toolcard__aligninr toolcard__font-family">
                          ${tooldata.price}
                        </div> */}
                      </div>
                    </Grid>
                  );
                })}
          </Grid>
        )}

        <CustomPopup
          open={isLoginOpen || isReginOpen}
          onClose={() => setLoginIsOpen(false)}
          className="popup-container__iner--xl border-radius popup-background"
        >
          {isLoginOpen ? (
            <Grid container spacing={3} className="popup-padding">
              {/* <Grid item xs={6} sm={6} className="login-background"></Grid> */}
              <Grid item xs={12} sm={12} lg={12}>
                <Login />
              </Grid>
            </Grid>
          ) : isReginOpen ? (
            <Grid container spacing={3} className="popup-padding">
              {/* <Grid item xs={6} sm={6} className="login-background"></Grid> */}
              <Grid item xs={12} sm={12} lg={12}>
                <Registration />
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </CustomPopup>

        <CustomPopup
          open={isLoginrequire}
          className="popup-container__iner--sm border-radius loginAlert "
        >
          <Grid container spacing={4} align="center">
            <Grid item xs={12}>
              <img
                className="message__img"
                src={warning_icon}
                alt="Registration Sucessfully"
              />
              <Typography component="p" className="sucess_message">
                {ErrorMessages.EmbededAlert}
              </Typography>
              {/* <p className="sucess_message"></p> */}
              <CustomButton
                className="primary-button"
                style={{ marginRight: "20px" }}
                onClick={setLoginAlert}
              >
                Login Here
              </CustomButton>
              <CustomButton
                className="secondary-button"
                onClick={() => setisLoginrequire(false)}
              >
                Cancel
              </CustomButton>
            </Grid>
          </Grid>
        </CustomPopup>

        {/*Perview tools code popup */}
        <CustomPopup
          open={selectedTool}
          onClose={() => setSelectedTool(null)}
          className="popup-container__iner--xxl border-radius tool-perview-data"
        >
          <ToolPerview tool={selectedTool}></ToolPerview>
        </CustomPopup>
        {/*End */}

        {/*Emneded code popup */}
        <CustomPopup
          open={ispopup}
          onClose={() => setPopup(false)}
          headerText="Embed code"
          className="border-radius popup-container__iner--xl-md"
        >
          <Embedcode data={productShow} toolId={popupId} />
        </CustomPopup>
        {/*End*/}

        {/*Add to cart */}
        <CustomPopup
          open={isSubscription}
          onClose={() => setSubscriptionPopup(false)}
          headerText="Subscription Type"
          footerButton={true}
          className="border-radius popup-container__iner--sm"
        >
          <Subscription
            data={products}
            toolId={popupId}
            onClose={() => setSubscriptionPopup(false)}
          />
        </CustomPopup>
        {/*End */}
      </Toolbar>
      <Footer />
    </>
  );
};

export default ToolCards;
