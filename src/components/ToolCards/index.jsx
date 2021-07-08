import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tools from "../../mock/ToolCards";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import GetAppIcon from "@material-ui/icons/GetApp";
import ToolDemo from "../ToolDemo";
import CustomPopup from "../CustomPopup";
import Button from "@material-ui/core/Button";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
 
const ToolCards = () => {
  const [state] = useState(Tools);
  const [selectedTool, setSelectedTool] = useState(null);
 
  const handleToolClick = (tool) => {
        setSelectedTool(tool);
  };

  return (
   <>
    <Toolbar className="toolcard">
      <Grid container spacing={4}>
        {state.map((tooldata, index) => {
          return (
              <Grid item xs={12} lg={2} sm={4} key={index}>
                <Paper 
                  className="toolcard__imageblck"
                >
                  <div className="toolcard__image">
                    <img src={tooldata.imgUrl} />
                    <div className="toolcard__preview">
                     <Button className="toolcard__perview-button"  onClick={() => handleToolClick(tooldata)}> <RemoveRedEyeIcon className="eyes_icon"/> Preview</Button>
                    </div>
                  </div>
                  <div className="toolcard__align toolcard__toolicons">
                    <div className="toolcard__items toolcard__download">
                      {tooldata.showDownload == false ? (
                        <span className="toolcard__sub-icons">
                          <GetAppIcon />
                        </span>
                      ) : null}
                    </div>
                    <div className="toolcard__items toolcard__shopping">
                      <span className="toolcard__sub-icons">
                        <ShoppingCartIcon/>
                      </span>
                    </div>
                  </div>
                </Paper>
                <div className="toolcard__align toolcard__toolname">
                  <div className="toolcard__aligninr1 toolcard__font-family">{tooldata.toolname}</div>
                  <div className="toolcard__aligninr toolcard__font-family">${tooldata.price}</div>
                </div>
              </Grid>
          );
        })}
      </Grid>
      <CustomPopup
        open={selectedTool}
        onClose={() => setSelectedTool(null)}
        poupxl={true}
        headerText=""
      >
        <ToolDemo tool={selectedTool}></ToolDemo>
      </CustomPopup>
    </Toolbar>
   </>
  );
};
 
export default ToolCards;