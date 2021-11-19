import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
// import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { UserValidation } from "../../util/FormValidation";
import Login from "../../components/Login";
import Link from "@material-ui/core/Link";
import Toaster from "../../util/Toaster";
import CustomButton from "../../components/widgets/Button";
import { connect } from "react-redux";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
// import { BASE_URL } from "../../config/ApiUrl";
// import { v4 as uuidv4 } from "uuid";
import ApiRequest from "../../util/ApiRequest";
import { REGISTRATION } from "../../config/ApiUrl";
// import { useDispatch, useSelector } from "react-redux";
// import { EMAIL_ALLOWED } from "../../config/ApiUrl";
import UserVerification from "../userVerify";
import sucessfullImg from "../../assets/images/sucessfull.svg";
import errorImg from "../../assets/images/error.svg";
import { Typography } from "@material-ui/core";

class Registration extends Component {
  state = {
    name: "",
    email: "",
    setpassword: "",
    confirmpassword: "",
    isLoginPopup: "",
    showPassword: false,
    showPasswordConfirm: false,
    isReginOpen: false,
    isVerifyPopup: false,
    isRegistrationWant: true,
    isRegistrationComplete: false,
    registrationMessage: "",
    formErrors: {
      name: "",
      email: "",
      setpassword: "",
      confirmpassword: "",
    },
  };

  UserValidation = new UserValidation();

  backLogin = (e) => {
    this.setState({ isLoginPopup: true });
  };

  handleRegister = (e) => {
    // e.preventDefault();
    // this.isReginOpen(false);
    const { name, email, setpassword, confirmpassword } = this.state;

    var fullEmail = email;
    var splitEmail = fullEmail.split("@");
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 47756) | 0;
    firstPart = ("" + firstPart.toString()).slice(-5);
    secondPart = ("" + secondPart.toString()).slice(-5);

    var uservalue = splitEmail[0] + "_" + firstPart + secondPart;

    const user = {
      username: uservalue,
      email: email,
      password1: setpassword,
      password2: confirmpassword,
      first_name: name,
      last_name: "s",
      mobile: "91",
    };

    // console.log("name", user);
    const validationResponse = this.UserValidation.validateForm({
      name,
      email,
      setpassword,
      confirmpassword,
    });
    // const PopupVal = true;

