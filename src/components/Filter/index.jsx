import React from "react";
import {
  Toolbar,
  Paper,
  Grid,
  InputBase,
  Divider,
  IconButton,
} from "@mui/material";
// import librarycards from "../../assets/images/library-cards.svg";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Carousel from "../../util/Carousel";

const Home = () => {
  return (
    <div className="header-bg filter-tool-shadow filter--fixed">
      <Toolbar className="filter-section">
        <div className="flexGrow">
          <Grid container spacing={3} className="align-item">
            <Grid item xs={12} sm={8}>
              <Paper className="paperstyel filter-font-family">
                <span className="review-text">Review 100+ &nbsp;</span>
                <span className="filter-text">
                  tools, select the best for you.
                </span>
                <div className="filter-normal-text">
                  All the tools are well developed and tested, created by our
                  best developers
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper className="paperstyel grid-paper-style">
                {/* <img src={librarycards} /> */}
                <Carousel />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
      <Toolbar className="filter-inputsection">
        <Grid item xs={12} sm={12}>
          <Paper
            component="form"
            className="flexGrow filter-inputsection__form"
          >
            <IconButton className="iconButton search-icon" aria-label="menu">
              <SearchIcon fontSize="inherit" />
            </IconButton>
            <InputBase className="input" />
            <Divider className="divider" orientation="vertical" />
            <IconButton
              className="iconButton filter-inputsection__icon"
              aria-label="directions"
            >
              <FilterListIcon fontSize="large" />
              Filters
            </IconButton>
          </Paper>
        </Grid>
      </Toolbar>
    </div>
  );
};

export default Home;
