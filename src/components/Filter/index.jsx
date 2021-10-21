// import React from "react";
import { Toolbar, Paper, Grid, IconButton } from "@mui/material";
// import librarycards from "../../assets/images/library-cards.svg";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Carousel from "../../util/Carousel";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
            {/* <InputBase className="input" /> */}

            {/* <Divider className="divider" orientation="vertical" /> */}

            <Autocomplete
              multiple
              id="tags-filled"
              options={top100Films.map((option) => option.title)}
              className="filter_box"
              // defaultValue={[top100Films[2].title]}
              // freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  // label="Select here"
                  placeholder="Add to click"
                />
              )}
            />
          </Paper>
        </Grid>
      </Toolbar>
    </div>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];

export default Home;
