import React from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'
import SlowMotionVideoIcon from '@material-ui/icons/SlowMotionVideo';
import { connect } from 'react-redux';
import empty from '../../assets/images/empty.gif'
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Cart = ({cart}) => {
    return (
        <div className="cart">
            <Header />
            <div className="bread_crum">
                <div className="container">
                    <div className="crums">
                        <p>
                            <Link to="/">Home</Link> <span> / Shopping Cart</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="shopping_cart">
                {cart.length !== 0 ? <div className="container">
                    <div className="header">
                        <h3>Shopping Cart</h3>
                        <Link to="/"> <SlowMotionVideoIcon /> Continue Shopping </Link>
                    </div>

                    <div className="row">
                        <div className="col-lg-9 col-md-8 col-sm-6">
                           {cart.map(item => (
                            <div className="strip">
                                <div className="row">
                                    <div className="col-lg-2 col-md-3">
                                        <img src={item.imgUrl} alt="" className="img-fluid" />
                                    </div>
                                    <div className="col-lg-8 col-md-7">
                                        <div className="content_strip">
                                            <h3>{item.name}</h3>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deserunt culpa sunt ad porro delectus.</p>
                                            <div className="subscription">
                                                <div className="subscribe">
                                                    <label htmlFor="subscription">Subscription : </label>
                                                    <select name="" id="">
                                                        <option value="">Number of Days</option>
                                                    </select>
                                                </div>
                                                <div className="validity">
                                                    <label htmlFor="validity">Validity</label>
                                                    <input type="text" value="60" />
                                                    <span>Days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2 col-md-3">
                                        <div className="last_button">
                                            <p>{item.currency}{item.price}</p>
                                            <div className="btns">
                                                <DeleteIcon />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> ))
                            }
                        
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="total">
                                <h3>Need to Pay</h3>
                                <div className="price">
                                    <span>${cart.map(item => item.price).reduce((accumulator, currentValue) => accumulator+currentValue)}</span>
                                </div>
                                <div className="promotion">
                                    <span>Promotion code</span>
                                    <div className="apply">
                                        <input type="text" />
                                        <button>Apply</button>
                                    </div>
                                    <button className="chekout">
                                        <CheckCircleIcon /> Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="empty_cart">
                    <img src={empty} alt="" />
                </div>
                }
            </div>
        </div>
    )
}

const mapDispatchToProp = state => {
    return {
         cart:state.shop.cart
    }
}

export default connect(mapDispatchToProp)(Cart)
