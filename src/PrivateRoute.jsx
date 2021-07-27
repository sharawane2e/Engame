import {Redirect} from "react-router-dom";
import LocalStorageUtils from "./util/LocalStorageUtils";
import AppRouting from "./AppRouting";
import { connect, useSelector } from "react-redux";

const PrivateRoute = (props) =>{
    const Component = props.component;
    const user  = useSelector((state) => state.user.isLoggedIn)
    return user ?(
        <AppRouting routes={props.routes}/>
    ):(
        <Redirect to="/" />
    )
}
const mapStateToProps = state => {
    return {
        user : state.user.isLoggedIn
    }
}
export default connect(mapStateToProps)(PrivateRoute);