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
import { Link, useHistory } from "react-router-dom";
import e2eLogo from "../../assets/images/E2E-logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CustomPopup from "../CustomPopup";
import Login from "../Login";
import Registration from "../Registration";
import Grid from "@material-ui/core/Grid";
// import { useDispatch } from "react-redux";
// import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
// import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { BASE_URL } from "../../config/ApiUrl";
import { logOutUser } from "../../redux/user/user-action";
import CustomButton from "../../components/widgets/Button";
import Toaster from "../../util/Toaster";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { LOGOUT_TIME } from "../../constants/ConstantValues";
import {
  getItemFromCart,
  removeFromCart,
} from "../../redux/cart/action";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
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

const Header = ({ props, cart, user, state, data, shop }) => {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  // const [state] = useState(data);
  const classes = useStyles();
  // const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const carts = useSelector((state) => state.cart.cartItems);
  //const carts = useSelector((state) =>cart)



  useEffect(() => {
    document.body.classList.toggle("modal-open", isLoginOpen);
    document.body.classList.toggle("modal-open", isReginOpen);
    if (user.isLoggedIn) {
      setLoginIsOpen(false);
      const getCartItems = () => async (dispatch) => {
        dispatch(getItemFromCart());
        // console.log("curent header data with add to cart click", carts);
      }
      getCartItems();
    }
  }, [isLoginOpen, isReginOpen,user]);

  // useEffect(() => {
  //   let count = 0;
  //   cart.forEach((item) => {
  //     count += item.qty;
  //   });
  //   setCartCount(count);
  //   if (user.isLoggedIn) {
  //     setLoginIsOpen(false);
  //   }
  // }, [cart, cartCount, user]);

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
    fetch(BASE_URL + "user/logout/", {
      method: "POST",
      body: JSON.stringify(""),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.detail) {
          dispatch(logOutUser());
          localStorage.removeItem("auth");
          dispatch(loadingStop());
          history.push("/");
          Toaster.sucess("logout sucessfully", "topCenter");
        }
      })
      .catch((error) => {
        Toaster.error(error, "topCenter");
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>
        <Link color="inherit" to="/Purchased">
          My Widgets
        </Link>
      </MenuItem>
      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!user.isLoggedIn ? (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <div className="menu-button" onClick={() => setLoginIsOpen(true)}>
              Login
            </div>
          </MenuItem>
          <MenuItem>
            <div className="menu-button" onClick={() => setReginIsOpen(true)}>
              Register
            </div>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
            <div className="user-after-login">
              <CustomButton onClick={handleProfileMenuOpen}>
                {user.token.user.first_name} <ArrowDropDownIcon />
              </CustomButton>
            </div>
          </MenuItem>

          <MenuItem onClick={handleProfileMenuOpen}>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
            <div className="menu-button" onClick={() => handleLogout()}>
              Logout
            </div>
          </MenuItem>
        </>
      )}
    </Menu>
  );

  return (
    <>
      {/* <ElevationScroll {...props}></ElevationScroll> */}
      <ElevationScroll {...props}>
        <AppBar className="flexGrow header-box " position={"sticky"}>
          <Toolbar className="header-padding header-text-color">
            <Typography variant="body1" className="flexGrow">
              <Link to="/">
                <img src={e2eLogo} />
              </Link>
            </Typography>
            {!user.isLoggedIn ? (
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
            ) : null}

            {user.isLoggedIn ? (
              <div className={classes.sectionDesktop}>
                {/* <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton> */}
                <div className="user-after-login">
                  <CustomButton onClick={handleProfileMenuOpen}>
                    {user.token.user.first_name} <ArrowDropDownIcon />
                  </CustomButton>
                </div>
              </div>
            ) : null}
            {user.isLoggedIn ? (
              <div className="shoping__card">
                <Link to="cart">
                  {/* <Badge color="secondary"> */}

                  <Badge badgeContent={
                      carts.length ? carts.length : 0
                    } color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </div>
            ) : null}

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {renderMobileMenu}
      {renderMenu}

      <CustomPopup
        open={isLoginOpen}
        onClose={() => setLoginIsOpen(false)}
        className="popup-container__iner--xl border-radius"
      >
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6} className="login-background"></Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Login />
          </Grid>
        </Grid>
      </CustomPopup>
      <CustomPopup
        open={isReginOpen}
        onClose={() => setReginIsOpen(false)}
        className="popup-container__iner--xl border-radius"
      >
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} className="login-background"></Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <Registration />
          </Grid>
        </Grid>
      </CustomPopup>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("state data items with header",state.cart.cartItems)
  return {
    cart: state.cart.cartItems,
    user: state.user,
    // shop: state.shop,
  };
};

export default connect(mapStateToProps)(Header);
