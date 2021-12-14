import AppRouting from "../../AppRouting";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginUser } from "../../redux/user/user-action";

const PrivateScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginUser());
  }, []);

  return <AppRouting routes={props.route} />;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(PrivateScreen);
