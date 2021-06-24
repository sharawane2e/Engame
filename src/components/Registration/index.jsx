import React from 'react';
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
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
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
    return (
        <>
        <div className="form-area">
            <div className="form-area__login  large-hedding">Registartion</div>
            <form className="form-area__fileds" noValidate autoComplete="off">
            <InputLabel htmlFor="standard-adornment-email" className="input-label">Name</InputLabel> 
            <FormControl className="form-area__control">
            <TextField id="outlined-email-input" label="Email"  type="Email" autoComplete="current-email" variant="outlined" />
            </FormControl>
            <InputLabel htmlFor="standard-adornment-email" className="input-label">E-mail</InputLabel> 
            <FormControl className="form-area__control">
            <TextField id="outlined-email-input" label="Email"  type="Email" autoComplete="current-email" variant="outlined" />
            </FormControl>
            <InputLabel htmlFor="standard-adornment-password" className="input-label">Password</InputLabel> 
          <FormControl className="form-area__control" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput 
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" label="Outlined" variant="outlined">
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
            labelWidth={70}
          />
        </FormControl>
        <InputLabel htmlFor="standard-adornment-confirm-password" className="input-label">Confirm Password</InputLabel> 
          <FormControl className="form-area__control" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
          <OutlinedInput 
            id="outlined-adornment-confirm-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" label="Outlined" variant="outlined">
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
            labelWidth={70}
          />
        </FormControl>
        </form>
       <div className="form-button-grop">
       <Button type="button" className="form-button-grop__custom-button">Register</Button>
       </div>
     
        </div>
        </>
    );
}
export default Registration;