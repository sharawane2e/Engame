import React from "react";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Overlay from "../Overlay";

function CutomPopup(props) {
  const {
    children,
    open,
    onClose,
    classes = {},
    headerText = "",
    poupxl,
  } = props;
  const { content = "" } = classes;
  return open ? (
      <>
     <Overlay position="absolute" />
    <div className="popup-container">
     <div className={poupxl?"popup-container__iner popup-container__inerxl":"popup-container__iner popup-container__inersm"}>
     {headerText?<div className="popup-container__header border-bottom" >
         <div className="popup-container__text ">{headerText}</div>
          <div className="popup-container__close" onClick={onClose}>
            <CloseOutlinedIcon/>
          </div>
       </div>: <>
       <div className="popup-container__close" onClick={onClose}>
            <CloseOutlinedIcon/>
          </div>
       </>
      }
       <div className="popup-container__body">
          {children}
        </div>
     </div>
    </div>
    </>
  ) : null;
}

export default CutomPopup;
