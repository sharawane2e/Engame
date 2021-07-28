import { Container } from '@material-ui/core'
import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

const Forgot = () => {
    return (
       <>
        <Header/>
         <div className="forgot">
                <form action="">
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="Password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordc">Confirm Password</label>
                        <input type="Password" className="form-control" />
                    </div>
                    <div className="form-group">
                        <button type="button">Submit</button>
                    </div>
                </form>
        </div>
        <Footer />
       </>
    )
}

export default Forgot
