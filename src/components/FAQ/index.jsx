import React from "react";
import Footer from "../Footer";
import Header from "../Header";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import { AccordionSummary } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Faqs = () => {
  const [expanded, setExpanded] = React.useState("1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };
  return (
    <>
      <Header />
      <div className="faq">
        <Container maxWidth="lg" className="faq__container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius faq__paper">
                <Typography component="div" className="faq__header">
                  Fequently ask question(FAQS)
                </Typography>
                <div className="faq__accordion">
                  <Accordion
                    expanded={expanded === "1"}
                    onChange={handleChange("1")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "1" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        What can you test?
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "2"}
                    onChange={handleChange("2")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "2" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel2bh-content"
                      id="panel2bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Customize
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "3"}
                    onChange={handleChange("3")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "3" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel3bh-content"
                      id="panel3bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Output
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion
                    expanded={expanded === "4"}
                    onChange={handleChange("4")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "4" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step for implementation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "5"}
                    onChange={handleChange("5")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "5" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step for implementation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "6"}
                    onChange={handleChange("6")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "6" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step for implementation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "7"}
                    onChange={handleChange("7")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "7" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step for implementation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "8"}
                    onChange={handleChange("8")}
                  >
                    <AccordionSummary
                      expandIcon={
                        expanded === "8" ? <RemoveIcon /> : <AddIcon />
                      }
                      aria-controls="panel4bh-content"
                      id="panel4bh-header"
                    >
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        Step for implementation
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>TBD</Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Faqs;
