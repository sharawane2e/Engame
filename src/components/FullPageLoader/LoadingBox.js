import React from 'react'
import loaderImg from '../../assets/images/loader.gif'

const LoadingBox = () => {
    return (
        <div className="loader_main">
            <div className="loader">
                <img src={ loaderImg } alt="" />
            </div>
        </div>
    )
}

export default LoadingBox
