import React , {useState} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tools from '../../mock/ToolCards';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GetAppIcon from '@material-ui/icons/GetApp';
import ToolDemo from "../ToolDemo";
import CustomPopup from "../CustomPopup";


const ToolCards = (props) => {
    const [state]=useState(Tools);
    const [isToolOpen, setToolOpen] = useState(false);
    const {isToolData,setTooData}=props;
    return (
        <Toolbar className="toolcard">
        <Grid container spacing={3}>
        {state.map((tooldata,index) => {
        return (
           <>
            <Grid item xs={12} lg={2} sm={4} key={index}>
            <Paper className="paperstyel"  onClick={() =>setToolOpen(true)}  >
                <div className="toolcard__image"><img src={tooldata.imgUrl}/></div>
               <div className="toolcard__align">
                    <div className="toolcard__items toolcard__download">
                        {tooldata.showDownload==false?
                        <span className="toolcard__sub-icons">
                        <GetAppIcon/>
                    </span>:null
                    }
                </div>
                <div className="toolcard__items toolcard__shopping">
                    <span className="toolcard__sub-icons">
                    <ShoppingCartIcon/></span>
                </div>
               </div>
            </Paper>
            <div className="toolcard__align toolcard__toolname">
             <div className="toolcard__aligninr1">{tooldata.toolname}</div>
             <div className="toolcard__aligninr">{tooldata.price}</div>
            </div>
      
          </Grid>
         
           </>
          
        )
            })}
     </Grid>
      
     <CustomPopup open={isToolOpen} onClose={() =>setToolOpen(false)} poupxl={true}>
            <ToolDemo /> 
    </CustomPopup>

        </Toolbar>
    );
}

export default ToolCards;