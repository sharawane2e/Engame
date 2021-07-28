import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../Footer'
import Header from '../Header'
import CustomButton from "../../components/widgets/Button"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const Forgot = () => {
    return (
       <>
        <Header/>
        <div className="forgot">
                <form action="">
                    <div className="form-group">
                        <InputLabel htmlFor="standard-adornment-email" className="input-label">Password</InputLabel> 
                        <FormControl className="form-area__control">
                            <TextField
                            id="outlined-email-input"   
                            placeholder="E-mail address"
                            // value={this.state.email}
                           type="email"  variant="outlined"
                            // onChange={(e) => this.handleChange(e, "email")}
                            // onBlur={(e) => this.handleBlur(e, "email")}
                            // message={this.state.formErrors.email}
                        />
                        <div className="validated-error"></div> 
                        </FormControl>
                
                       <InputLabel htmlFor="standard-adornment-email" className="input-label">Confirm Password</InputLabel> 
                        <FormControl className="form-area__control">
                            <TextField
                            id="outlined-email-input"   
                            placeholder="E-mail address"
                            // value={this.state.email}
                           type="email"  variant="outlined"
                            // onChange={(e) => this.handleChange(e, "email")}
                            // onBlur={(e) => this.handleBlur(e, "email")}
                            // message={this.state.formErrors.email}
                        />
                        <div className="validated-error"></div> 
                        </FormControl>

                    </div>
                    <div className="form-group">
                        <CustomButton  
                            className='forgot__button primary-button'>
                               Submit
                        </CustomButton>
    
                    </div>
                </form>
        </div>


    
        <Footer />
       </>
    )
}

export default Forgot
