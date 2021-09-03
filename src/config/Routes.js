import PrivateScreen from "../screens/PrivateScreen";
import PublicScreen from "../screens/PublicScreen";
import PageNotFoundScreen from "../screens/PageNotFoundScreen";
import Home from "../components/Home";
import Purchased from "../components/Purchased";
import Cart from "../components/cart/Cart";
import Forgot from "../components/ForgotPassword/Forgot";

const Routes = [
  {
    path: "/pagenotfound",
    component: PageNotFoundScreen,
    exact: true,
  },
  {
    path: ["/", "/forgot"],
    component: PublicScreen,
    exact: true,
    routes: [
      {
        path: "/forgot",
        component: Forgot,
        exact: true,
      },
      {
        path: "/",
        component: Home,
        isExact: true,
      },
    ],
  },
  {
    path: ["/cart", "/purchased"],
    component: PrivateScreen,
    exact: true,
    isPrivate: true,
    routes: [
      {
        path: "/cart",
        component: Cart,
        exact: true,
      },
      {
        path: "/purchased",
        component: Purchased,
        isExact: true,
      },
    ],
  },
  {
    path: "*",
    component: PageNotFoundScreen,
  },
];

export default Routes;
