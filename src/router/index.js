import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {list,list1,tranTree,routerTrans} from '../utils/index';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'notFound',
    component: ()=> import('../views/notFound.vue')
  },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes
})
let store = [];
router.beforeEach((to,from,next)=>{
  if(store.length == 0){
    let res = sessionStorage.getItem("list");
    let data = tranTree(res?JSON.parse(res):list);
    sessionStorage.setItem('tranTree',JSON.stringify(data))
    const newRoutes = routerTrans(data);
    console.log("newRoutes",newRoutes);
    store = newRoutes;
    newRoutes.map(item=>
      router.addRoute(item)
    )
    next({path:to.path});
  }else{
    next();
  }
})
export default router
