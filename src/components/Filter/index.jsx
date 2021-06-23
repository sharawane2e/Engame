import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import librarycards from "../../assets/images/library-cards.svg";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
    // root: {
    //   padding: '2px 4px',
    //   display: 'flex',
    //   alignItems: 'center',
    //   width: 400,
    // },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

function Home(props) {
    const classes = useStyles();
    return (
        <div className="header-bg">
        <Toolbar className="filter-section">
        <div className={classes.root}>
      <Grid container spacing={3}>
           <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
              <span className="review-text">Review 100+</span> <span className="filter-text">tools, Select the best for you.</span>
              <div className="filter-normal-text">All the tools are well developed and tested, created by our best developers</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
              <img src={librarycards}/>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
    </Toolbar>
    <Toolbar>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
            <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Here"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
            </Grid>
        </Grid>
    </Toolbar>
        </div>
    );
}

export default Home;