import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import CustomButton from "../../components/widgets/Button";
import Link from "@material-ui/core/Link";
import { LoginValidation } from "../../util/FormValidation";
import Registration from "../../components/Registration";
import Toaster from "../../util/Toaster";
import ForgotPassword from "../../components/ForgotPassword";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { connect } from "react-redux";
import { loginUser } from "../../redux/user/user-action";
import FilledInput from "@material-ui/core/FilledInput";
import ApiRequest from "../../util/ApiRequest";
import { LOGIN } from "../../config/ApiUrl";
import UserVerification from "../userVerify";
import LocalStorageUtils from "../../util/LocalStorageUtils";
import LocalStorageType from "../../config/LocalStorageType";

class Login extends Component {
  state = {
    email: "",
    password: "",
    data: false,
    forgotPasswordPopup: false,
    buttonClass: 0,
    login: false,
    store: null,
    isVerifyPopup: false,
    formErrors: {
      email: "",
      password: "",
    },
    showPassword: false,
  };

  loginValidation = new LoginValidation();

  createAccount = (e) => {
    this.setState({
      data: true,
    });
  };
  forgotPassword = (e) => {
    this.setState({ forgotPasswordPopup: true, data: false });
  };

  handelLogin = (e) => {
    const { email, password } = this.state;
    const user = { email: email, password: password };
    const validationResponse = this.loginValidation.validateForm({
      email,
      password,
    });

    if (validationResponse.isFormValid) {
      this.props.dispatch(loadingStart());
      ApiRequest.request(LOGIN, "POST", user)
        .then((res) => {
          if (res.status && res.data[0].is_verified) {
            this.props.dispatch(loginUser(res.data[0]));
          } else if (
            !res.status &&
            !res.data[0]?.is_verified &&
            res.data.length > 0
          ) {
            this.setState({
              isVerifyPopup: true,
              data: false,
            });
            LocalStorageUtils.setLocalStorage(
              LocalStorageType.SET,
              "verificationEmail",
              email
            );
          } else {
            Toaster.error(res.detail.message, "topCenter");
          }
          this.props.dispatch(loadingStop());
        })
        .finally(() => {
          // this.props.dispatch(listProducts(ApiData));
        });
    } else {
      this.setState({
        formErrors: { ...this.state.formErrors, ...validationResponse.errors },
      });
    }
  };

  handleClickShowPassword = (e, key) => {
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.setState({ showPassword: !this.state.showPassword });
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handelLogin();
    }
  };

  handleChange = (e, key) => {
    const value = e.target.value;
    let errorMessage = this.state.formErrors[key];
    if (this.loginValidation.validateField(key, value).isValid) {
      errorMessage = "";
    }
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
    const errorMessage = this.loginValidation.validateField(key, value).message;
    this.setState({
      key: value,
      formErrors: { ...this.state.formErrors, [key]: errorMessage },
    });
  };

  render() {
    return (
      <>
        {this.state.forgotPasswordPopup ? (
          <ForgotPassword />
        ) : this.state.data ? (
          <Registration />
        ) : this.state.isVerifyPopup ? (
          <UserVerification />
        ) : (
          <div className="form-area login--form">
            <div className="form-area__login  large-hedding">Login</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
              <FormControl className="form-area__control">
                <TextField
                  id="outlined-email-input"
                  placeholder="E-mail address"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e, "email")}
                  onBlur={(e) => this.handleBlur(e, "email")}
                  message={this.state.formErrors.email}
                  type="Email"
                  variant="filled"
                  label="Email"
                  onKeyDown={this._handleKeyDown}
                />
                <div className="validated-error">
                  {this.state.formErrors.email}
                </div>
              </FormControl>
              <FormControl className="form-area__control" variant="filled">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  id="outlined-adornment-password"
                  placeholder="***********************"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e, "password")}
                  onBlur={(e) => this.handleBlur(e, "password")}
                  message={this.state.formErrors.password}
                  onKeyDown={this._handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        edge="end"
                        tabIndex="-1"
                      >
                        {this.state.showPassword ? (
                          <Visibility className="fill-eyecolor" />
                        ) : (
                          <VisibilityOff className="fill-eyecolor" />
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
                  Forgot password?
                </Link>
              </div>
            </form>
            <div className="form-button-grop">
              <CustomButton
                onClick={this.handelLogin}
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
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Login);
