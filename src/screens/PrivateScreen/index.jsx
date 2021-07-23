// import LocalStorageUtils from "../../util/LocalStorageUtils";
// import Idle from "react-idle";
import AppRouting from "../../AppRouting";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../redux/user/user-action";

const PrivateScreen = (props, user) =>{
    const dispatch = useDispatch()
    useEffect(() => {
        const data = dispatch(loginUser())
    }, [])
    console.log(user);
    return(
        <AppRouting routes={props.route} />
    )
}

const mapStateToProps = state => {
    return {
        user : state.user.isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateScreen);