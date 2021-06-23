import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tools from '../../mock/ToolCards';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }));

  const ToolCards = (props) => {
    const classes = useStyles();
    const [state]=useState(Tools);
    return (
        <Toolbar className="toolcard">
        <Grid container spacing={3}>
        {state.map((tooldata,index) => {
        return (
            <Grid item xs={12} sm={2} key={index}>
            <Paper className={classes.paper}  >
                <div className="toolcard__image"><img src={tooldata.imgUrl}/></div>
               <div className="toolcard__align">
                    <div className="toolcard__items toolcard__download">
                        <span className="toolcard__sub-icons"><GetAppIcon/></span>
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
          
        )
            })}
     </Grid>
        </Toolbar>
    );
}

export default ToolCards;