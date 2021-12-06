import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NoSearchFound from "../NoSearchFound";
import NoresultImg from "../../assets/images/not-found.svg";
import { ErrorMessages } from "../../constants/Messages";

const ToolInfo = (props) => {
  const [expanded, setExpanded] = React.useState(1);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : "");
  };
  const [getHowToWorkData, setGetHowToWorkData] = useState([]);

  useEffect(() => {
    setGetHowToWorkData(props.howItWorkData);
  }, []);

  console.log("how it works data after popup", props.howItWorkData.content);

  return (
    <div className="cardInfo custom-scroll">
      {props?.howItWorkData?.content?.length > 0 ? (
        props.howItWorkData.content.map((toolInstruction, index) => {
          return (
            <Accordion
              expanded={expanded === toolInstruction.id}
              onChange={handleChange(toolInstruction.id)}
            >
              <AccordionSummary
                expandIcon={
                  expanded === toolInstruction.id ? <RemoveIcon /> : <AddIcon />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {toolInstruction.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>{toolInstruction.description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <NoSearchFound
          img={NoresultImg}
          heading={ErrorMessages.howToWorkNotFound}
        />
      )}
      {/* <Accordion expanded={expanded === 1} onChange={handleChange(1)}>
        <AccordionSummary
          expandIcon={expanded === 1 ? <RemoveIcon /> : <AddIcon />}
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
      </Accordion> */}

      {/* <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={expanded === "panel2" ? <RemoveIcon /> : <AddIcon />}
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
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={expanded === "panel3" ? <RemoveIcon /> : <AddIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Output</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>TBD</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={expanded === "panel4" ? <RemoveIcon /> : <AddIcon />}
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
      </Accordion> */}
    </div>
  );
};

export default ToolInfo;
