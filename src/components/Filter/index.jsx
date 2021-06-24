import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import librarycards from "../../assets/images/library-cards.svg";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';

function Home(props) {
    
    return (
        <div className="header-bg">
        <Toolbar className="filter-section">
        <div className="flexGrow">
      <Grid container spacing={3}>
           <Grid item xs={12} sm={8}>
          <Paper className="paperstyel">
              <span className="review-text">Review 100+</span> <span className="filter-text">tools, Select the best for you.</span>
              <div className="filter-normal-text">All the tools are well developed and tested, created by our best developers</div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Paper className="paperstyel">
              <img src={librarycards}/>
          </Paper>
        </Grid>
       
      </Grid>
    </div>
    </Toolbar>
    <Toolbar>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
          <Paper component="form" className="flexGrow">
        <IconButton className="iconButton search-icon" aria-label="menu">
          <SearchIcon/>
        </IconButton>
        <InputBase
          className="input"
          placeholder="Search Here"
          inputProps={{ 'aria-label': 'search google maps' }}
        />
       <Divider className="divider" orientation="vertical" />
      <IconButton  className="iconButton" aria-label="directions">
        <FilterListIcon />Filter
      </IconButton>
    </Paper>
            </Grid>
        </Grid>
    </Toolbar>
        </div>
    );
}

export default Home;