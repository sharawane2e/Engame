import { Redirect } from "react-router-dom";
import AppRouting from "./AppRouting";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  // const Component = props.component;
  const user = useSelector((state) => state.user.isLoggedIn);
  return user ? <AppRouting routes={props.routes} /> : <Redirect to="/" />;
};

export default PrivateRoute;
