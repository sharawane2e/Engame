import TextField from '@material-ui/core/TextField';

const SubscriptionType =()=>{
    return(
        <>
        <div className="subscription-type">
              <select>
                <option>1</option>
                <option></option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
                <option>1</option>
              </select>

              <div className="subscription-type__iner">
                <div className="subscription-type__days"> 
                  <TextField id="outlined-basic"  variant="outlined" 
                  className="subscription-type__inputbox"/>
                  <div className="subscription-type__text">DYAS</div>
                </div>
              <div className="subscription-type__amount  subscription-type__amount-text ">
                  $45
              </div>
            </div>

          </div>
       </>
    )
}

export default SubscriptionType;