import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import e2eLogo from "../../assets/images/E2E-logo.png";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static">
        <Toolbar className="header-bg">
          <Typography variant="h6" className={classes.title}>
            <img src={e2eLogo}/>
          </Typography>
          <div className="header-text-color">
          <Button color="inherit">Login</Button>
          <Button color="inherit">Registeration</Button>
          <ShoppingCartIcon/>
          </div>
        </Toolbar>
      </AppBar>
        </div>
    );
}

export default Home;