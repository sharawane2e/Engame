import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import { ForgotValidation } from "../../util/FormValidation";
import ApiRequest from "../../util/ApiRequest";
import Login from "../../components/Login";

class ForgotPassword extends Component {
     state = {
        email: "",
        data:"",
        formErrors: {
          email: "",
        },
      };
     
      ForgotPasswordVali = new ForgotValidation();
     
      backLogin = (e) =>{
        this.setState({data:`texxt`}); 
      }

      handleSubmit = (e) => {
         e.preventDefault();
      }

     handleChange = (e, key) => {
        let value = e.target.value;
        const validationResponse = this.validateField(key, value);
        const errorMessage = validationResponse.isValid ? validationResponse.message: this.state.formErrors[key];
            this.setState({
        [key]: value,
        formErrors: { ...this.state.formErrors, [key]: errorMessage },
      });
      }
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
      }
     
 
render() {
    return (      
        <>
        {this.state.data?<Login />:
        <div className="form-area">
            <div className="form-area__login  large-hedding">Forgot Password</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
           <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail address</InputLabel> 
                <FormControl className="form-area__control">
                <TextField
                id="outlined-email-input"   
                placeholder="E-mail address"
                // value={this.state.email}
                // onChange={(e) => this.handleChange(e, "email")}
                // onBlur={(e) => this.handleBlur(e, "email")}
                // message={this.state.formErrors.email}
                type="Email"  variant="outlined"
                />
                 {/* <div className="validated-error">{this.state.formErrors.email}</div> */}
                </FormControl>
        </form>
       <div className="form-button-grop">
       <Button type="submit"
        onClick={this.handleSubmit}
       className="form-button-grop__custom-button">Forgot Password</Button>
       </div>
       <Link href="#" onClick={this.backLogin} className="back-button">
        Back to login
      </Link>
        </div>}
        </>
    );
  }
}
export default ForgotPassword;


