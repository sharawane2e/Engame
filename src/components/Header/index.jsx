import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import e2eLogo from "../../assets/images/E2E-logo.png";
import CustomPopup from "../CustomPopup";
import Login from "../Login";
import Registration from "../Registration";
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Header = (props) => {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
  const [isUserLogin] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  
  return (
      <>
      <div className="flexGrow header-box">
        <AppBar position="static">
        <Toolbar className="header-bg">
          <Typography variant="h6" className="flexGrow">
            <img src={e2eLogo}/>
          </Typography>
          <div className="header-text-color">
         {isUserLogin?<><div className="menu-button" onClick={() =>setLoginIsOpen(true)} >Login</div>|
            <div className="menu-button" onClick={() =>setReginIsOpen(true)}>Register</div>
         </>  
         :<FormControl className="userForm" >
        <InputLabel id="user-open-select">User</InputLabel>
        <Select
           labelId="user-open-select"
          id="user-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          <MenuItem value={10}>Logout</MenuItem>
          <MenuItem value={20}>Profile</MenuItem>
          </Select>
      </FormControl>}
           <div className="shoping__card">
             <ShoppingCartIcon/>
           </div>
          </div>
        </Toolbar>
      </AppBar>
      </div>
      <CustomPopup
        open={isLoginOpen}
        onClose={() => setLoginIsOpen(false)}
        poupxl={true}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} className="login-background"></Grid>
          <Grid item xs={12} sm={7}>
            <Login data="high" />
          </Grid>
        </Grid>
      </CustomPopup>
      <CustomPopup open={isReginOpen} onClose={() =>setReginIsOpen(false)} poupxl={true}>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={5} className="login-background">
             </Grid>
        <Grid item xs={12} sm={7}>
        <Registration/>
          </Grid>
        </Grid>
      </CustomPopup>
      {/* <CustomPopup open={isToolOpen} onClose={() =>setToolOpen(false)} poupxl={true} headerText="Craousal Rating">
     <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
           <ToolDemo/> 
          </Grid>
        </Grid>  
      </CustomPopup> */}
      </>
    );
}

export default Header;
