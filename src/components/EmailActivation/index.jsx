import React, {useState, useEffect} from "react";
import CustomPopup from "../CustomPopup";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../components/widgets/Button";
import { Link, useHistory } from "react-router-dom";
import success_icon from "../../assets/images/success_icon.svg";






const EmailActivation = (EmailActive) =>{
  const history = useHistory();

  useEffect(() => {
    
    let timeout;
    timeout = setTimeout(() => history.push("/"), 3000);
  });

    
  return(
    <Grid container spacing={4} align="center">
        <Grid item xs={12}>
            <div className="emailActivation">
                <img src={success_icon} alt="Registration Sucessfully" />
                <p className="sucess_message">Registration has been sucessfully</p>
            </div>
        </Grid>
    </Grid>
  );
}

export default EmailActivation;