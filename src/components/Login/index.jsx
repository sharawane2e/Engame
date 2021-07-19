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
import ApiRequest from "../../util/ApiRequest";
import { LOGIN } from "../../config/ApiUrl";
import Registration from "../../components/Registration";
import ForgotPassword from "../../components/ForgotPassword";

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
		this.setState({ data: `texxt` });
	};
	forgotPassword = (e) => {
		this.setState({ forgot: `texxt` });
	};

	handleSubmit = (el) => {
		el.preventDefault();
		const { email, password } = this.state;
		const validationResponse = this.loginValidation.validateForm({
			email,
			password,
		});

		if (validationResponse.isFormValid) {
			ApiRequest.request(LOGIN, "POST", {
				Email: email,
				password: password,
			})
				.then((res) => {
					if (res.HasSuccess) {
						console.log("susses", res.DataObject.Data);
						localStorage.setItem(
							"login",
							JSON.stringify({
								login: true,
								token: res.DataObject.Data,
							})
						);
						console.log("", this.state.login);
						this.setState({ login: true });
						console.log("Hash user login succes");
					} else {
						console.log("not login");
					}
				})
				.catch((error) => {
					console.log("eror", error);
				});
		} else {
			delete validationResponse.isFormValid;
			this.setState({
				formErrors: { ...this.state.formErrors, ...validationResponse.errors },
			});
		}
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
				{!this.state.login ? (
					this.state.forgot ? (
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
								<CustomButton
									onClick={this.handleSubmit}
									className="login__button primary-button"
								>
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
					)
				) : (
					<div to="/">Login</div>
				)}
			</>
		);
	}
}
export default Login;
