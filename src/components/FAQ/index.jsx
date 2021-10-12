import React from "react";
import Footer from "../Footer";
import Header from "../Header";

import Typography from "@material-ui/core/Typography";

const Faqs = () => {
  return (
    <>
      <Header />
      <div className="faq">
        <Typography component="div" className="sucess_message">
          Fequently ask question(FAQS)
        </Typography>
      </div>
      <Footer />
    </>
  );
};

export default Faqs;
