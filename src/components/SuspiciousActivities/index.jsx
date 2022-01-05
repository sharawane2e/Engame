import React from "react";

const SuspiciousActivities = () => {
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
                <div className="faq__accordion"></div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SuspiciousActivities;
