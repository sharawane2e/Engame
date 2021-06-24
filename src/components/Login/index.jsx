import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
// import Input from '@material-ui/core/Input';
// import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
//import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
//import {EMAIL_LENGTH, PASSWORD_MAX_LENGTH} from "../../constants/ConstantValues";
import { LoginValidation } from "../../util/FormValidation";
import ApiRequest from "../../util/ApiRequest";
import { LOGIN } from "../../config/ApiUrl";
import LocalStorageUtils from "../../util/LocalStorageUtils";
  

class Login extends Component {
     state = {
        email: "",
        password: "",
        formErrors: {
          email: "",
          password: "",
        },
        showPassword:false
      };
     
      loginValidation = new LoginValidation();
      
      handleSubmit = (el) => {
        el.preventDefault();
        const { email, password } = this.state;
        const validationResponse = this.loginValidation.validateForm({
         // console.log(validationResponse),
           email,
           password,
        });
        console.log(validationResponse);
       if(validationResponse.isFormValid){
          ApiRequest.request(LOGIN, "POST", {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(res);
            if (res.HasSuccess) {
              console.log("susses");
              
              LocalStorageUtils.setUserIntoLocalStorage(res.DataObject.Data);
              ApiRequest.setAuthToken(LocalStorageUtils.getToken());
              console.log(this.props.history.push("/Ashish"))
            }
            
          })
          .catch((error) => {
            console.log("eror",error);
          })
       }
       else {
        delete validationResponse.isFormValid;
        this.setState({
          formErrors: { ...this.state.formErrors, ...validationResponse.errors },
        });
      }
      }

      handleClickShowPassword = (el,key) => {
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.setState({ showPassword: !this.state.showPassword });
      }

     handleChange = (el, key) => {
        let value = el.target.value;
        const validationResponse = this.loginValidation.validateField(key, value);
        const errorMessage = validationResponse.isValid ? validationResponse.message: this.state.formErrors[key];
        console.log(errorMessage)
        this.setState({
        [key]: value,
        formErrors: { ...this.state.formErrors, [key]: errorMessage },
      });
      }
      handleBlur = (el, key) => {
        let value = el.target.value;
        if (typeof value === "string") {
          value = value.trim();
        }
        const validationResponse = this.loginValidation.validateField(key, value);
        const errorMessage = validationResponse.message;
    console.log(errorMessage)
        this.setState({
          [key]: value,
          formErrors: { ...this.state.formErrors, [key]: errorMessage },
        });
      }
      
     
   
render() {
    return (      
        <>
        <div className="form-area">
            <div className="form-area__login  large-hedding">Login</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
     
           <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail address</InputLabel> 
                <FormControl className="form-area__control">
                <TextField
                id="outlined-email-input"   
                placeholder="E-mail address"
                value={this.state.email}
                onChange={(e) => this.handleChange(e, "email")}
                onBlur={(e) => this.handleBlur(e, "email")}
                message={this.state.formErrors.email}
                type="Email"  variant="outlined"
                />
                </FormControl>
            <div className="validated-error">{this.state.formErrors.email}</div>
      
  
       <InputLabel htmlFor="standard-adornment-password" className="input-label">Password</InputLabel> 
          <FormControl className="form-area__control" variant="outlined">
          {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
          <OutlinedInput 
            id="outlined-adornment-password"
            type= {this.state.showPassword ? "text": "password"}
            value={this.state.password}
            onChange={(e) => this.handleChange(e, "password")}
            onBlur={(e) => this.handleBlur(e, "password")}
            message={this.state.formErrors.password}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  edge="end"
                >
               {this.state.showPassword ? <Visibility />: <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            />
        </FormControl>
        <div className="validated-error">{this.state.formErrors.password}</div>
  

        <div className="forgot-link">
        <Link href="#" >
            Forgot password ?
         </Link>
        </div>
        </form>
       <div className="form-button-grop">
       <Button type="submit"
        onClick={this.handleSubmit}
        // disabled={this.state.disableSubmit}
       className="form-button-grop__custom-button">Log In</Button>
       </div>
        <div className="form-newaccont">
            <span>New Here?</span>
            <Link href="#" >
            Create an Account
         </Link>
        </div>
        </div>
        </>
    );
  }
}
export default Login;