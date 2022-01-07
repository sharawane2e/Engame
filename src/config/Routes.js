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
import ContactUS from "../screens/StaticPage/contact-us";
import Termscondition from "../screens/StaticPage/Terms-condition";
import Refundpolicy from "../screens/StaticPage/Refund-policy";
import Privacypolicy from "../screens/StaticPage/Privacy-policy";
import PrivacyPolicy from "../screens/StaticPage/Privacy-policy";
import TermsCondition from "../screens/StaticPage/Terms-condition";

const Routes = [
  {
    path: "/pagenotfound",
    component: PageNotFoundScreen,
    exact: true,
  },
  {
    path: [
      "/refund-policy",
      "/terms-condition",
      "/privacy-policy",
      "/contact-us",
      "/error",
      "/faq",
      "/user-email-verification",
      "/forgot",
    ],
    component: PublicScreen,
    //exact: true,
    routes: [
      {
        path: "/forgot",
        component: Forgot,
        exact: false,
      },
      {
        path: "/user-email-verification",
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
      {
        path: "/contact-us",
        component: ContactUS,
        isExact: true,
      },
      {
        path: "/privacy-policy",
        component: PrivacyPolicy,
        isExact: true,
      },
      {
        path: "/terms-condition",
        component: TermsCondition,
        isExact: true,
      },
      {
        path: "/refund-policy",
        component: Refundpolicy,
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
