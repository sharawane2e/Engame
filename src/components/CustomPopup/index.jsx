import React from "react";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Grid from '@material-ui/core/Grid';

function CutomPopup(props) {
  const {
    children,
    open,
    onClose,
    classes = {},
    headerText = "",
    poupxl=true,
    gridAdd=true,
    gridValue=7,
  } = props;
  const { content = "" } = classes;
  return open ? (
      <>
    <div className="popup-container">
     <div className={poupxl?"popup-container__iner popup-container__inerxl":"popup-container__iner popup-container__inersm"}>
     {<div className={headerText?"popup-container__header border-bottom":"popup-container__header"} >
         <div className="popup-container__text ">{headerText}</div>
          <div className="popup-container__close" onClick={onClose}>
            <CloseOutlinedIcon/>
          </div>
       </div>
      }
       <div className="popup-container__body">
       <Grid container spacing={3}>
             {gridAdd ?<Grid item xs={12} sm={5} className="login-background">
             </Grid>:""}
             <Grid item xs={12} sm={gridAdd?gridValue:12}>
             <div className={"confirmation-text" + content}>{children}</div>
             </Grid>
         </Grid>
        </div>
     </div>
    </div>
    </>
  ) : null;
}

export default CutomPopup;
