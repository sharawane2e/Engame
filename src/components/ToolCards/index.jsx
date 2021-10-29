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
import LoadingBox from "../FullPageLoader/LoadingBox";
import MessageBox from "../FullPageLoader/MessageBox";
import { listProducts } from "../../redux/product/product-action";
import { BASE_URL } from "../../config/ApiUrl";
import Tooltip from "@material-ui/core/Tooltip";
import { logOutUser } from "../../redux/user/user-action";
import { useHistory } from "react-router-dom";
import { loadingStop } from "../../redux/loader/loader-actions";
import Login from "../Login";
import Registration from "../Registration";
import warning_icon from "../../assets/images/warning_icon.svg";
import Typography from "@material-ui/core/Typography";
import { ErrorMessages } from "../../constants/Messages";
import ToolInfo from "../ToolInfo";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import ApiRequest from "../../util/ApiRequest";
import { WIDGET_LIST } from "../../config/ApiUrl";
import { ConstructionOutlined } from "@mui/icons-material";
import NoSearchFound from "../NoSearchFound";
import NotFoundImg from "../../assets/images/empty.gif";

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
  // const [productShow, setProductShow] = useState(products);
  const [TypeClick, setTypeClick] = useState("");

  const [isInfoPopup, setIsInfoPopup] = useState(false);

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
    // debugger;
    if (user) {
      setLoginIsOpen(false);
      setReginIsOpen(false);
    }
  }, [user]);

  // const WidgetList = () => {
  //   if (user) {
  //     ApiRequest.request(WIDGET_LIST)
  //       .then((res) => {
  //         setProductShow(res);
  //         console.log(res, "Widget List");
  //         console.log(productShow, "Widget List from state");
  //       })
  //       .catch((error) => {
  //         dispatch(logOutUser());
  //         localStorage.removeItem("auth");
  //         dispatch(loadingStop());
  //         history.push("/");
  //       });
  //   }
  // };

  // useEffect(() => {
  //   dispatch(listProducts());
  //   WidgetList();
  // }, [token]);

  const keshav = true;

  return (
    <>
      <div className="toolcard">
        <Toolbar className="toolcard__toolbar">
          {loading ? (
            <>
              <LoadingBox />
            </>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <Grid container spacing={4}>
              {products.length == 0 ? (
                <NoSearchFound
                  img={NotFoundImg}
                  heading={ErrorMessages.NoSearchResultMessage}
                />
              ) : (
                ""
              )}
              {user
                ? products.map((tooldata, index) => {
                    return (
                      <Grid
                        item
                        xl={2}
                        lg={2}
                        md={3}
                        sm={4}
                        xs={12}
                        key={index}
                        id={tooldata.id}
                      >
                        <Paper className="toolcard__imageblck">
                          <div className="toolcard__image">
                            <img src={BASE_URL + "/media/" + tooldata.imgUrl} />
                            {/* <span>{tooldata.imgUrl}</span> */}
                            <div className="toolcard__preview">
                              <CustomButton
                                className="toolcard__perview-button"
                                onClick={() => handleToolClick(tooldata)}
                              >
                                <RemoveRedEyeIcon className="eyes_icon" />{" "}
                                Preview
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
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(ErrorMessages.EmbededAlert);
                                  }}
                                >
                                  {/* <Tooltip title="Embeded Code" placement="top"> */}
                                  <SystemUpdateAltIcon />
                                  {/* </Tooltip> */}
                                </div>
                              )}
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
                                  <ShoppingCartIcon />
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
                        xl={2}
                        lg={2}
                        md={3}
                        sm={4}
                        xs={12}
                        key={index}
                        id={tooldata.id}
                      >
                        <Paper className="toolcard__imageblck">
                          <div className="toolcard__image">
                            <img src={BASE_URL + "/media/" + tooldata.imgUrl} />
                            {/* <span>{tooldata.imgUrl}</span> */}
                            <div className="toolcard__preview">
                              <CustomButton
                                className="toolcard__perview-button"
                                onClick={() => handleToolClick(tooldata)}
                              >
                                <RemoveRedEyeIcon className="eyes_icon" />{" "}
                                Preview
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
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(ErrorMessages.EmbededAlert);
                                  }}
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
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(ErrorMessages.loginAlert);
                                  }}
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
                  {TypeClick}
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

          {/*Embeded code popup */}
          <CustomPopup
            open={ispopup}
            onClose={() => setPopup(false)}
            headerText="Embed code"
            className="border-radius popup-container__iner--xl-md"
          >
            <Embedcode data={products} toolId={popupId} />
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

          <CustomPopup
            open={isInfoPopup}
            onClose={() => setIsInfoPopup(false)}
            headerText="How it works?"
            footerButton={true}
            className="border-radius popup-container__iner--xxl"
          >
            <ToolInfo />
          </CustomPopup>
          {/*End */}
        </Toolbar>
      </div>
    </>
  );
};

export default ToolCards;
