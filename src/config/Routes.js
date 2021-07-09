import PrivateScreen from "../screens/PrivateScreen";
import PublicScreen from "../screens/PublicScreen";
import PageNotFoundScreen from "../screens/PageNotFoundScreen";
import Home from "../components/Home";
import Purchased from "../components/Purchased";
import Cart from '../components/cart/Cart';

const Routes = [
    {
        path:"/pagenotfound",
        component:PageNotFoundScreen,
        exact:true
    },
    {
        path:["/", "/cart"],
        component:PublicScreen,
        exact:true,
        routes:[
            {
                path:"/cart",
                component:Cart,
                exact:true,
            },
            {
                path:"/",
                component:Home,
                isExact:true
            }
        ]
    },
    {
        path:["/purchased-tool"],
        component:PrivateScreen,
        exact:true,
        isPrivate:true,
        routes:[
            {
                path:"/purchased-tool",
                component:Purchased,
                isExact:true
            }
        ]
    }
]

export default Routes