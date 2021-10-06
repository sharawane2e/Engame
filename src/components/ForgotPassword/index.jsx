import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
// import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Link from "@material-ui/core/Link";
import { ForgotValidation } from "../../util/FormValidation";
import Login from "../../components/Login";
import CustomButton from "../../components/widgets/Button";
import { FORGOT } from "../../config/ApiUrl";
import { loadingStart, loadingStop } from "../../redux/loader/loader-actions";
import { connect } from "react-redux";
import ApiRequest from "../../util/ApiRequest";
import Toaster from "../../util/Toaster";

class ForgotPassword extends Component {
  state = {
    email: "",
    data: "",
    formErrors: {
      email: "",
    },
  };
  ForgotPasswordVali = new ForgotValidation();

  backLogin = (e) => {
    this.setState({ data: `string` });
  };
  forgotSubmit = (e) => {
    // e.preventDefault();
    const { email } = this.state;
    const validationResponse = this.ForgotPasswordVali.validateForm({
      email,
    });
    if (validationResponse.isFormValid) {
      this.props.dispatch(loadingStart());
      const { email } = this.state;

      ApiRequest.request(FORGOT, "POST", { email: email })
        .then((res) => {
          console.log("this.state.props", this.state.props);
          Toaster.sucess(res.detail, "topCenter");
          window.location.reload();
          // if (res.header.status === 400) {
          //   console.log("eeroor throw");
          //   Toaster.error(res.email ? res.email.join("") : null, "topCenter");
          //   Toaster.error("User not in data base", "topCenter");
          // } else {
          //   //window.location.reload();
          // }
        })
        .catch((error) => {
          // console.log(error);
        })
        .finally(() => {
          this.props.dispatch(loadingStop());
        });

      // fetch(BASE_URL + "user/password/reset/", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email: email }),
      // })
      //   .then((result) => result.json())
      //   .then((res) => {
      //     this.props.dispatch(loadingStop());
      //     Toaster.sucess(res.detail, "topCenter");
      //   });
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
        {this.state.data ? (
          <Login />
        ) : (
          <div className="form-area forgot--password">
            <div className="form-area__login  large-hedding">
              Forgot Password
            </div>
            <form className="form-area__fileds" noValidate autoComplete="off">
              {/* <InputLabel
                htmlFor="standard-adornment-email"
                className="input-label"
              >
                E-mail address
              </InputLabel> */}
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
        )}
      </>
    );
  }
}

export default connect()(ForgotPassword);
