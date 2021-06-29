import clsx from 'clsx';

const Overlay = (props)=>{
    const {position} = props;
    return(
        <div className={clsx('popup-overlay',position?position:'small')}></div>
    )
}

export default Overlay