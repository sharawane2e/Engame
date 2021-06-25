import React,{useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import e2eLogo from "../../assets/images/E2E-logo.png";
import Popup from "../CustomPopup";
import Login from "../Login";
import Registration from "../Registration";

const Header=()=> {
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
          <Button color="inherit" onClick={() =>setLoginIsOpen(true)}>Login</Button>
          <Button color="inherit" onClick={() =>setReginIsOpen(true)}>Registeration</Button>
          <ShoppingCartIcon/>
          </div>
        </Toolbar>
      </AppBar>
      </div>
      <Popup open={isLoginOpen} onClose={() =>setLoginIsOpen(false)}>
        <Login/>
      </Popup>
      <Popup open={isReginOpen} onClose={() =>setReginIsOpen(false)}>
        <Registration/>
      </Popup>
      {/* <Popup open={isReginOpen} onClose={() =>setLoginIsOpen(false)}>
        <Registration/>
      </Popup> */}
      </>
    );
}

export default Header;