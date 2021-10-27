import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { Link, useHistory } from "react-router-dom";
import Engame_logo from "../../assets/images/Engame_logo.svg";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CustomPopup from "../CustomPopup";

import Login from "../Login";
import Registration from "../Registration";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
// import { BASE_URL } from "../../config/ApiUrl";
import { logOutUser } from "../../redux/user/user-action";
import CustomButton from "../../components/widgets/Button";
import Toaster from "../../util/Toaster";
// import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { LOGOUT_TIME } from "../../constants/ConstantValues";
import { getItemFromCart } from "../../redux/cart/action";
import Tooltip from "@material-ui/core/Tooltip";
import ApiRequest from "../../util/ApiRequest";
import { BASE_URL, LOGOUT } from "../../config/ApiUrl";
// import axios from "axios";

// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";

const useStyles = makeStyles((theme) => ({
  // sectionDesktop: {
  //   display: "none",
  //   [theme.breakpoints.up("sm")]: {
  //     display: "flex",
  //   },
  // },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = ({ props }) => {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const carts = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.isLoggedIn) {
      setLoginIsOpen(false);
      setReginIsOpen(false);
      dispatch(getItemFromCart());
      console.log(user, "user");
    }
  }, [user]);

  useEffect(() => {
    fetch(BASE_URL).then(
      (response) => {},
      (err) => {
        history.push("/error");
        // alert("error");
      }
    );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("auth");
      window.location.reload();
      history.push("/");
    }, LOGOUT_TIME);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    dispatch(loadingStart());
    ApiRequest.request(LOGOUT, "POST", "")
      .then((res) => {
        dispatch(logOutUser());
        localStorage.removeItem("auth");
        history.push("/");
        Toaster.sucess(res.detail, "topCenter");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(loadingStop());
      });
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <>
      {user?.isLoggedIn && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} className="user_name">
            {user.token.user.first_name}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="mobile__only">
            <Link color="inherit" to="/Purchased">
              My Widgets
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      )}
    </>
  );

  // const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <ElevationScroll>
        <AppBar className="flexGrow header-box " position={"sticky"}>
          <Toolbar className="header-padding header-text-color">
            <Typography variant="body1" className="flexGrow">
              <Link to="/">
                <img src={Engame_logo} />
              </Link>
            </Typography>

            {!user?.isLoggedIn ? (
              <>
                <div
                  className="menu-button"
                  onClick={() => setLoginIsOpen(true)}
                >
                  Login
                </div>
                <span className="vertical-line">|</span>
                <div
                  className="menu-button"
                  onClick={() => setReginIsOpen(true)}
                >
                  Register
                </div>
              </>
            ) : (
              <div className={classes.sectionDesktop}>
                <div className="user-after-login">
                  <Link color="inherit" to="/Purchased" className="my-widgets">
                    My widgets
                  </Link>
                  <div className="shoping__card">
                    <Link to="cart">
                      {/* <Badge color="secondary"> */}
                      <Badge
                        badgeContent={carts?.length ? carts.length : 0}
                        color="secondary"
                      >
                        <Tooltip title="Cart Items" placement="top">
                          <ShoppingCartIcon />
                        </Tooltip>
                      </Badge>
                    </Link>
                  </div>
                  <CustomButton
                    onClick={handleProfileMenuOpen}
                    className="custom-avtar"
                  >
                    <Avatar sx="">
                      {user.token.user.first_name.split(/(\s+)/)[0]
                        ? user.token.user.first_name
                            .split(/(\s+)/)[0][0]
                            .toUpperCase()
                        : ""}
                      {user.token.user.first_name.split(/(\s+)/)[2]
                        ? user.token.user.first_name
                            .split(/(\s+)/)[2][0]
                            .toUpperCase()
                        : ""}
                    </Avatar>

                    <KeyboardArrowDown />
                  </CustomButton>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMenu}

      <CustomPopup
        open={isLoginOpen}
        onClose={() => setLoginIsOpen(false)}
        className="popup-background popup-container__iner--xl border-radius "
      >
        <Grid container spacing={1} className="popup-padding">
          {/* <Grid item xs={6} sm={6} className="login-background"></Grid> */}
          <Grid item xs={12} sm={12} lg={12}>
            <Login />
          </Grid>
        </Grid>
      </CustomPopup>
      <CustomPopup
        open={isReginOpen}
        onClose={() => setReginIsOpen(false)}
        className="popup-background popup-container__iner--xl border-radius "
      >
        <Grid container spacing={3} className="popup-padding">
          {/* <Grid item xs={6} sm={6} className="login-background"></Grid> */}
          <Grid item xs={12} sm={12} lg={12}>
            <Registration />
          </Grid>
        </Grid>
      </CustomPopup>
    </>
  );
};

export default Header;
