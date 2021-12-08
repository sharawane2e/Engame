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
  let initialOpenTabs = props.howItWorkData.content[0].id;

  const [expanded, setExpanded] = React.useState(initialOpenTabs);

  const handleChange = (initialOpenTabs) => (event, isExpanded) => {
    setExpanded(isExpanded ? initialOpenTabs : "");
  };
  const [getHowToWorkData, setGetHowToWorkData] = useState([]);

  useEffect(() => {
    setGetHowToWorkData(props.howItWorkData);
  }, []);

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
    </div>
  );
};

export default ToolInfo;
