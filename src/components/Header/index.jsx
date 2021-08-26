import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import e2eLogo from "../../assets/images/E2E-logo.png";
import CustomPopup from "../CustomPopup";
import Login from "../Login";
import Registration from "../Registration";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { BASE_URL } from "../../config/ApiUrl";
import { logOutUser } from "../../redux/user/user-action";
import CustomButton from "../../components/widgets/Button";
import Menu from "@material-ui/core/Menu";
import Toaster from "../../util/Toaster";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

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

const Header = ({ props, cart, user }) => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.body.classList.toggle("modal-open", isLoginOpen);
  }, [isLoginOpen]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", isReginOpen);
  }, [isReginOpen]);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    setCartCount(count);
    if (user.isLoggedIn) {
      setLoginIsOpen(false);
    }
  }, [cart, cartCount, user]);

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
          Toaster.success("logout sucess", "topCenter");
        }
      })
      .catch((error) => {
        Toaster.error(error, "topCenter");
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar className="flexGrow header-box" position={"sticky"}>
          <Toolbar className="header-padding">
            <Typography variant="body1" className="flexGrow">
              <Link to="/">
                <img src={e2eLogo} />
              </Link>
            </Typography>
            <div className="header-text-color">
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
              ) : (
                <div className="user-after-login">
                  <CustomButton onClick={handleClick}>
                    {user.token.user.first_name} <ArrowDropDownIcon />
                  </CustomButton>
                  {/* <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu> */}
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                    <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
              <div className="shoping__card">
                {user.isLoggedIn ? (
                  <Link to="cart">
                    <Badge badgeContent={cartCount} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                ) : (
                  <Link to="#!">
                    <Badge badgeContent={cartCount} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  </Link>
                )}
              </div>
              <div className="toggle-icon">
                <MoreVertIcon />
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
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
  return {
    cart: state.cart.cartItems,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Header);
