import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./components/Home";
import TestPosition from "./components/TestPosition";
import EditPassword from "./components/setting/EditPassword";
import NodePosition from "./components/setting/NodePosition";
import AdminLog from "./components/log/AdminLog";
import SignInOutLog from "./components/log/SignInOutLog";
Vue.use(VueRouter)

const routes = [
    {
        path:"/home",
        component: Home
    },
    {
        path: "/testPosition",
        component: TestPosition
    },
    {
        path: "/setting/editPassword",
        component: EditPassword
    },
    {
        path: "/setting/nodePosition",
        component: NodePosition
    },
    {
        path: "/log/adminLog",
        component: AdminLog
    },
    {
        path: "/log/signInOutLog",
        component: SignInOutLog
    }
]

var router =  new VueRouter({
    routes
})
export default router;
