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
import Carousel from "../../util/Carousel";
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
import HomePageBanner from "../../util/HomePageBanner";

const Root = styled("div")(
  ({ theme }) => `
  color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,.85)"
  };
  font-size: 14px;
`
);

const Label = styled("label")`
  padding: 0 0 4px;
  line-height: 1.5;
  display: block;
`;

const InputWrapper = styled("div")(
  ({ theme }) => `
  width: 300px;
  border: 1px solid ${theme.palette.mode === "dark" ? "#434343" : "#d9d9d9"};
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
  }

  &.focused {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
    color: ${
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.65)"
        : "rgba(0,0,0,.85)"
    };
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);
function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <CloseIcon onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const StyledTag = styled(Tag)(
  ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.08)" : "#fafafa"
  };
  border: 1px solid ${theme.palette.mode === "dark" ? "#303030" : "#e8e8e8"};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === "dark" ? "#177ddc" : "#40a9ff"};
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`
);

const Listbox = styled("ul")(
  ({ theme }) => `
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: ${theme.palette.mode === "dark" ? "#141414" : "#fff"};
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#2b2b2b" : "#fafafa"};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: ${theme.palette.mode === "dark" ? "#003b57" : "#e6f7ff"};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);

const Filter = () => {
  const [searchText, setSearchText] = useState("");
  const [categoriesList, setCategoriesList] = useState([""]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isFilter, setIsFilter] = useState(false);
  const {
    getRootProps,
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
    // getOptionLabel: (option) => option.title,
  });

  const FilterAction = async (SelectedCategoriesList, searchText) => {
    // debugger;
    // debugger;
    // console.log(SelectedCategoriesList, "filter Data");
    // console.log(searchText, "Search Data");

    let selectedCategoriesId = SelectedCategoriesList.map((item) => {
      return item.id;
    });
    // console.log(selectedCategoriesId, "Selected Categories list");
    let ApiData = {
      widget_type_id:
        selectedCategoriesId.length > 0 ? selectedCategoriesId : "",
      search_string: searchText,
      isFilter: user.isLoggedIn ? isFilter : false,
    };

    dispatch(listProducts(ApiData));
  };

  const GetCategoriesList = () => {
    ApiRequest.request(CATEGORIES_LIST, "GET").then((res) => {
      setCategoriesList(res?.data[0] || []);
    });
  };

  const SaerchValue = (e) => {
    setSearchText(e.target.value);

    user.isLoggedIn ? setIsFilter(true) : setIsFilter(false);

    if (e.target.value.length == 0) {
      FilterAction(value, null);
    }
  };

  const handelSearchValueFilterClick = (e) => {
    user.isLoggedIn ? setIsFilter(true) : setIsFilter(false);

    e.preventDefault();
    FilterAction(value, searchText);
  };

  useEffect(() => {
    GetCategoriesList();

    FilterAction(value, searchText);
    // console.log(productList);
  }, [value, user]);

  return (
    <>
      {user.isLoggedIn ? (
        <div className="header-bg filter-tool-shadow filter--fixed">
          <Toolbar className="filter-section">
            <div className="flexGrow">
              <HomePageBanner />
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
                    >
                      <input
                        {...getInputProps()}
                        className="filter-inputsection__filterBtn"
                      />
                      <FilterListIcon
                        fontSize="large"
                        className="filter-inputsection__filterIcon"
                      />

                      <Root>
                        <div {...getRootProps()}>
                          {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
                        </div>
                        {groupedOptions.length > 0 ? (
                          <Listbox
                            {...getListboxProps()}
                            className="filterListUl"
                            // onClick={() => FilterAction(value)}
                          >
                            {groupedOptions.map((option, index) => (
                              <li {...getOptionProps({ option, index })}>
                                <span>{option.widget_type}</span>
                                <CheckIcon fontSize="small" />
                              </li>
                            ))}
                          </Listbox>
                        ) : null}
                      </Root>
                    </IconButton>
                  </Paper>
                </div>
              </Grid>
            </Toolbar>
            <InputWrapper
              ref={setAnchorEl}
              className={focused ? "focused filterInput" : "filterInput"}
            >
              {value.map((option, index) => (
                <StyledTag
                  label={option.widget_type}
                  {...getTagProps({ index })}
                />
              ))}
            </InputWrapper>
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
                    <Carousel />
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
