import React, { useState, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import librarycards from "../../assets/images/library-cards.svg";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import CarouselBeforeLogin from "../Carousel/CarouselBeforeLogin";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useAutocomplete } from "@mui/core/AutocompleteUnstyled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { useStore } from "react-redux";
import { listProducts } from "../../redux/product/product-action";
import { CATEGORIES_LIST } from "../../config/ApiUrl";
import ApiRequest from "../../util/ApiRequest";
import { loadingStop } from "../../redux/loader/loader-actions";
import CarouselAfterLogin from "../Carousel/CarouselAfterLogin";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Tag = (props) => {
  const { label, onDelete, ...other } = props;
  return (
    <Stack direction="row" spacing={1} className="filterInput__chipBox">
      <Chip label={label} onDelete={onDelete} />
    </Stack>
  );
};

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Filter = () => {
  const [searchText, setSearchText] = useState("");
  const [categoriesList, setCategoriesList] = useState([""]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isFilter, setIsFilter] = useState(false);
  const [isSearchNotActive, setIsSearchNotActive] = useState(true);
  const {
    getRootProps: getfilterRootProps,
    getInputLabelProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    // defaultValue: [top100Films[1]],
    multiple: true,
    options: OldCategoriesList,
    getOptionLabel: (option) => option.title,
  });

  const FilterAction = async (SelectedCategoriesList, searchText) => {
    console.log("Selected data", SelectedCategoriesList);
    console.log("Selected val", value);

    let selectedCategoriesId = SelectedCategoriesList.map((item) => {
      return item.id;
    });

    let ApiData = {
      widget_type_id:
        selectedCategoriesId.length > 0 ? selectedCategoriesId : "",
      search_string: searchText,
      isFilter: true,
    };

    let getWidgetList = {
      isFilter: false,
    };

    dispatch(
      listProducts(isFilter && user.isLoggedIn ? ApiData : getWidgetList)
    );
    // alert("Categories List render");
  };

  const GetCategoriesList = () => {
    console.log("user data", user.isLoggedIn);
    if (user.isLoggedIn && categoriesList.length > 0) {
      ApiRequest.request(CATEGORIES_LIST, "GET").then((res) => {
        setCategoriesList(res?.data[0] || []);
      });
    }
  };

  const SaerchValue = (e) => {
    setSearchText(e.target.value);
    setIsFilter(true);

    if (e.target.value.length == 0) {
      FilterAction(value, null);
      setIsSearchNotActive(true);
    } else {
      setIsSearchNotActive(false);
    }
  };

  const handelSearchValueFilterClick = async (e) => {
    setIsFilter(true);

    e.preventDefault();
    await FilterAction(value, searchText);
    setIsSearchNotActive(true);
  };

  const handelFilterClick = () => {
    setIsFilter(true);
  };

  useEffect(() => {
    GetCategoriesList();
  }, [user]);

  useEffect(() => {
    FilterAction(value, searchText);
  }, [value, user]);

  useEffect(() => {
    setIsFilter(false);
  }, [user]);

  return (
    <>
      {user.isLoggedIn ? (
        <div className="header-bg filter-tool-shadow filter--fixed">
          <Toolbar className="filter-section">
            <div className="flexGrow">
              <CarouselAfterLogin />
            </div>
          </Toolbar>
          <div className="searchNFilter">
            <Toolbar className="filter-inputsection">
              <Grid item xs={12} sm={12}>
                <div className="filter-inputsection__filter_search">
                  <Paper
                    component="form"
                    className="flexGrow filter-inputsection__form"
                  >
                    <InputBase
                      className="input"
                      onChange={(e) => SaerchValue(e)}
                    />
                    <Divider className="divider" orientation="vertical" />
                    <IconButton
                      className="iconButton filter-inputsection__icon"
                      aria-label="directions"
                      onClick={handelSearchValueFilterClick}
                      type="submit"
                      disabled={isSearchNotActive ? true : false}
                    >
                      <IconButton
                        className="iconButton search-icon"
                        aria-label="menu"
                      >
                        <SearchIcon fontSize="inherit" />
                      </IconButton>
                    </IconButton>
                  </Paper>
                  <Paper
                    component="form"
                    className="flexGrow filter-inputsection__form filter-inputsection__form1"
                  >
                    {value.length && value.length ? (
                      <p className="filter-inputsection__form__filterOn"></p>
                    ) : (
                      ""
                    )}

                    <IconButton
                      className="iconButton filter-inputsection__icon filter-inputsection__icon1"
                      aria-label="directions"
                      onClick={() => handelFilterClick()}
                    >
                      <input
                        {...getInputProps()}
                        className="filter-inputsection__filterBtn"
                      />
                      <FilterListIcon
                        fontSize="large"
                        className="filter-inputsection__filterIcon"
                      />

                      <div className="filterLisDiv">
                        <div {...getfilterRootProps()}>
                          {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
                        </div>
                        {groupedOptions.length > 0 ? (
                          <ul {...getListboxProps()} className="filterListUl">
                            <p className="filterListUl__listTopPara">
                              Filter by categories
                            </p>
                            {groupedOptions.map((option, index) => (
                              <li {...getOptionProps({ option, index })}>
                                <span>{option.widget_type}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </IconButton>
                  </Paper>
                </div>
              </Grid>
            </Toolbar>
            <div
              ref={setAnchorEl}
              className={focused ? "focused filterInput" : "filterInput"}
            >
              {value.map((option, index) => (
                <Tag label={option.widget_type} {...getTagProps({ index })} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="header-bg filter-tool-shadow filter--fixed">
          <Toolbar className="filter-section nonFilter-section">
            <div className="flexGrow">
              <Grid container spacing={3} className="align-item">
                <Grid item xs={12} sm={7} md={7} lg={7} xl={7}>
                  <Paper className="paperstyel filter-font-family">
                    <span className="review-text">Review 100+ &nbsp;</span>
                    <span className="filter-text">
                      tools, select the
                      <br />
                      best for you.
                    </span>
                    <div className="filter-normal-text">
                      All the tools are well developed and tested, created by
                      our best developers
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={7} md={5} lg={5} xl={5}>
                  <Paper className="paperstyel grid-paper-style">
                    {/* <img src={librarycards} /> */}
                    <CarouselBeforeLogin />
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </Toolbar>
        </div>
      )}
    </>
  );
};

const OldCategoriesList = [
  { widget_type: "Heatmaps and Highlighters", id: 1 },
  { widget_type: "Rating", id: 2 },
  { widget_type: "Single and Multi selects", id: 3 },
  { widget_type: "Maps", id: 4 },
  { widget_type: "Ranking", id: 5 },
  { widget_type: "collection", id: 6 },
  { widget_type: "Numeric", id: 7 },
];

export default Filter;
