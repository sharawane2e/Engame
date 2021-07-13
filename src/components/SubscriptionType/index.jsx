import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

const SubscriptionType =({toolId, products})=>{
  
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
                  {/* {products.map(item => (
                    item.id == toolId ? item.price : null
                  ))} */}
              </div>
            </div>

          </div>
       </>
    )
}

const mapStateToProps = (state) => {
  return {
    products : state.shop.products
  }
}

export default connect(mapStateToProps)(SubscriptionType);