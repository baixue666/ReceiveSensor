import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "./components/Login";
import Home from "./components/Home";
import TestPosition from "./components/TestPosition";
import EditPassword from "./components/setting/EditPassword";
import NodePosition from "./components/setting/NodePosition";
import AdminLog from "./components/log/AdminLog";
import SignInOutLog from "./components/log/SignInOutLog";
Vue.use(VueRouter)

const routes = [{
        path: "/login",
        component: Login,
        name: ['login']
    },
    {
        path: "/home",
        component: Home,
        name: ["首页"],
    },
    {
        path: "/testPosition",
        component: TestPosition,
        name: ["中国铁道科学研究院铁道建筑研究所"],
    },
    {
        path: "/setting/editPassword",
        component: EditPassword,
        name: ["设置", "修改密码"],
    },
    {
        path: "/setting/nodePosition",
        component: NodePosition,
        name: ["设置", "节点位置"],
    },
    {
        path: "/log/adminLog",
        component: AdminLog,
        name: ["日志管理", "管理员日志"],
    },
    {
        path: "/log/signInOutLog",
        component: SignInOutLog,
        name: ["日志管理", "登陆登出日志"],
    }
]

var router = new VueRouter({
    routes
})
export default router;