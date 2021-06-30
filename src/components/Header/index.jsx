import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import e2eLogo from "../../assets/images/E2E-logo.png";
import CustomPopup from "../CustomPopup";
import Login from "../Login";
import Registration from "../Registration";
import Grid from '@material-ui/core/Grid';
// import clsx from 'clsx';

const Header=(props)=> {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isReginOpen, setReginIsOpen] = useState(false);
    return (
      <>
      <div className="flexGrow">
        <AppBar position="static">
        <Toolbar className="header-bg">
          <Typography variant="h6" className="flexGrow">
            <img src={e2eLogo}/>
          </Typography>
          <div className="header-text-color">
          <Button color="inherit" onClick={() =>setLoginIsOpen(true)}>Login</Button>|
          <Button color="inherit" onClick={() =>setReginIsOpen(true)}>Registeration</Button>
        <div className="shoping__card">
        <ShoppingCartIcon/>
        </div>
          </div>
        </Toolbar>
      </AppBar>
      </div>
      <CustomPopup open={isLoginOpen} onClose={() =>setLoginIsOpen(false)} poupxl={true}> 
        <Grid container spacing={3}>
          <Grid item xs={12} sm={5} className="login-background">
          </Grid>
          <Grid item xs={12} sm={7}>
            <Login data="high" />
          </Grid>
        </Grid>
      </CustomPopup>
      <CustomPopup open={isReginOpen} onClose={() =>setReginIsOpen(false)}poupxl={true}>
     <Grid container spacing={3}>
      <Grid item xs={12} sm={5} className="login-background">
             </Grid>
        <Grid item xs={12} sm={7}>
        <Registration/>
          </Grid>
        </Grid> 
      </CustomPopup>
      </>
    );
}

export default Header;