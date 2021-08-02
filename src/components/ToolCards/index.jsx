import React, { useState,useEffect } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ToolPerview from "../ToolPerview";
import CustomPopup from "../CustomPopup";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/shopping/shopping-action";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import  Embedcode  from "../EmbedCode";
import CustomButton from "../../components/widgets/Button";
import Subscription from '../../components/SubscriptionType';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import LoadingBox from "../FullPageLoader/LoadingBox";
import MessageBox from "../FullPageLoader/MessageBox";
import { listProducts } from "../../redux/product/product-action";

const ToolCards = () => {
  // console.log(user);
  const [selectedTool, setSelectedTool] = useState(null);
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [popupId, setPopupId] = useState()
  const [ispopup, setPopup] = useState(false);
  const [isSubscription, setSubscriptionPopup] = useState(false);
  const productList = useSelector(state => state.productList)
  const user  = useSelector(state => state.user.isLoggedIn)
  const {loading, error, products} = productList
  const dispatch = useDispatch();

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  if(user.isLoggedIn){
    setLoginIsOpen(false)
  }

  // Fteching widget's from backend
  useEffect(() => {
    dispatch(listProducts())
  }, [])

  const handleCart = () => {
    dispatch(addToCart(popupId))
    toast.success("Your Item is added to shopping cart!")
  }

  return (
   <>
    <Toolbar className="toolcard">
      {loading ? (
      <LoadingBox />
      ) :
         error ? (
            <MessageBox>{error}</MessageBox>
          ):
         (
           <Grid container spacing={4}>
        
        {products.map((tooldata, index) => {
          return (
              <Grid item xs={12} lg={2} sm={4} key={index} id={tooldata.id}>
                <Paper 
                  className="toolcard__imageblck">
                  <div className="toolcard__image">
                    <img src={"http://192.168.1.124:8000"+tooldata.imgUrl} />
                    {/* <span>{tooldata.imgUrl}</span> */}
                    <div className="toolcard__preview">
                     <CustomButton className="toolcard__perview-button" onClick={() => handleToolClick(tooldata)}>
                        <RemoveRedEyeIcon className="eyes_icon"/> Preview
                     </CustomButton>
                    </div>
                  </div>
              
                  <div className="toolcard__align toolcard__toolicons">
                    <div className="toolcard__items toolcard__download">
                     {user?
                      <span className="toolcard__sub-icons">
                      <SystemUpdateAltIcon onClick={() => {setPopup(true); setPopupId(tooldata.id)}}/>
                    </span>:null 
                    }
                        
                    </div>
                    <div className="toolcard__items toolcard__shopping">
                    {user? <span className="toolcard__sub-icons">
                      {/* <ShoppingCartIcon  onClick= {(id) => {setSubscriptionPopup(true); setPopupId(tooldata.id)}}/>  */}
                        <ShoppingCartIcon />
                      </span>:null 
                    }
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
      
         )
        }
      
        {/*Perview tools code popup */}
        <CustomPopup
           open={selectedTool}
             onClose={() => setSelectedTool(null)}
            className="popup-container__iner--xxl border-radius tool-perview-data"
            >
          <ToolPerview tool={selectedTool}></ToolPerview>
          </CustomPopup>
        {/*End */}
        {/*Emneded code popup */}
          <CustomPopup 
          open={ispopup} onClose={() =>setPopup(false)} 
          headerText="Embed code"
          className="border-radius popup-container__iner--xl-md"
          >
          <Embedcode data={products} toolId={popupId} />
        </CustomPopup>
        {/*End*/}
        {/*Add to cart */}
        <CustomPopup
          open={isSubscription}
          onClose={() => setSubscriptionPopup(false)}
          headerText="Subscription Type"
          footerButton={true}
          className="border-radius popup-container__iner--sm"
        >
           <Subscription data={products} toolId={popupId} />
           <ToastContainer /> 
              <div className="popup-container__footer">
                  <CustomButton 
                    className="primary-button add--card" 
                    onClick={handleCart}
                  >
                      <ShoppingCartIcon/>  Add to Cart
                  </CustomButton>
              </div>
        </CustomPopup>
        {/*End */}
      
    </Toolbar>
   </>
  
  );
};
 
export default ToolCards;



