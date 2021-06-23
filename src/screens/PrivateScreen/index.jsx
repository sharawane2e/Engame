import LocalStorageUtils from "../../util/LocalStorageUtils";
import Idle from "react-idle";
import AppRouting from "../../AppRouting";

const PrivateScreen = (props) =>{
    return(
        <AppRouting routes={props.route} />
    )
}

export default PrivateScreen;