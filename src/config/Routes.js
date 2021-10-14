import PrivateScreen from "../screens/PrivateScreen";
import PublicScreen from "../screens/PublicScreen";
import PageNotFoundScreen from "../screens/PageNotFoundScreen";
import Home from "../components/Home";
import Purchased from "../components/Purchased";
import Cart from "../components/cart/Cart";
import Forgot from "../components/ForgotPassword/ResetPassword";
import EmailActivation from "../components/EmailActivation";
import Faqs from "../components/FAQ/index";
import SomthingWentWrong from "../components/Error/somthingWentWrong";

const Routes = [
  {
    path: "/pagenotfound",
    component: PageNotFoundScreen,
    exact: true,
  },
  {
    path: ["/error", "/faq", "/user/account-confirm-email", "/forgot"],
    component: PublicScreen,
    //exact: true,
    routes: [
      {
        path: "/forgot",
        component: Forgot,
        exact: false,
      },
      {
        path: "/user/account-confirm-email",
        component: EmailActivation,
        isExact: false,
      },
      {
        path: "/faq",
        component: Faqs,
        isExact: true,
      },
      {
        path: "/error",
        component: SomthingWentWrong,
        isExact: true,
      },
    ],
  },
  {
    path: ["/"],
    component: PublicScreen,
    exact: true,
    routes: [
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
