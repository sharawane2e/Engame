import React, { useState } from "react";

import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import Product from "./Product";
 
const ToolCards = ({products}) => {


  return (
    <>
    <Grid container >
    {products.map((prod) => (
      <Grid item xs={12} lg={2} sm={4} >
      <Product key={prod.id} productData={prod} />
      </Grid>
    ))}
    </Grid>
    </>
  );
};

const mapStateToProps = state => {
  return {
    products: state.shop.products
  }
}

 
export default connect(mapStateToProps)(ToolCards) ;