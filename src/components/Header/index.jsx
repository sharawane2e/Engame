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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import Toaster from "../../util/Toaster";
import { useDispatch } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";

const Header = ({ props, cart }) => {
	const [isLoginOpen, setLoginIsOpen] = useState(false);
	const [isReginOpen, setReginIsOpen] = useState(false);
	const [isUserLogin] = useState(true);
	const [open, setOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const dispatch = useDispatch();
	useEffect(() => {
		let count = 0;
		cart.forEach((item) => {
			count += item.qty;
		});
		setCartCount(count);
	}, [cart, cartCount]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleLoader = () => {
		dispatch(loadingStart());
		setTimeout(() => {
			dispatch(loadingStop());
		}, 3000);
	};
	return (
		<>
			<div className="flexGrow header-box sticky-head-position">
				<AppBar>
					<Toolbar className="header-bg">
						<Typography variant="h6" className="flexGrow">
							<Link to="/">
								<img src={e2eLogo} />
							</Link>
						</Typography>
						<div className="header-text-color">
							{isUserLogin ? (
								<>
									<div
										className="menu-button"
										onClick={() => setLoginIsOpen(true)}
									>
										Login
									</div>
									|
									<div
										className="menu-button"
										onClick={() => setReginIsOpen(true)}
									>
										Register
									</div>
								</>
							) : (
								<FormControl className="userForm">
									<InputLabel id="user-open-select">User</InputLabel>
									<Select
										labelId="user-open-select"
										id="user-open-select"
										open={open}
										onClose={handleClose}
										onOpen={handleOpen}
									>
										<MenuItem value={10}>Logout</MenuItem>
										<MenuItem value={20}>Profile</MenuItem>
									</Select>
								</FormControl>
							)}
							<div className="shoping__card">
								<Link to="/cart" onClick={handleLoader}>
									<Badge badgeContent={cartCount} color="secondary">
										<ShoppingCartIcon />
									</Badge>
								</Link>
							</div>
						</div>
					</Toolbar>
				</AppBar>
			</div>
			<CustomPopup
				open={isLoginOpen}
				onClose={() => setLoginIsOpen(false)}
				className="popup-container__iner--xl border-allside border-radius"
			>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6} className="login-background"></Grid>
					<Grid item xs={12} sm={6}>
						<Login />
					</Grid>
				</Grid>
			</CustomPopup>
			<CustomPopup
				open={isReginOpen}
				onClose={() => setReginIsOpen(false)}
				className="popup-container__iner--xl border-allside border-radius"
			>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={5} className="login-background"></Grid>
					<Grid item xs={12} sm={7}>
						<Registration />
					</Grid>
				</Grid>
			</CustomPopup>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		cart: state.shop.cart,
	};
};

export default connect(mapStateToProps)(Header);