    if (validationResponse.isFormValid) {
      this.props.dispatch(loadingStart());
      ApiRequest.request(REGISTRATION, "POST", user)
        .then((res) => {
          if (res.status) {
            Toaster.sucess(res.detail.message, "topCenter");
            this.setState({ isRegistrationComplete: true });
            // window.location.reload();
          } else if (!res.status && !res.data[0]?.is_verified) {
            this.setState({
              isVerifyPopup: true,
              data: false,
            });
            localStorage.setItem("verificationEmail", email);
            this.setState({ isRegistrationComplete: false });
          } else {
            // Toaster.error(res.detail.message, "topCenter");
            this.setState({ isRegistrationComplete: false });
          }
          this.setState({ registrationMessage: res.detail.message });
        })
        .catch((error) => {
          // console.log(error);
        })
        .finally(() => {
          this.props.dispatch(loadingStop());
          this.setState({ isRegistrationWant: false });
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
      this.handleRegister();
    }
  };

  handleClickShowPassword = (e, key) => {
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.setState({ showPassword: !this.state.showPassword });
  };

  confirmPasswordShow = (e, key) => {
    this.confirmPasswordShow = this.confirmPasswordShow.bind(this);
    this.setState({ showPasswordConfirm: !this.state.showPasswordConfirm });
  };

  handleChange = (e, key) => {
    let value = e.target.value;
    const validationResponse = this.UserValidation.validateField(key, value);
    const errorMessage = validationResponse.isValid
      ? validationResponse.message
      : this.state.formErrors[key];
    this.setState({
      [key]: value,
      formErrors: { ...this.state.formErrors, [key]: errorMessage },
    });
  };

  backVerify = () => {
    this.setState({
      isVerifyPopup: true,
      isLoginPopup: false,
    });
  };

  handleBlur = (e, key) => {
    let value = e.target.value;
    if (typeof value === "string") {
      value = value.trim();
    }
    const validationResponse = this.UserValidation.validateField(key, value);
    const errorMessage = validationResponse.message;
    this.setState({
      [key]: value,
      formErrors: { ...this.state.formErrors, [key]: errorMessage },
    });
  };

  render() {
    return (
      <>
        {this.state.isLoginPopup ? (
          <Login />
        ) : this.state.isVerifyPopup ? (
          <UserVerification />
        ) : this.state.isRegistrationWant ? (
          <div className="form-area registration--form">
            <div className="form-area__login  large-hedding">Register</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
              {/* <InputLabel
                htmlFor="standard-adornment-name"
                className="input-label"
              >
                Name
              </InputLabel> */}
              <FormControl className="form-area__control">
                {/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
                <TextField
                  id="outlined-name-input"
                  placeholder="Name"
                  label="Name"
                  variant="filled"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e, "name")}
                  onBlur={(e) => this.handleBlur(e, "name")}
                  message={this.state.formErrors.name}
                  type="Name"
                  // variant="outlined"
                  onKeyDown={this._handleKeyDown}
                />
                <div className="validated-error">
                  {this.state.formErrors.name}
                </div>
              </FormControl>

              {/* <InputLabel
                htmlFor="standard-adornment-email"
                className="input-label"
              >
                E-mail
              </InputLabel> */}
              <FormControl className="form-area__control">
                <TextField
                  id="outlined-email-input"
                  placeholder="Emails"
                  type="Email"
                  label="E-mail"
                  variant="filled"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e, "email")}
                  onBlur={(e) => this.handleBlur(e, "email")}
                  // onBlur={(e) => this.handleCMail(e)}
                  message={this.state.formErrors.email}
                  onKeyDown={this._handleKeyDown}
                  // onKeyUpCapture={(e) => this.handleCMail(e)}
                />
                <div className="validated-error">
                  {this.state.formErrors.email}
                </div>
              </FormControl>

              {/* <InputLabel
                htmlFor="standard-adornment-password"
                className="input-label"
              >
                Password
              </InputLabel> */}
              <FormControl
                className="form-area__control"
                variant="filled"
                label="Password"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <FilledInput
                  label="E-mail"
                  id="outlined-adornment-password"
                  placeholder="Password "
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.setpassword}
                  onChange={(e) => this.handleChange(e, "setpassword")}
                  onBlur={(e) => this.handleBlur(e, "setpassword")}
                  message={this.state.formErrors.setpassword}
                  onKeyDown={this._handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end" label="filled">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        edge="end"
                        tabindex="-1"
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
                  {this.state.formErrors.setpassword}
                </div>
              </FormControl>

              {/* <InputLabel
                htmlFor="standard-adornment-password"
                className="input-label"
              >
                Confirm Password
              </InputLabel> */}
              <FormControl
                className="form-area__control"
                variant="filled"
                label="Confirm Password"
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Confirm Password
                </InputLabel>
                <FilledInput
                  id="outlined-adornment-confirmpassword"
                  placeholder="Confirm Password"
                  type={this.state.showPasswordConfirm ? "text" : "password"}
                  value={this.state.confirmpassword}
                  onChange={(e) => this.handleChange(e, "confirmpassword")}
                  onBlur={(e) => this.handleBlur(e, "confirmpassword")}
                  message={this.state.formErrors.confirmpassword}
                  onKeyDown={this._handleKeyDown}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.confirmPasswordShow}
                        edge="end"
                        tabindex="-1"
                      >
                        {this.state.showPasswordConfirm ? (
                          <Visibility className="fill-eyecolor" />
                        ) : (
                          <VisibilityOff className="fill-eyecolor" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <div className="validated-error">
                  {this.state.formErrors.confirmpassword}
                </div>
              </FormControl>
            </form>
            <div className="form-button-grop">
              <CustomButton
                onClick={this.handleRegister}
                className="register__button primary-button"
              >
                Register
              </CustomButton>
            </div>
            <div className="form-newaccont">
              <span>Already a member?</span>
              <Link href="#" onClick={this.backLogin} className="">
                Login
              </Link>
            </div>
          </div>
        ) : this.state.isRegistrationComplete ? (
          <div className="emptySection">
            <img src={sucessfullImg} />
            <Typography component="p">
              {this.state.registrationMessage}
            </Typography>
            <div className="form-button-grop emptySection__button-grop">
              <CustomButton
                className="login__button primary-button"
                onClick={this.backLogin}
              >
                Back to Login
              </CustomButton>
            </div>
          </div>
        ) : (
          <div className="emptySection">
            <img src={sucessfullImg} />
            <Typography component="p">
              {this.state.registrationMessage}
            </Typography>
            <div className="form-button-grop emptySection__button-grop">
              <CustomButton
                className="login__button primary-button"
                onClick={this.backLogin}
              >
                Back to Login
              </CustomButton>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Registration);
