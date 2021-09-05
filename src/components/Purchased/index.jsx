import React, {useRef, useState, useEffect } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { Breadcrumbs } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Footer from "../../components/Footer";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import e2eLogo from "../../assets/images/E2E-logo.png";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import TimerIcon from "@material-ui/icons/Timer";
import checkCircle from "../../assets/images/check-circle.svg";
import { BASE_URL } from "../../config/ApiUrl";
import { useSelector } from "react-redux";
import PauseIcon from "@material-ui/icons/Pause";
import GetAppIcon from "@material-ui/icons/GetApp";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles } from "@material-ui/core/styles";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Toaster from "../../util/Toaster";


const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#fff684",
  },
}))(LinearProgress);

function Purchased(props) {
  const [isActive, setActive] = useState(false);
  // const [copySuccess, setCopySuccess] = useState("");
  // const textAreaRef = useRef(null);
  // const textAreaRef1 = useRef(null);


  // useEffect(() => {
  //   setActive(isActive);
  // });

  // const truncateString = (string, limit) => {
  //   if (string.length > limit) {
  //     return string.substring(0, limit) + "*****"
  //   } else {
  //     return string
  //   }
  // };
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  const textAreaRef1 = useRef(null);

  function copyToClipboard(e) {
    e.target.focus();
    textAreaRef.current.select();
    document.execCommand('copy');
    setCopySuccess('Copied!');
    Toaster.sucess("You Copied successfully!","topcenter");
  };
  function copyToClipboard1(e) {
    textAreaRef1.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
    Toaster.sucess("You Copied successfully!","topcenter");
  };


  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const search = props.location.search;
    const params = new URLSearchParams(search);
    const session_id = params.get("session_id");
    console.log(session_id);
    async function paymentSuccess() {
      fetch(BASE_URL + "payments/success/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({ user: token.user.pk, session_id: session_id }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result));
    }
    paymentSuccess();
  }, []);
 
  return (
    <>
      <div className="purchased-tool bredcrum-conatiner">
        <Header />
        <div className="bredcrum-conatiner__bredcrum_inr sticky-position">
          <Container maxWidth="lg">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="bredcrum-conatiner__bredcrum-text"
            >
              <Link color="inherit" to="/">
                Home
              </Link>
              <Link color="inherit" to="/cart">
                Shopping Cart
              </Link>
              <Typography color="textPrimary">My Widgets</Typography>
            </Breadcrumbs>
          </Container>
        </div>
        <Container
          maxWidth="lg"
          className="purchased-tool__container  margin-top-174"
        >
          <Grid container spacing={3}>
            <Grid item xs={4} className="purchased-tool__hedding">
              <Typography component="div" className="hedding-text">
                My Widgets
              </Typography>
            </Grid>
            <Grid item xs={8} className="purchased-tool__hedding grid-flex">
              <Typography
                component="div"
                className="tab--button border-radius tab--active"
              >
                All
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Active Only
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Expiring Soon
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Expired
              </Typography>
              <Typography component="div" className="tab--button border-radius">
                Paused
              </Typography>
            </Grid>
          </Grid>
          {/*Card start */}
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius">
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    container
                    className="purchased-tool__tool-type-data"
                  >
                    <div className="purchased-tool__purchased-date">
                      <img src={checkCircle} />
                      <span className="purchased-tool__date-type-text purchased-curent-text">
                        Purchased Date:
                      </span>
                      <span className="purchased-tool__date-type-text">
                        10/01/2021
                      </span>
                      <span className="purchased-tool__date-type-time">
                        12:00PM
                      </span>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    container
                    className="purchased-tool__tool-image"
                  >
                    <ButtonBase>
                      <img alt="" src={e2eLogo} />
                    </ButtonBase>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm
                    container
                    className="purchased-tool__tool-data"
                  >
                    <Grid item xs={10}>
                      <Grid item>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-title"
                        >
                          Target Drag & Drop
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Subscription Key:
                          </span>
                          <span className="subscription-day margin-rightdata copy-to-clip">
                            {/* <span>{ truncateString("npC1kgKBYLApXevz9u3NtwABhqCAAAAAAGEx5I4A5LKTpBeLEqYHP_vZVS6I05pq_-O7A-IeKs3__p9Q4VVeAlvAlGIxdNulJxBpTA2fyCrzpuq0I-WaJIGz5XvnorJPD8VvI16Zp-cwrs4kK2NKh__UNMyMfWE5k7bgyulig3mJAqR7VFNdzLO_a2KBrPyz3VTUo9csG1j4C-RH1QHm5I-oRKKjrC8WTjJCvX_weK47BRRFqbqkjh_S9cVTEoNoR4Zxt4aTIYM6LU9iYQJPWW19RdEbiMUAH9kBasEg9qFcV2c6w3SJDp0KfqIm", 30)}</span> */}
                            <input type="text"
                            ref={textAreaRef}
                            className="textbox-hide" 
                            value= "npC1kgKBYLApXevz9u3NtwABhqCAAAAAAGEx5I4A5LKTpBeLEqYHP_vZVS6I05pq_-O7A-IeKs3__p9Q4VVeAlvAlGIxdNulJxBpTA2fyCrzpuq0I-WaJIGz5XvnorJPD8VvI16Zp-cwrs4kK2NKh__UNMyMfWE5k7bgyulig3mJAqR7VFNdzLO_a2KBrPyz3VTUo9csG1j4C-RH1QHm5I-oRKKjrC8WTjJCvX_weK47BRRFqbqkjh_S9cVTEoNoR4Zxt4aTIYM6LU9iYQJPWW19RdEbiMUAH9kBasEg9qFcV2c6w3SJDp0KfqIm"
                             />          
                                          
                            <FileCopyIcon  onClick={copyToClipboard}/>
                          </span>
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Trial Key:
                          </span>
                          <span className="subscription-day margin-rightdata copy-to-clip">
                          {/* { truncateString("EmJR_3YogCCgK3UW-B7KjwABhqCAAAAAAGEx5I4omHWvMaHcE3zlIBcA557ZvJsjyju39wf_tC5Lwshy36WmQ5quKhr279GXqmgSeehBsLaydwdYr7JlWU4moHRDrsO-MiVeDIt4L0R4EJVAMv_6toKrHEZa4D_SXWybYvQjUXnf8RRnsc53a6MsqndTbU58n_JghfAHXG-24vXuEWEJgF7MfpMWGdeUzXFwN_FXl36x6s587JjsXOB8fOwxiJhLqzwVQ2mkofHdzh2QLkIwrflFCRpI5bc2GN77qKTEc7na17Gr0REZPdvwtp9j", 30)} */}
                          <input type="text"
                          ref={textAreaRef1}
                            className="textbox-hide" 
                            id="text2"
                            value= "EmJR_3YogCCgK3UW-B7KjwABhqCAAAAAAGEx5I4omHWvMaHcE3zlIBcA557ZvJsjyju39wf_tC5Lwshy36WmQ5quKhr279GXqmgSeehBsLaydwdYr7JlWU4moHRDrsO-MiVeDIt4L0R4EJVAMv_6toKrHEZa4D_SXWybYvQjUXnf8RRnsc53a6MsqndTbU58n_JghfAHXG-24vXuEWEJgF7MfpMWGdeUzXFwN_FXl36x6s587JjsXOB8fOwxiJhLqzwVQ2mkofHdzh2QLkIwrflFCRpI5bc2GN77qKTEc7na17Gr0REZPdvwtp9j"
                             />                     
                            <FileCopyIcon onClick={copyToClipboard1} />
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} className="grid-flex">
                      <Typography
                        component="div"
                        className="purchased-tool__embeded-icon border-radius icon-margin"
                      >
                        <PauseIcon />
                      </Typography>
                      <Typography
                        component="div"
                        className="purchased-tool__embeded-icon border-radius"
                      >
                        <SystemUpdateAltIcon />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      className="purchased-tool__tool-margin"
                    >
                      <Grid item xs={4}>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text expiry-type">
                            Expiry Date:
                          </span>
                          <span className="subscription-day expiry-type margin-rightdata">
                            21/06/2021
                            <span class="purchased-tool__date-type-time curent-time">
                              12:00PM
                            </span>
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            210 days left
                          </span>
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                            className="progress-yellow"
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={6} className="grid-flex">
                        <div
                          className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle"
                          onClick={()=>setActive(!isActive)}
                        >
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            {isActive ? "Show Less" : "Show More"}
                          </span>
                          <span className="purchased-tool__date-type-text">
                            {isActive ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    container
                    className={
                    
                      isActive
                        ? "purchased-tool__tool-data accordion-margin show--accordion"
                        : "purchased-tool__tool-data accordion-margin hide--accordion"
                    }
                   
                  >
                    <Grid item xs={6}>
                      <Typography component="div">
                        <div className="purchased-tool__purchased-date">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            Total Amount:$512
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="cursor--pointer">
                        <div className="purchased-tool__purchased-date purchased-tool__hover">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            <GetAppIcon />
                          </span>
                          <span className="purchased-tool__date-type-text purchased-types">
                            Net banking
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="div">
                        <div className="purchased-tool__purchased-date">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            Payment Method: Net banking
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="cursor--pointer">
                        <div className="purchased-tool__purchased-date purchased-tool__hover">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            <GetAppIcon />
                          </span>
                          <span className="purchased-tool__date-type-text purchased-types">
                            Consumption statement
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {/*Card end */}
          {/*Card start */}
          <Grid container spacing={3} >
            <Grid item xs={12}>
              <Paper className="purchased-tool__tool-card card-box-shadow border--colordata border-radius">
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    container
                    className="purchased-tool__tool-type-data"
                  >
                    <div className="purchased-tool__purchased-date timer-svg">
                    <TimerIcon />
                      <span className="purchased-tool__date-type-text purchased-curent-text">
                        Purchased Date:
                      </span>
                      <span className="purchased-tool__date-type-text">
                        10/01/2021
                      </span>
                      <span className="purchased-tool__date-type-time">
                        12:00PM
                      </span>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={2}
                    container
                    className="purchased-tool__tool-image"
                  >
                    <ButtonBase>
                      <img alt="" src={e2eLogo} />
                    </ButtonBase>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    sm
                    container
                    className="purchased-tool__tool-data"
                  >
                    <Grid item xs={10}>
                      <Grid item>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-title"
                        >
                          Target Drag & Drop
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Subscription Key:
                          </span>
                          <span className="subscription-day margin-rightdata copy-to-clip">
                            {/* <span>{ truncateString("npC1kgKBYLApXevz9u3NtwABhqCAAAAAAGEx5I4A5LKTpBeLEqYHP_vZVS6I05pq_-O7A-IeKs3__p9Q4VVeAlvAlGIxdNulJxBpTA2fyCrzpuq0I-WaJIGz5XvnorJPD8VvI16Zp-cwrs4kK2NKh__UNMyMfWE5k7bgyulig3mJAqR7VFNdzLO_a2KBrPyz3VTUo9csG1j4C-RH1QHm5I-oRKKjrC8WTjJCvX_weK47BRRFqbqkjh_S9cVTEoNoR4Zxt4aTIYM6LU9iYQJPWW19RdEbiMUAH9kBasEg9qFcV2c6w3SJDp0KfqIm", 30)}</span> */}
                            <input type="text"
                            ref={textAreaRef}
                            className="textbox-hide" 
                            value= "npC1kgKBYLApXevz9u3NtwABhqCAAAAAAGEx5I4A5LKTpBeLEqYHP_vZVS6I05pq_-O7A-IeKs3__p9Q4VVeAlvAlGIxdNulJxBpTA2fyCrzpuq0I-WaJIGz5XvnorJPD8VvI16Zp-cwrs4kK2NKh__UNMyMfWE5k7bgyulig3mJAqR7VFNdzLO_a2KBrPyz3VTUo9csG1j4C-RH1QHm5I-oRKKjrC8WTjJCvX_weK47BRRFqbqkjh_S9cVTEoNoR4Zxt4aTIYM6LU9iYQJPWW19RdEbiMUAH9kBasEg9qFcV2c6w3SJDp0KfqIm"
                             />          
                                          
                            <FileCopyIcon  onClick={copyToClipboard}/>
                          </span>
                        </Typography>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            Trial Key:
                          </span>
                          <span className="subscription-day margin-rightdata copy-to-clip">
                          {/* { truncateString("EmJR_3YogCCgK3UW-B7KjwABhqCAAAAAAGEx5I4omHWvMaHcE3zlIBcA557ZvJsjyju39wf_tC5Lwshy36WmQ5quKhr279GXqmgSeehBsLaydwdYr7JlWU4moHRDrsO-MiVeDIt4L0R4EJVAMv_6toKrHEZa4D_SXWybYvQjUXnf8RRnsc53a6MsqndTbU58n_JghfAHXG-24vXuEWEJgF7MfpMWGdeUzXFwN_FXl36x6s587JjsXOB8fOwxiJhLqzwVQ2mkofHdzh2QLkIwrflFCRpI5bc2GN77qKTEc7na17Gr0REZPdvwtp9j", 30)} */}
                          <input type="text"
                          ref={textAreaRef1}
                            className="textbox-hide" 
                            id="text2"
                            value= "EmJR_3YogCCgK3UW-B7KjwABhqCAAAAAAGEx5I4omHWvMaHcE3zlIBcA557ZvJsjyju39wf_tC5Lwshy36WmQ5quKhr279GXqmgSeehBsLaydwdYr7JlWU4moHRDrsO-MiVeDIt4L0R4EJVAMv_6toKrHEZa4D_SXWybYvQjUXnf8RRnsc53a6MsqndTbU58n_JghfAHXG-24vXuEWEJgF7MfpMWGdeUzXFwN_FXl36x6s587JjsXOB8fOwxiJhLqzwVQ2mkofHdzh2QLkIwrflFCRpI5bc2GN77qKTEc7na17Gr0REZPdvwtp9j"
                             />                     
                            <FileCopyIcon onClick={copyToClipboard1} />
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2} className="grid-flex">
                      <Typography
                        component="div"
                        className="purchased-tool__embeded-icon border-radius icon-margin"
                      >
                        <PauseIcon />
                      </Typography>
                      <Typography
                        component="div"
                        className="purchased-tool__embeded-icon border-radius"
                      >
                        <SystemUpdateAltIcon />
                      </Typography>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      className="purchased-tool__tool-margin"
                    >
                      <Grid item xs={4}>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text expiry-type">
                            Expiry Date:
                          </span>
                          <span className="subscription-day expiry-type margin-rightdata">
                            21/06/2021
                            <span class="purchased-tool__date-type-time curent-time">
                              12:00PM
                            </span>
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography
                          component="div"
                          className="purchased-tool__tool-type"
                        >
                          <span className="subscription-type-text">
                            210 days left
                          </span>
                          <BorderLinearProgress
                            variant="determinate"
                            value={50}
                            className="progress-yellow"
                          />
                        </Typography>
                      </Grid>
                      <Grid item xs={6} className="grid-flex">
                        <div
                          className="purchased-tool__purchased-date purchased-tool__toggleclass show--toogle"
                          onClick={()=>setActive(!isActive)}
                        >
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            {isActive ? "Show Less" : "Show More"}
                          </span>
                          <span className="purchased-tool__date-type-text">
                            {isActive ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    container
                    className={
                      isActive
                        ? "purchased-tool__tool-data accordion-margin show--"
                        : "purchased-tool__tool-data accordion-margin hide--"
                    }
                   
                  >
                    <Grid item xs={6}>
                      <Typography component="div">
                        <div className="purchased-tool__purchased-date">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            Total Amount:$512
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="cursor--pointer">
                        <div className="purchased-tool__purchased-date purchased-tool__hover">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            <GetAppIcon />
                          </span>
                          <span className="purchased-tool__date-type-text purchased-types">
                            Net banking
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography component="div">
                        <div className="purchased-tool__purchased-date">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            Payment Method: Net banking
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} className="purchased-tool__expiry-date">
                      <Typography component="div" className="cursor--pointer">
                        <div className="purchased-tool__purchased-date purchased-tool__hover">
                          <span className="purchased-tool__date-type-text purchased-curent-text">
                            <GetAppIcon />
                          </span>
                          <span className="purchased-tool__date-type-text purchased-types">
                            Consumption statement
                          </span>
                        </div>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          {/*Card end */}

        </Container>
        <Footer />
      </div>
    </>
  );
}

export default Purchased;
