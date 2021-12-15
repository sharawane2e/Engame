import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Skeleton from "@mui/material/Skeleton";

const PurchaseSingleItem = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius">
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              container
              className="purchased-tool__tool-type-data"
            >
              <div className="purchased-tool__purchased-date">
                <span className="purchased-tool__date-type-text purchased-curent-text">
                  <Skeleton variant="text" width={200} />
                </span>
              </div>
            </Grid>

            <Grid
              item
              xs={2}
              container
              className="purchased-tool__tool-image purchased-image"
            >
              <Skeleton variant="rectangular" width="100%" height={150} />
            </Grid>
            <Grid
              item
              xs={10}
              sm
              container
              className="purchased-tool__tool-data"
            >
              <Grid item xs={10}>
                <Grid item>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="50%" />
                  <Skeleton variant="text" width="50%" />
                </Grid>
              </Grid>
              <Grid item xs={2} className="grid-flex">
                <Skeleton variant="text" width="70%" />
              </Grid>

              <Grid
                item
                xs={12}
                container
                className="purchased-tool__tool-margin"
              >
                <Grid item xs={4}>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item xs={2}>
                  <Skeleton variant="text" width="70%" />
                </Grid>
                <Grid item xs={6} className="grid-flex">
                  <div className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle">
                    <Skeleton variant="text" width={50} />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const PurchasedLoader = (props) => {
  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
        <Container
          maxWidth="lg"
          className="purchased-tool__container  margin-top-174 shopping-cart-data"
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              className="purchased-tool__hedding purchased-tool__borderdata"
            >
              <Typography
                color="textPrimary"
                component="div"
                className="hedding-text"
              >
                My Widgets
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} className="purchased-tool__filterTabs">
            <Grid
              item
              xs={12}
              className="purchased-tool__hedding purchased-tool__tabing"
            >
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
              <Skeleton variant="rectangular" width={80} height={30} />
            </Grid>
          </Grid>
          <PurchaseSingleItem />
          <PurchaseSingleItem />
          <PurchaseSingleItem />
        </Container>
      </div>
    </>
  );
};

export default PurchasedLoader;
