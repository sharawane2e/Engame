import React, {useState, useEffect} from 'react'
import Footer from '../Footer'
import Header from '../Header'
import CustomButton from "../../components/widgets/Button"
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const Forgot = () => {
    const [passwords, setPasswords] = useState({})
    useEffect(() => {
        
    }, [])

    // handleSubmit
    const handleSubmit = () => {
        console.log(passwords);
    }
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
                            placeholder="Password"
                           type="password"  variant="outlined"
                           onChange={(e) => setPasswords({...passwords, new_password1:e.target.value})}
                        />
                        <div className="validated-error"></div> 
                        </FormControl>
                
                       <InputLabel htmlFor="standard-adornment-email" className="input-label">Confirm Password</InputLabel> 
                        <FormControl className="form-area__control">
                            <TextField
                            id="outlined-email-input"   
                            placeholder="Confrim Password"
                           type="password"  variant="outlined"
                           onChange={(e) => setPasswords({...passwords, new_password2:e.target.value})}
                        />
                        <div className="validated-error"></div> 
                        </FormControl>

                    </div>
                    <div className="form-group">
                        <CustomButton  
                            className='forgot__button primary-button' onClick={handleSubmit} >
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
