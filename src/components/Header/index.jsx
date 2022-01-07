import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
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
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { logOutUser } from "../../redux/user/user-action";
import CustomButton from "../../components/widgets/Button";
import Toaster from "../../util/Toaster";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { LOGOUT_TIME } from "../../constants/ConstantValues";
import { getItemFromCart } from "../../redux/cart/action";
import Tooltip from "@material-ui/core/Tooltip";
import ApiRequest from "../../util/ApiRequest";
import { LOGOUT } from "../../config/ApiUrl";
import { KeyboardArrowUp } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LocalStorageUtils from "../../util/LocalStorageUtils";
import LocalStorageType from "../../config/LocalStorageType";
import { listProducts } from "../../redux/product/product-action";
import CartView from "../QuickCart/CartView";

const useStyles = makeStyles((theme) => ({
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
  const carts = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const [isPayment, setIsPayment] = useState();

  useEffect(() => {
    if (user.isLoggedIn) {
      setLoginIsOpen(false);
      setReginIsOpen(false);
      dispatch(getItemFromCart());
    }
  }, [user]);

  useEffect(() => {
    LocalStorageUtils.setLocalStorage(
      LocalStorageType.REMOVE,
      "verificationEmail"
    );
  }, []);

  const cartCountManagement = async () => {
    setIsPayment(localStorage.getItem("isPayment") ? true : false);
    LocalStorageUtils.setLocalStorage(LocalStorageType.REMOVE, "isPayment");
    setIsPayment(localStorage.getItem("isPayment") ? true : false);
  };

  useEffect(() => {
    cartCountManagement();
    const timer = setTimeout(() => {
      LocalStorageUtils.setLocalStorage(LocalStorageType.REMOVE, "auth");
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
        history.push("/");
        Toaster.sucess(res.detail.message, "topCenter");
      })
      .finally(() => {
        dispatch(loadingStop());
      });
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <>
      {user?.isLoggedIn && (
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          className="profile_menu"
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          <MenuItem className="user_name">
            {user.token.user.first_name}
          </MenuItem>
          <MenuItem onClick={handleMenuClose} className="profile_menu__Link">
            <Link color="inherit" to="/Purchased" className="">
              <ListItemIcon>
                <WidgetsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                My Widgets
              </Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleLogout} className="profile_menu__Link">
            <Link color="inherit" className="">
              <ListItemIcon>
                <LoginOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit" noWrap>
                Logout
              </Typography>
            </Link>
          </MenuItem>
        </Menu>
      )}
    </>
  );

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
                  className="menu-button registerBtn"
                  onClick={() => setReginIsOpen(true)}
                >
                  Register
                </div>
              </>
            ) : (
              <div className={classes.sectionDesktop}>
                <div className="user-after-login">
                  <div className="shoping__card">
                    <Link to="cart">
                      <Badge
                        badgeContent={
                          isPayment ? 0 : carts.length ? carts.length : 0
                        }
                        color="secondary"
                      >
                        {/* <Tooltip title="Cart Items" placement="top">
                        </Tooltip> */}
                        <ShoppingCartIcon />
                      </Badge>
                    </Link>
                    <div className="shoping__card__cartHover">
                      <CartView />
                    </div>
                  </div>
                  <CustomButton
                    onClick={handleProfileMenuOpen}
                    className="custom-avtar"
                    focusRipple={true}
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

                    {anchorEl ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
          <Grid item xs={12} sm={12} lg={12}>
            <Registration />
          </Grid>
        </Grid>
      </CustomPopup>
    </>
  );
};

export default Header;
