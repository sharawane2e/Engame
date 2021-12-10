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
import { BASE_URL, PURCHASED_ITEM } from "../../config/ApiUrl";
import { useHistory } from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";
import warning_icon from "../../assets/images/warning_icon.svg";
import Typography from "@material-ui/core/Typography";
import { ErrorMessages } from "../../constants/Messages";
import ToolInfo from "../ToolInfo";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import NoSearchFound from "../NoSearchFound";
import NoresultImg from "../../assets/images/not-found.svg";
import EmptyPage from "../emptyPage";
import emptyImg from "../../assets/images/oops.gif";
import HomePageLoader from "./ToolCardLoader";
import { Tooltip } from "@mui/material";
import ApiRequest from "../../util/ApiRequest";

const ToolCards = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  const [isLoginrequire, setisLoginrequire] = useState(false);
  const [popupId, setPopupId] = useState();
  const [isSelectedItemForEmbeded, setIsSelectedItemForEmbeded] = useState();
  const [ispopup, setPopup] = useState(false);
  const [isSubscription, setSubscriptionPopup] = useState(false);
  const productList = useSelector((state) => state.productList);
  const user = useSelector((state) => state.user.isLoggedIn);
  const { loading, error, products } = productList;
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

  return (
    <>
      <div className="toolcard">
        <Toolbar className="toolcard__toolbar">
          {loading ? (
            <>
              {/* <LoadingBox /> */}
              <HomePageLoader />
            </>
          ) : error ? (
            <EmptyPage
              heading={ErrorMessages.SOMETHING_WENT_WRONG}
              imgUrl={emptyImg}
              buttonName="Continue Shoping"
            />
          ) : (
            <Grid container spacing={4}>
              {products.length == 0 ? (
                <NoSearchFound
                  img={NoresultImg}
                  heading={ErrorMessages.NoSearchResultMessage}
                />
              ) : (
                ""
              )}

              {user ? (
                <>
                  {products.map((tooldata, index) => {
                    return (
                      <Grid
                        item
                        xl={2}
                        lg={3}
                        md={3}
                        sm={4}
                        xs={12}
                        key={index}
                        id={tooldata.id}
                      >
                        <Paper className="toolcard__imageblck">
                          <div className="toolcard__image">
                            <img src={BASE_URL + tooldata.imgUrl} />
                            <div className="toolcard__preview">
                              <CustomButton
                                className="toolcard__perview-button"
                                onClick={() => handleToolClick(tooldata)}
                              >
                                <RemoveRedEyeIcon className="eyes_icon" />{" "}
                                Preview
                              </CustomButton>
                            </div>
                            <div className="toolcard__tooltip">
                              <Tooltip title="Embeded Code" placement="top">
                                <HelpCenterRoundedIcon
                                  className="toolcard__tooltip__icon"
                                  onClick={() =>
                                    setIsInfoPopup(tooldata.howtowork)
                                  }
                                />
                              </Tooltip>
                            </div>
                          </div>

                          <div className="toolcard__align toolcard__toolicons">
                            <div className="toolcard__items toolcard__download">
                              <Tooltip title="Embeded Code" placement="top">
                                <div
                                  className="toolcard__sub-icons"
                                  onClick={() => {
                                    setPopup(true);
                                    setPopupId(tooldata.id);
                                    setIsSelectedItemForEmbeded(tooldata.name);
                                  }}
                                >
                                  <SystemUpdateAltIcon />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="toolcard__items toolcard__shopping">
                              <Tooltip title="Add to cart" placement="top">
                                <div
                                  className="toolcard__sub-icons"
                                  onClick={(id) => {
                                    setSubscriptionPopup(true);
                                    setPopupId(tooldata.id);
                                  }}
                                >
                                  <ShoppingCartIcon />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </Paper>
                        <div className="toolcard__align toolcard__toolname">
                          <div className="toolcard__aligninr1 toolcard__font-family">
                            {tooldata.toolname}
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </>
              ) : (
                <>
                  {products.map((tooldata, index) => {
                    return (
                      <Grid
                        item
                        xl={2}
                        lg={3}
                        md={3}
                        sm={4}
                        xs={12}
                        key={index}
                        id={tooldata.id}
                      >
                        <Paper className="toolcard__imageblck">
                          <div className="toolcard__image">
                            <img src={BASE_URL + tooldata.imgUrl} />
                            <div className="toolcard__preview">
                              <CustomButton
                                className="toolcard__perview-button"
                                onClick={() => handleToolClick(tooldata)}
                              >
                                <RemoveRedEyeIcon className="eyes_icon" />{" "}
                                Preview
                              </CustomButton>
                            </div>
                            <div className="toolcard__tooltip">
                              <Tooltip title="How tool work" placement="top">
                                <HelpCenterRoundedIcon
                                  className="toolcard__tooltip__icon"
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(
                                      ErrorMessages.ToolPreviewBeforeLogin
                                    );
                                  }}
                                />
                              </Tooltip>
                            </div>
                          </div>

                          <div className="toolcard__align toolcard__toolicons">
                            <div className="toolcard__items toolcard__download">
                              <Tooltip title="Embeded Code" placement="top">
                                <div
                                  className="toolcard__sub-icons"
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(ErrorMessages.EmbededAlert);
                                  }}
                                >
                                  <SystemUpdateAltIcon />
                                </div>
                              </Tooltip>
                            </div>
                            <div className="toolcard__items toolcard__shopping">
                              <Tooltip title="Add To Cart" placement="top">
                                <div
                                  className="toolcard__sub-icons"
                                  onClick={() => {
                                    setisLoginrequire(true);
                                    setTypeClick(ErrorMessages.loginAlert);
                                  }}
                                >
                                  <ShoppingCartIcon />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </Paper>
                        <div className="toolcard__align toolcard__toolname">
                          <div className="toolcard__aligninr1 toolcard__font-family">
                            {tooldata.toolname}
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
                </>
              )}
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
            <div>
              <ToolPerview tool={selectedTool}></ToolPerview>
            </div>
          </CustomPopup>
          {/*End */}

          {/*Embeded code popup */}
          <CustomPopup
            open={ispopup}
            onClose={() => setPopup(false)}
            headerText="Embed code"
            className="border-radius popup-container__iner--xl-md"
          >
            <Embedcode
              data={products}
              toolId={popupId}
              toolName={isSelectedItemForEmbeded}
            />
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
            // headerText="How it works?"
            headerText={
              isInfoPopup?.heading ? isInfoPopup.heading : "How it works?"
            }
            footerButton={true}
            className="border-radius popup-container__iner--xxl"
          >
            <ToolInfo howItWorkData={isInfoPopup} />
          </CustomPopup>
          {/*End */}
        </Toolbar>
      </div>
    </>
  );
};

export default ToolCards;
