// import React from 'react';
// import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
// import Grid from '@material-ui/core/Grid';

// const Popup =(props) => {

//     return props.open?(
//         <>
//              {/* <div className="popUp-block" onClick={props.onClose}></div>  */}
//             <div className="popup-container">
//                 <div className="popup-container__iner">
//                     <div className="popup-container__close" onClick={props.onClose}><CloseOutlinedIcon/></div>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={5} className="login-background">
//                         </Grid>
//                         <Grid item xs={12} sm={7}>
//                         {props.children}
//                         </Grid>
//                     </Grid>
                    
//                 </div>
//             </div>
//         </>
//     ):null
// }
// export default Popup;


import React from "react";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Grid from '@material-ui/core/Grid';

function CutomPopup(props) {
  const {
    children,
    open,
    onClose,
    hasHeader,
    classes = {},
    headerText = "",
  } = props;
  const { content = "" } = classes;
  return open ? (
      <>
    <div className="popup-container">
     <div className="popup-container__iner">
         <div className="popup-container__close" onClick={onClose}><CloseOutlinedIcon/></div>
         {hasHeader && <div className="popup-container__header">{headerText}</div>}
         <Grid container spacing={3}>
             <Grid item xs={12} sm={5} className="login-background">
             </Grid>
             <Grid item xs={12} sm={7}>
             <div className={"confirmation-text" + content}>{children}</div>
             </Grid>
         </Grid>
     </div>
    </div>
    </>
  ) : null;
}

export default CutomPopup;
