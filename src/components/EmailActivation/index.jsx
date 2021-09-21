import React, {useState, useEffect} from "react";
import CustomPopup from "../CustomPopup";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from "@material-ui/core/Grid";
import CustomButton from "../../components/widgets/Button";
import { Link, useHistory } from "react-router-dom";
import success_icon from "../../assets/images/success_icon.svg";
import { wait } from "@testing-library/dom";



const EmailActivation = (EmailActive) =>{
  const history = useHistory();

  useEffect(() => {
    history.push("/");
  });
  return(
    <>
    <h6>Do not refresh...</h6>
    </>
  );
}

export default EmailActivation;