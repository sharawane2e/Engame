import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Paper } from "@material-ui/core";

const SingleItemLoader = () => {
  return (
    <Grid item xl={2} lg={3} md={3} sm={4} xs={12}>
      <Paper className="toolcard__imageblck toolcard__imageblck__dummy">
        <Stack spacing={3}>
          <div className="toolcard__imageblck__dummy__productImg">
            <Skeleton variant="rectangular" height={150} />
          </div>
          <div className="toolcard__imageblck__dummy__cart_code">
            <Skeleton variant="rectangular" width={50} height={50} />
            <Skeleton variant="rectangular" width={50} height={50} />
          </div>
        </Stack>
      </Paper>
      <div className="toolcard__imageblck__dummy__WName">
        <Skeleton variant="text" />
      </div>
    </Grid>
  );
};
const HomePageLoader = (props) => {
  return (
    <Grid container spacing={4}>
      <SingleItemLoader />
      <SingleItemLoader />
      <SingleItemLoader />
      <SingleItemLoader />
    </Grid>
  );
};

export default HomePageLoader;
