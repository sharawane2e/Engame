import React ,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";
import { UserValidation } from "../../util/FormValidation";


class Registration extends Component {

  state = {
    name:"",
    email: "",
    setpassword: "",
    confirmpassword:"",
    data:"",
    showPassword:false,
    showPasswordConfirm:false,
    formErrors: {
      name:"",
      email: "",
      setpassword: "",
      confirmpassword:"",
    },
    
  };

  UserValidation = new UserValidation();

  handleRegister = (e) => {
    e.preventDefault();
    const { name, email , setpassword, confirmpassword} = this.state;
         const validationResponse = this.UserValidation.validateForm({
          name,email,setpassword,confirmpassword
         });
         if(validationResponse.isFormValid){
           console.log("wleocme to Register");
         }
         else{
          delete validationResponse.isFormValid;
          this.setState({
            formErrors: { ...this.state.formErrors, ...validationResponse.errors },
          });
         }
  }

  handleClickShowPassword = (e,key) => {
     this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.setState({ showPassword: !this.state.showPassword });
  }

  confirmPasswordShow = (e,key) => {
   this.confirmPasswordShow = this.confirmPasswordShow.bind(this);
   this.setState({ showPasswordConfirm: !this.state.showPasswordConfirm });
 }


  handleChange = (e, key) => {
    let value = e.target.value;
    const validationResponse = this.UserValidation.validateField(
      key,
      value,
    );
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
    const validationResponse = this.UserValidation.validateField(key, value);
    const errorMessage = validationResponse.message;
    this.setState({
      [key]: value,
      formErrors: { ...this.state.formErrors, [key]: errorMessage },
    });
  }

  render(){
    return(
      <>
        <div className="form-area">
             <div className="form-area__login  large-hedding">Registartion</div>
             <form className="form-area__fileds" noValidate autoComplete="off">
             <InputLabel htmlFor="standard-adornment-name" className="input-label">Name</InputLabel> 
            <FormControl className="form-area__control">
               <TextField 
                id="outlined-name-input" 
                placeholder="Name"  
                value={this.state.name}
                onChange={(e) => this.handleChange(e, "name")}
                onBlur={(e) => this.handleBlur(e, "name")}
                message={this.state.formErrors.name}
                type="Name"  variant="outlined" />
             <div className="validated-error">{this.state.formErrors.name}</div>
            </FormControl>

             <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail</InputLabel> 
             <FormControl className="form-area__control">
              <TextField id="outlined-email-input" 
                placeholder="Emails"  
                type="email"  
                value={this.state.email}
                onChange={(e) => this.handleChange(e, "email")}
                onBlur={(e) => this.handleBlur(e, "email")}
                message={this.state.formErrors.email}
                type="Email"  variant="outlined"
                />
              <div className="validated-error">{this.state.formErrors.email}</div>
             </FormControl>
    
          <InputLabel htmlFor="standard-adornment-password" className="input-label">Confirm Password</InputLabel> 
         <FormControl className="form-area__control" variant="outlined">
           <OutlinedInput 
             id="outlined-adornment-password"
             placeholder="Password "
             type= {this.state.showPassword ? "text": "password"}
             value={this.state.setpassword}
             onChange={(e) => this.handleChange(e, "setpassword")}
             onBlur={(e) => this.handleBlur(e, "setpassword")}
             message={this.state.formErrors.setpassword}
             endAdornment={
               <InputAdornment position="end" label="Outlined" >
                 <IconButton
                   aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                   edge="end"
                 >
                   {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                 </IconButton>
               </InputAdornment>
             }
            />
            <div className="validated-error">{this.state.formErrors.setpassword}</div>
         </FormControl>

         <InputLabel htmlFor="standard-adornment-password" className="input-label">Confirm Password</InputLabel> 
         <FormControl className="form-area__control" variant="outlined">
           <OutlinedInput 
             id="outlined-adornment-confirmpassword"
             placeholder="Password "
             type= {this.state.showPasswordConfirm ? "text": "password"}
             value={this.state.confirmpassword}
             onChange={(e) => this.handleChange(e, "confirmpassword")}
             onBlur={(e) => this.handleBlur(e, "confirmpassword")}
             message={this.state.formErrors.confirmpassword}
             endAdornment={
               <InputAdornment position="end" label="Outlined" >
                 <IconButton
                   aria-label="toggle password visibility"
                   onClick={this.confirmPasswordShow}
                   edge="end"
                 >
                    {this.state.showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                 </IconButton>
               </InputAdornment>
             }
            />
            <div className="validated-error">{this.state.formErrors.confirmpassword}</div>
         </FormControl>

         </form>
        <div className="form-button-grop">
        <Button type="button" className="form-button-grop__custom-button" onClick={this.handleRegister}>Register</Button>
        </div>
      <div>
       <Button type="button" className=""  >Back</Button>
      </div>
         </div>
      </>
    )
  }
}
export default Registration;
