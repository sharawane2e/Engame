import React from "react";
import Footer from "../Footer";
import Header from "../Header";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const EmailActivationSucess = () => {
  return (
    <>
      <Header />
      <div className="emailActivation">
        <Container maxWidth="lg" className="emailActivation__container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius emailActivation__paper">
                <Typography component="div" className="faq__header">
                  Fequently ask question(FAQS)
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EmailActivationSucess;
