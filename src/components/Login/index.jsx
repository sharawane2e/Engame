import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import Link from '@material-ui/core/Link';
import {EMAIL_LENGTH, PASSWORD_MAX_LENGTH} from "../../constants/ConstantValues";
import { LoginValidation } from "../../util/FormValidation";
  

class Login extends Component {
    //  const [values, setValues] = React.useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false,
    //   });
    //   const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    //   };
    
    //   const handleClickShowPassword = () => {
    //     setValues({ ...values, showPassword: !values.showPassword });
    //   };
    
    //   const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    //   };

      state = {
        email: "",
        password: "",
        formErrors: {
          email: "",
          password: "",
        },
        //
      };
      // sendMessage = (e) => {
      //   e.preventDefault();
      //   console.log(this.state);
      //   // this.setState({
      //   //   [key]: value,
      //   //   formErrors: { ...this.state.formErrors, [key]: errorMessage },
      //   // });
      // };
      loginValidation = new LoginValidation();
      
      handleSubmit = (el) => {
        el.preventDefault();
        const { email, password } = this.state;
        const validationResponse = this.loginValidation.validateForm({
          email,
          password,
        });
        console.log("click",validationResponse)
      }
      handleChange = (e, key) => {
        let value = e.target.value;
        const validationResponse = this.loginValidation.validateField(key, value);
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
      }
      
      render() {
       // const [isReginOpen, setReginIsOpen] = useState(false);
        //const { isReginOpen, setReginIsOpen } = ;
    return (
      
        <>
        <div className="form-area">
            <div className="form-area__login  large-hedding">Login</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
            <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail address</InputLabel> 
            <FormControl className="form-area__control">
            <TextField
            id="outlined-email-input"  label="E-mail address" 
            value={this.state.email}
            onChange={(e) => this.handleChange(e, "email")}
            onBlur={(e) => this.handleBlur(e, "email")}
            // onChange={(e) => this.handleChange(e, "email")}
            // onBlur={(e) => this.handleBlur(e, "email")}
            // message={this.state.formErrors.email}
            // maxLength={EMAIL_LENGTH}
            type="Email" autoComplete="current-email" variant="outlined"
            />
                </FormControl>
        <InputLabel htmlFor="standard-adornment-password" className="input-label">Password</InputLabel> 
          <FormControl className="form-area__control" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput 
            id="outlined-adornment-password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e, "password")}
            onBlur={(e) => this.handleBlur(e, "password")}
            endAdornment={
              <InputAdornment position="end" label="Outlined" variant="outlined">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
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