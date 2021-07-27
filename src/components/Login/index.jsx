import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CustomButton from "../../components/widgets/Button";
import Link from "@material-ui/core/Link";
import { LoginValidation } from "../../util/FormValidation";
import { BASE_URL } from "../../config/ApiUrl";
import Registration from "../../components/Registration";
import { ToastContainer, toast } from 'react-toastify';
import ForgotPassword from "../../components/ForgotPassword";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user-action";

class Login extends Component {
	state = {
		email: "",
		password: "",
		data: "",
		forgot: "",
		buttonClass: 0,
		login: false,
		store: null,
		formErrors: {
			email: "",
			password: "",
		},
		showPassword: false,
	};

	loginValidation = new LoginValidation();

	createAccount = (e) => {
		this.setState({ data: `string` });
	};
	forgotPassword = (e) => {
		this.setState({ forgot: `string` });
	};

	handleSubmit = (e) => {
		const { email, password } = this.state;
		const user = {email:email, password:password}
		this.props.dispatch(loadingStart())
		fetch(BASE_URL+"user/login/", {
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(result => result.json())
		.then((data) => {
			toast.error(data.non_field_errors ? data.non_field_errors.join("") : null )
			this.props.dispatch(loadingStop())
			if (data.access_token) {
				this.props.dispatch(loginUser(data))
			}
		})
		.catch((error)=>{
			toast.error(error);
		})

		
	};

	handleClickShowPassword = (e, key) => {
		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
		this.setState({ showPassword: !this.state.showPassword });
	};

	handleChange = (e, key) => {
		let value = e.target.value;
		const validationResponse = this.loginValidation.validateField(key, value);
		const errorMessage = validationResponse.isValid
			? validationResponse.message
			: this.state.formErrors[key];
		this.setState({
			[key]: value,
			formErrors: { ...this.state.formErrors, [key]: errorMessage },
		});
	};
	handleBlur = (e, key) => {
		let value = e.target.value;
		if (typeof value === "string") {
			value = value.trim();
		}
		const validationResponse = this.loginValidation.validateField(key, value);
		const errorMessage = validationResponse.message;
		this.setState({
			[key]: value,
			formErrors: { ...this.state.formErrors, [key]: errorMessage },
		});
	};

	render() {
		return (
			<>
				
					{this.state.forgot ? (
						<ForgotPassword />
					) : this.state.data ? (
						<Registration />
					) : (
						<div className="form-area login--form">
							<div className="form-area__login  large-hedding">Login</div>
							<form className="form-area__fileds" noValidate autoComplete="off">
								<InputLabel
									htmlFor="standard-adornment-email"
									className="input-label"
								>
									E-mail address
								</InputLabel>
								<FormControl className="form-area__control">
									<TextField
										id="outlined-email-input"
										placeholder="E-mail address"
										value={this.state.email}
										onChange={(e) => this.handleChange(e, "email")}
										onBlur={(e) => this.handleBlur(e, "email")}
										message={this.state.formErrors.email}
										type="Email"
										variant="outlined"
									/>
									<div className="validated-error">
										{this.state.formErrors.email}
									</div>
								</FormControl>

								<InputLabel
									htmlFor="standard-adornment-password"
									className="input-label"
								>
									Password
								</InputLabel>
								<FormControl className="form-area__control" variant="outlined">
									<OutlinedInput
										id="outlined-adornment-password"
										placeholder="***********************"
										type={this.state.showPassword ? "text" : "password"}
										value={this.state.password}
										onChange={(e) => this.handleChange(e, "password")}
										onBlur={(e) => this.handleBlur(e, "password")}
										message={this.state.formErrors.password}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={this.handleClickShowPassword}
													edge="end"
												>
													{this.state.showPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										}
									/>
									<div className="validated-error">
										{this.state.formErrors.password}
									</div>
								</FormControl>

								<div className="forgot-link">
									<Link href="#" onClick={this.forgotPassword}>
										Forgot password ?
									</Link>
								</div>
							</form>
							<div className="form-button-grop">
							<ToastContainer />
								 <CustomButton
									onClick={this.handleSubmit}
									className="login__button primary-button"
								>
									{/* {isLoaded ? "Loading..." : "Log In" } */}
									Log In
								</CustomButton>
							</div>
							<div className="form-newaccont">
								<span>New Here?</span>
								<Link href="#" onClick={this.createAccount}>
									Create an Account
								</Link>
							</div>
						</div>
					)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		user:state.user
	}
}



export default connect(mapStateToProps)(Login);
