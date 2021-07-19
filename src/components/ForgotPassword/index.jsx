import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Link from '@material-ui/core/Link';
import { ForgotValidation } from "../../util/FormValidation";
import Login from "../../components/Login";
import CustomButton from "../../components/widgets/Button"

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
        this.setState({data:`data`}); 
      }

      forgotSubmit = (e) => {
         e.preventDefault();
      }

     handleChange = (e, key) => {
        let value = e.target.value;
        const validationResponse = this.ForgotPasswordVali.validateField(key, value);
        console.log(validationResponse)
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
        const validationResponse = this.ForgotPasswordVali.validateField(key, value);
        console.log(validationResponse)
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
        <div className="form-area forgot--password">
            <div className="form-area__login  large-hedding">Forgot Password</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
           <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail address</InputLabel> 
                <FormControl className="form-area__control">
                <TextField
                id="outlined-email-input"   
                placeholder="E-mail address"
                value={this.state.email}
                type="email"  variant="outlined"
                 onChange={(e) => this.handleChange(e, "email")}
                onBlur={(e) => this.handleBlur(e, "email")}
                 message={this.state.formErrors.email}
               />
                <div className="validated-error">{this.state.formErrors.email}</div> 
                </FormControl>
        </form>
          <div className="form-button-grop">
            <CustomButton  onClick={this.forgotSubmit}
                className='forgot__button primary-button'>
              Forgot Password
              </CustomButton>
            </div>
          <div className="back-button">
            <Link href="#" onClick={this.backLogin} >
              Back to login
            </Link>
          </div>
        </div>}
        </>
    );
  }
}
export default ForgotPassword;


