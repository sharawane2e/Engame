import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import { ForgotValidation } from "../../util/FormValidation";
import Login from "../../components/Login";
import CustomButton from "../../components/widgets/Button";
import { FORGOT_PASSWORD } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { connect } from "react-redux";
import ApiRequest from "../../util/ApiRequest";
import Toaster from "../../util/Toaster";
import UserVerification from "../userVerify";
import { Typography } from "@material-ui/core";
import sucessfullImg from "../../assets/images/sucessfull.svg";
import errorImg from "../../assets/images/error.svg";

class ForgotPassword extends Component {
  state = {
    email: "",
    isLogin: false,
    isForgot: true,
    isEmailVerify: false,
    isPasswordSent: false,
    formErrors: {
      email: "",
    },
  };
  ForgotPasswordVali = new ForgotValidation();

  backLogin = (e) => {
    this.setState({ isLogin: true });
  };

  handelState = () => {};
  forgotSubmit = (e) => {
    // e.preventDefault();
    const { email } = this.state;
    const validationResponse = this.ForgotPasswordVali.validateForm({
      email,
    });
    if (validationResponse.isFormValid) {
      this.props.dispatch(loadingStart());
      const { email } = this.state;

      ApiRequest.request(FORGOT_PASSWORD, "POST", { email: email })
        .then((res) => {
          // console.log("this.state.props", this.state.props);
          // window.location.reload();
          if (res.status && res.data[0]?.is_verified) {
            Toaster.sucess(res.detail.message, "topCenter");
            this.setState({
              isEmailVerify: false,
              isForgot: false,
              isLogin: false,
              isPasswordSent: true,
            });
            console.log(res, "forgot data");
          } else if (res.status && !res.data[0]?.is_verified) {
            this.setState({
              isEmailVerify: true,
              isForgot: false,
              isLogin: false,
              isPasswordSent: false,
            });
          } else {
            Toaster.error(res.detail.message, "topCenter");
            this.setState({
              isEmailVerify: false,
              isForgot: false,
              isLogin: false,
              isPasswordSent: false,
            });
          }
        })
        .finally(() => {
          this.props.dispatch(loadingStop());
        });
    } else {
      this.setState({
        formErrors: { ...this.state.formErrors, ...validationResponse.errors },
      });
    }
  };

  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      this.forgotSubmit();
    }
  };

  handleChange = (e, key) => {
    let value = e.target.value;
    const validationResponse = this.ForgotPasswordVali.validateField(
      key,
      value
    );
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
    const validationResponse = this.ForgotPasswordVali.validateField(
      key,
      value
    );
    const errorMessage = validationResponse.message;
    this.setState({
      [key]: value,
      formErrors: { ...this.state.formErrors, [key]: errorMessage },
    });
  };

  render() {
    return (
      <>
        {this.state.isLogin ? (
          <Login />
        ) : this.state.isForgot ? (
          <div className="form-area forgot--password">
            <div className="form-area__login  large-hedding">
              Forgot Password
            </div>
            <form className="form-area__fileds" noValidate autoComplete="off">
              <FormControl className="form-area__control">
                <TextField
                  id="outlined-email-input"
                  placeholder="E-mail address"
                  value={this.state.email}
                  type="email"
                  variant="filled"
                  label="E-mail address"
                  onChange={(e) => this.handleChange(e, "email")}
                  onBlur={(e) => this.handleBlur(e, "email")}
                  message={this.state.formErrors.email}
                  onKeyDown={this._handleKeyDown}
                />
                <div className="validated-error">
                  {this.state.formErrors.email}
                </div>
              </FormControl>
            </form>
            <div className="form-button-grop">
              <CustomButton
                onClick={this.forgotSubmit}
                className="forgot__button primary-button"
              >
                Forgot Password
              </CustomButton>
            </div>

            <div className="form-newaccont">
              <span> Back to</span>
              <Link href="#" onClick={this.backLogin} className="">
                Login
              </Link>
            </div>
          </div>
        ) : this.state.isEmailVerify ? (
          <UserVerification />
        ) : this.state.isPasswordSent ? (
          <div className="emptySection">
            <img src={sucessfullImg} />
            <Typography component="p">
              Email is sent to your registerd email. Please check and verify
              your email to login.
            </Typography>
          </div>
        ) : (
          <div className="emptySection">
            <img src={errorImg} />
            <Typography component="p">
              Email is sent to your registerd email. Please check and verify
              your email to login.
            </Typography>
          </div>
        )}
      </>
    );
  }
}

export default connect()(ForgotPassword);
