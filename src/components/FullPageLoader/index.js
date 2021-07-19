import React,{useState} from 'react'
import { connect } from 'react-redux'
import loaderImg from '../../assets/images/loader.gif'

const FullPageLoader = ({loading}) => {
    if(!loading){
        return null
    }
    return (
        <div className="loader_main">
            <div className="loader">
                <img src={ loaderImg } alt="" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      loading: state.loader.loading
    };
  };

export default connect(mapStateToProps, null)(FullPageLoader)
