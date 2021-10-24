import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);
const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/register.vue")
  },
  {
    path: '/student',
    component: () => import("../views/student.vue"),
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/student/add',
    name: 'add',
    component: () => import("../components/student/CreateComponent"),
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/student/edit/:id',
    name: 'edit',
    component: () => import('../components/student/EditComponent'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('../views/group.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups/add',
    name: 'group-add',
    component: () => import("../components/group/CreateComponent"),
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/groups/edit/:id',
    name: 'group-edit',
    component: () => import('../components/group/EditComponent'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/emails',
    name: 'emails',
    component: () => import('../views/email.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/emails/add',
    name: 'email-add',
    component: () => import("../components/email/CreateComponent"),
     meta: {
      requiresAuth: true
    }
  },
  {
    path: '/emails/edit/:id',
    name: 'email-edit',
    component: () => import('../components/email/EditComponent'),
    meta: {
      requiresAuth: true
    }
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;