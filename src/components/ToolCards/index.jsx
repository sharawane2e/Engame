import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tools from "../../mock/ToolCards";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GetAppIcon from "@material-ui/icons/GetApp";
import ToolDemo, { renderCard } from "../ToolDemo";
import CustomPopup from "../CustomPopup";
 
const ToolCards = (props) => {
  const [state, setState] = useState(Tools);
  const [selectedTool, setSelectedTool] = useState(null);
 
  const handleToolClick = (tool,title) => {
      console.log(tool)
        setSelectedTool(tool);
  };
 
  return (
    <Toolbar className="toolcard">
      <Grid container spacing={3}>
        {state.map((tooldata, index) => {
          return (
            <>
              <Grid item xs={12} lg={2} sm={4} key={index}>
                <Paper
                  className="paperstyel"
                  onClick={() => handleToolClick(tooldata)}
                >
                  <div className="toolcard__image">
                    <img src={tooldata.imgUrl} />
                  </div>
                  <div className="toolcard__align">
                    <div className="toolcard__items toolcard__download">
                      {tooldata.showDownload == false ? (
                        <span className="toolcard__sub-icons">
                          <GetAppIcon />
                        </span>
                      ) : null}
                    </div>
                    <div className="toolcard__items toolcard__shopping">
                      <span className="toolcard__sub-icons">
                        <ShoppingCartIcon />
                      </span>
                    </div>
                  </div>
                </Paper>
                <div className="toolcard__align toolcard__toolname">
                  <div className="toolcard__aligninr1">{tooldata.toolname}</div>
                  <div className="toolcard__aligninr">{tooldata.price}</div>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
      <CustomPopup
        open={selectedTool}
        onClose={() => setSelectedTool(null)}
        poupxl={true}
      >
        <ToolDemo tool={selectedTool}></ToolDemo>
      </CustomPopup>
    </Toolbar>
  );
};
 
export default ToolCards;