import React ,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";

const Registration =() => {

    const [values, setValues] = useState({
        password: '',
        confirmPassword:'',
        showPassword: false,
      });

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

     const isLoginOpen =(props) =>()=>{
       console.log("hey click");
     }
    return (
        <>
        <div className="form-area">
            <div className="form-area__login  large-hedding">Registartion</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
            <InputLabel htmlFor="standard-adornment-email" className="input-label">Name</InputLabel> 
              <FormControl className="form-area__control">
            <TextField id="outlined-email-input" placeholder="Name"  type="Name"  variant="outlined" />
            <div className="validated-error"></div>
            </FormControl>
            <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail</InputLabel> 
            <FormControl className="form-area__control">
            <TextField id="outlined-email-input" placeholder="Emails"  type="email"  variant="outlined" />
            <div className="validated-error"></div>
            </FormControl>
            <InputLabel htmlFor="standard-adornment-password" className="input-label">Password</InputLabel> 
          

          <FormControl className="form-area__control" variant="outlined">
          <OutlinedInput 
            id="outlined-adornment-password"
            placeholder="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" label="Outlined" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
           />
           <div className="validated-error"></div>

        </FormControl>
          <FormControl className="form-area__control" variant="outlined">
          <OutlinedInput 
            id="outlined-adornment-confirmpassword"
            placeholder="Confirm Password "
            type="password"
            // type={values.showPassword ? 'text' : 'password'}
             //value={values.confirmPassword}
            //onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" label="Outlined" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
           />
           <div className="validated-error"></div>
        </FormControl>


        </form>
       <div className="form-button-grop">
       <Button type="button" className="form-button-grop__custom-button">Register</Button>
       </div>
     <div>
      <Button type="button" className=""  onclick={isLoginOpen}>Back</Button>
     </div>
        </div>
        </>
    );
}
export default Registration;