import clsx from 'clsx';

const Overlay = (props)=>{
    const {position,width,dataindex} = props;
    return(
        <div className={clsx('popup-overlay',position?position:'small')}></div>
    )
}

export default Overlay