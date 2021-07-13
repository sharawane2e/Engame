import React, { useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Tools from "../../mock/ToolCards";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ToolDemo from "../ToolDemo";
import CustomPopup from "../CustomPopup";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { connect } from "react-redux";
import { addToCart } from "../../redux/shopping/shopping-action";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'; 
import  Embedcode  from "../EmbedCode";
import CustomButton from "../../components/widgets/Button";
import Subscription from '../../components/SubscriptionType';

const ToolCards = ({addToCart}) => {
  const [state] = useState(Tools);
  const [selectedTool, setSelectedTool] = useState(null);
  const [popupId, setPopupId] = useState()
  const [ispopup, setPopup] = useState(false);
  const [isSubscription, setSubscriptionPopup] = useState(false);

 
  const handleToolClick = (tool) => {
        setSelectedTool(tool);
  };

  return (
   <>
    <Toolbar className="toolcard">
      <Grid container spacing={4}>
        {state.map((tooldata, index) => {
          return (
              <Grid item xs={12} lg={2} sm={4} key={index} id={tooldata.id}>
                <Paper 
                  className="toolcard__imageblck">
                  <div className="toolcard__image">
                    <img src={tooldata.imgUrl} />
                    <div className="toolcard__preview">
                     <CustomButton className="toolcard__perview-button" onClick={() => handleToolClick(tooldata)}>
                        <RemoveRedEyeIcon className="eyes_icon"/> Preview
                     </CustomButton>
                    </div>
                  </div>
                  <div className="toolcard__align toolcard__toolicons">
                    <div className="toolcard__items toolcard__download">
                      {/* {tooldata.showDownload == true ? ( */}
                        <span className="toolcard__sub-icons">
                          <SystemUpdateAltIcon onClick={() => setPopup(true)}/>
                        </span>
                      {/* ) : null} */}
                    </div>
                    <div className="toolcard__items toolcard__shopping">
                      <span className="toolcard__sub-icons">
                        <ShoppingCartIcon  onClick= {(id) => {setSubscriptionPopup(true); setPopupId(tooldata.id)}}/>
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
        className="popup-container__iner--xl border-radius"
        >
        <ToolDemo tool={selectedTool}></ToolDemo>
      </CustomPopup>
        <CustomPopup 
          open={ispopup} onClose={() =>setPopup(false)} 
          headerText="Embed code"
          className="border-radius"
          >
          <Embedcode/>
        </CustomPopup>

        <CustomPopup
          open={isSubscription}
          onClose={() => setSubscriptionPopup(false)}
          headerText="Subscription Type"
          footerButton={true}
          className="border-radius popup-container__iner--sm"
        >
         <Subscription/> 
         <div className="popup-container__footer">
         <CustomButton className="primary-button add--card" onClick={(itemId) => addToCart(popupId)}>
            <ShoppingCartIcon/>  Add to Cart
         </CustomButton>
         </div>
        </CustomPopup>
      
    </Toolbar>
   </>
  
  );
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id) => dispatch(addToCart(id))
  }
}
 
export default connect(null, mapDispatchToProps)(ToolCards);