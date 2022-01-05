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

const OldCategoriesList = [
  { widget_type: "Heatmaps and Highlighters", id: 1 },
  { widget_type: "Rating", id: 2 },
  { widget_type: "Single and Multi selects", id: 3 },
  { widget_type: "Maps", id: 4 },
  { widget_type: "Ranking", id: 5 },
  { widget_type: "collection", id: 6 },
  { widget_type: "Numeric", id: 7 },
];

const Filter = () => {
  const [isFilterApply, setIsFilterApply] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [isSearchNotActive, setIsSearchNotActive] = useState(true);

  const [filterSelectedDataList, setFilterSelectedDataList] = useState([]);

  const [categoriesList, setCategoriesList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const FilterAction = async (filterSelectedDataList, searchText) => {
    // let selectedCategoriesId = SelectedCategoriesList.map((item) => {
    //   return item.id;
    // });

    let ApiData = {
      widget_type_id:
        filterSelectedDataList.length > 0 ? filterSelectedDataList : "",
      search_string: searchText,
      isFilter: true,
    };

    let getWidgetList = {
      isFilter: false,
    };

    // dispatch(
    //   listProducts(isFilterApply && user.isLoggedIn ? ApiData : getWidgetList)
    // );
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
    if (!isFilterOpen) {
      setIsFilterOpen(true);
    } else {
      setIsFilterOpen(false);
    }
  };

  const getMenuData = (Ldata) => {
    if (Ldata) {
      const result =
        filterSelectedDataList.length > 0 &&
        filterSelectedDataList.filter((Item) => Item == Ldata.widget_type);
      if (result && result.length > 0) {
        // debugger;
        let tempv = filterSelectedDataList.indexOf(result[0]);
        let A = filterSelectedDataList;
        let keshav = A.splice(tempv);
        setFilterSelectedDataList(A);
        console.log("Data after removed", A);
        setFilterSelectedDataList(A);

        // setFilterSelectedDataList([
        //   ...filterSelectedDataList.splice(2),
        //   e.target.value,
        // ]);
      } else {
        // setFilterSelectedDataList([...filterSelectedDataList, Ldata]);
        console.log(Ldata);
      }
      console.log("Removed Data", result);
    }
  };
  useEffect(() => {
    console.log("Selected Data", filterSelectedDataList);
  }, [filterSelectedDataList]);

  useEffect(() => {
    FilterAction(filterSelectedDataList, searchText);
  }, [filterSelectedDataList, user]);

  useEffect(() => {
    setIsFilterApply(false);
    GetCategoriesList();
    setCategoriesList(OldCategoriesList);
    console.log(categoriesList);
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
                    {filterSelectedDataList?.length ? (
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
                    </IconButton>

                    {isFilterOpen && (
                      <div>
                        <div className="filterDiv">
                          <p className="filterListUl__listTopPara">
                            Filter by categories
                          </p>

                          <FormGroup>
                            {categoriesList.map((list, index) => {
                              return (
                                <FormControlLabel
                                  control={<Checkbox />}
                                  label={list.widget_type}
                                  onClick={() => getMenuData(list)}
                                />
                              );
                            })}
                          </FormGroup>
                        </div>
                      </div>
                    )}
                  </Paper>
                </div>
              </Grid>
            </Toolbar>
            {/* <div className={focused ? "focused filterInput" : "filterInput"}> */}
            <div className="focused filterInput">
              {filterSelectedDataList.length > 0 &&
                filterSelectedDataList.map((prodd, index) => {
                  return <p>{prodd}</p>;
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
