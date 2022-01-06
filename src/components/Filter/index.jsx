import React, { useState, useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
import { listProducts } from "../../redux/product/product-action";
import { CATEGORIES_LIST } from "../../config/ApiUrl";
import ApiRequest from "../../util/ApiRequest";
import CarouselAfterLogin from "../Carousel/CarouselAfterLogin";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Checkbox, FormControlLabel, FormGroup } from "@material-ui/core";
import { CheckBox } from "@mui/icons-material";

const OldCategoriesList = [
  { widget_type: "Heatmaps and Highlighters", id: 1, selected: false },
  { widget_type: "Rating", id: 2 },
  { widget_type: "Single and Multi selects", id: 3, selected: false },
  { widget_type: "Maps", id: 4, selected: false },
  { widget_type: "Ranking", id: 5, selected: false },
  { widget_type: "collection", id: 6, selected: false },
  { widget_type: "Numeric", id: 7, selected: false },
];

const Filter = () => {
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isSearchNotActive, setIsSearchNotActive] = useState(true);

  const [filterSelectedDataList, setFilterSelectedDataList] = useState([]);

  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategoriesList, setSelectedCategoriesList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const FilterAction = async (filterSelectedDataList, searchText) => {
    let handelSelectedCategories = filterSelectedDataList.filter((item) => {
      return item.selected ? true : false;
    });

    setSelectedCategoriesList(handelSelectedCategories);

    let selectedCategoriesId = handelSelectedCategories.map((Item) => {
      return Item.id;
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
      listProducts(isFilterApply && user.isLoggedIn ? ApiData : getWidgetList)
      // listProducts(getWidgetList)
    );
  };

  const GetCategoriesList = () => {
    if (user.isLoggedIn && categoriesList.length > 0) {
      ApiRequest.request(CATEGORIES_LIST, "GET").then((res) => {
        setCategoriesList(res?.data[0]);
      });
    }
  };

  const SaerchValue = (e) => {
    setSearchText(e.target.value);
    setIsFilterApply(true);

    if (e.target.value.length == 0) {
      FilterAction(filterSelectedDataList, null);
      setIsSearchNotActive(true);
    } else {
      setIsSearchNotActive(false);
    }
  };

  const handelSearchValueFilterClick = async (e) => {
    setIsFilterApply(true);

    e.preventDefault();
    await FilterAction(filterSelectedDataList, searchText);
    setIsSearchNotActive(true);
  };

  const handelFilterClick = () => {
    setIsFilterApply(true);
  };

  const handleSelectedCategories = (clickedData) => {
    const newArrFilter = filterSelectedDataList.map((Item) => {
      return {
        widget_type:
          Item.widget_type == clickedData.widget_type
            ? clickedData.widget_type
            : Item.widget_type,
        id: Item.id,

        selected:
          Item.selected & (Item.widget_type == clickedData.widget_type)
            ? false
            : Item.selected & (Item.widget_type !== clickedData.widget_type)
            ? true
            : !Item.selected & (Item.widget_type == clickedData.widget_type)
            ? true
            : false,
      };
    });
    setFilterSelectedDataList(newArrFilter);
  };

  useEffect(() => {
    FilterAction(filterSelectedDataList, searchText);
  }, [filterSelectedDataList, user]);

  useEffect(() => {
    setIsFilterApply(false);
    GetCategoriesList();
    setCategoriesList(OldCategoriesList);
    setFilterSelectedDataList(OldCategoriesList);
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
                    {selectedCategoriesList?.length ? (
                      <p className="filter-inputsection__form__filterOn"></p>
                    ) : (
                      ""
                    )}

                    <IconButton
                      className="iconButton filter-inputsection__icon filter-inputsection__icon1"
                      aria-label="directions"
                      onClick={() => handelFilterClick()}
                    >
                      <FilterListIcon
                        fontSize="large"
                        className="filter-inputsection__filterIcon"
                      />
                      {/* {isFilterOpen && ( */}
                      <div className="filterDiv">
                        <p className="filterListUl__listTopPara">
                          Filter by categories
                        </p>
                        {filterSelectedDataList.map((list, index) => {
                          return (
                            <div
                              className="filterDiv__List"
                              onClick={() => handleSelectedCategories(list)}
                            >
                              <Checkbox
                                className="filterDiv__List__checkbox"
                                checked={list.selected ? true : false}
                              />
                              <p>{list.widget_type}</p>
                            </div>
                          );
                        })}
                      </div>
                      {/* )} */}
                    </IconButton>
                  </Paper>
                </div>
              </Grid>
            </Toolbar>
            {/* <div className={focused ? "focused filterInput" : "filterInput"}> */}
            <div className="focused filterInput">
              {selectedCategoriesList.length > 0 &&
                selectedCategoriesList.map((Item, index) => {
                  return (
                    <Chip
                      label={Item.widget_type}
                      onDelete={() => handleSelectedCategories(Item)}
                      className="filterInput__chipBox"
                    />
                  );
                })}
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

export default Filter;
