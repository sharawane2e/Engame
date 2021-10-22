import React from "react";
import Header from "../Header";
import Filter from "../Filter";
import ToolCards from "../ToolCards";
import Footer from "../Footer";

function header(props) {
  return (
    <>
      <Header />
      <Filter />
      <ToolCards />
      <Footer />
    </>
  );
}

export default header;
