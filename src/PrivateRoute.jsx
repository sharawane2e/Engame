import {Redirect} from "react-router-dom";
import LocalStorageUtils from "./util/LocalStorageUtils";
import AppRouting from "./AppRouting";

const PrivateRoute = (props) =>{
    console.log(props);
    const Component = props.component;
    console.log(Component)
    console.log(LocalStorageUtils.isUserloggedIn())

    return LocalStorageUtils.isUserloggedIn() ?(
        <AppRouting routes={props.routes}/>
    ):(
        <Redirect to="/" />
    )
}

export default PrivateRoute;