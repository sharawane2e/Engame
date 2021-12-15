import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

const AppRouting = (props) => {
  const { routes } = props;
  return (
    <Switch>
      {routes.map(function (route, index) {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={(props) => {
              return route.isPrivate ? (
                <PrivateRoute
                  component={route.component}
                  {...props}
                  routes={route.routes}
                />
              ) : (
                <route.component {...props} routes={route.routes} />
              );
            }}
          />
        );
      })}
    </Switch>
  );
};

export default AppRouting;
