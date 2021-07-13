import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import empty from '../../assets/images/empty.gif'
import { Breadcrumbs } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CustomButton from "../../components/widgets/Button";
import Footer from "../../components/Footer";
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import e2eLogo from "../../assets/images/E2E-logo.png";
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';

function Purchased(props) {
    return (
        <div className="purchased-tool bredcrum-conatiner">
            <Header />
            <div className="bredcrum-conatiner__bredcrum_inr">
                <Container maxWidth="lg">
                    <Breadcrumbs aria-label="breadcrumb" className="bredcrum-conatiner__bredcrum-text">
                        <Link color="inherit" to="/" >
                            Home
                        </Link>
                        <Typography color="textPrimary">Purchased tool</Typography>
                    </Breadcrumbs>
                </Container>
            </div>
            <Container maxWidth="lg" className="purchased-tool__container">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                         Shopping Cart
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={12} className="border-radius">
                        <Paper className="purchased-tool__tool-card">
                            <Grid container spacing={3}>
                                <Grid item xs={2}  container className="purchased-tool__tool-image">
                                    <ButtonBase  >
                                        <img alt="" src={e2eLogo}/> 
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={10} sm container>
                                    <Grid item xs={3} direction="column" spacing={2}>
                                        <Grid item>
                                                <Typography gutterBottom variant="subtitle1" component="div" className="purchased-tool__tool-title">
                                                    Target Drag & Drop
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1" component="div" className="purchased-tool__tool-type">
                                                    Subscription type: Days
                                                </Typography>
                                                <Typography gutterBottom variant="subtitle1" component="div" className="purchased-tool__tool-code">
                                                    Access code: 251AB
                                                </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={2} direction="column" spacing={2}>
                                        <Grid item className="purchased-tool__tool-nodays">
                                            <Typography gutterBottom variant="subtitle1" component="div" className="purchased-tool__tool-left-day">
                                                10 days left
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                   <Grid item sm xs={5}>
                                        <Typography variant="subtitle1" component="div" className="purchased-tool__tool-validity">
                                            Extend validity
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1" component="div" className="purchased-tool__embeded-icon">
                                            <SystemUpdateAltIcon/>
                                        </Typography>
                                    </Grid>
                           </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Purchased;