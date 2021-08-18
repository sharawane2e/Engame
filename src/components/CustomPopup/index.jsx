import React from "react";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Overlay from "../Overlay";
import { getClassNames } from "../../util/Utility";

const CutomPopup = (props) => {
  const { children, open, onClose, headerText = "" } = props;
  return open ? (
    <>
      <Overlay position="absolute" />
      <div className="popup-container">
        <div
          className={getClassNames("popup-container__iner", props.className)}
        >
          {headerText ? (
            <div className="popup-container__header border-bottom">
              <div className="popup-container__text ">{headerText}</div>
              <div className="popup-container__close" onClick={onClose}>
                <CloseOutlinedIcon />
              </div>
            </div>
          ) : (
            <>
              <div
                className="popup-container__close-withoutheader"
                onClick={onClose}
              >
                <CloseOutlinedIcon />
              </div>
            </>
          )}
          <div className="popup-container__body">{children}</div>
          {/* {footerButton?<div className="popup-container__footer">
             dfsdfsdf
        </div>:null} */}
        </div>
      </div>
    </>
  ) : null;
};

export default CutomPopup;
