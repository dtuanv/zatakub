const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      // { path: '/test',name:'test', component: () => import('src/components/product/ProductBox.vue') },

      {
        path: "/customer",
        name: "customer",
        component: () => import("src/pages/customer/Customer.vue"),
      },


      {
        path: "/aboutMe",
        name: "aboutMe",
        component: () => import("src/pages/infos/AboutMe.vue"),
      },
      {
        path: "/product/:category",
        name: "productCategory",
        component: () => import("src/pages/product/Product.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("src/pages/product/Product.vue"),
      },
      //  { path : '/product/:id', name :'product', props:true, component:() => import('src/pages/product/Product.vue')},

      {
        path: "contact",
        name: "contact",
        component: () => import("src/pages/customer/Contact.vue"),
      },
      //  Admin

      {
        path: "/admin",
        name: "admin",
        component: () => import("src/pages/admin/Admin.vue"),
        meta: { isRequireAuth: true },

      },

      {
        path: "/admin/message",
        name: "adminMessage",
        component: () => import("src/pages/admin/Message.vue"),
        meta: { isRequireAuth: true },
      },
      {
        path: "/admin/bill",
        name: "adminBill",
        component: () => import("src/pages/admin/Bill.vue"),
      },

      {
        path: "/admin/category/add",
        name: "addCategory",
        component: () => import("src/pages/product/AddCategory.vue"),
      },
      {
        path: "/admin/product/add",
        name: "addProduct",
        component: () => import("src/pages/product/AddProduct.vue"),
      },
      {
        path: "/admin/product/add/:id",
        name: "addProduct",
        component: () => import("src/pages/product/AddProduct.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/admin/product",
        name: "adminProduct",
        component: () => import("src/pages/admin/ProductAdmin.vue"),
        meta: { isRequireAuth: true },

      },

      {
        path: "/admin/product/edit/:id",
        name: "editProductById",
        component: () => import("src/pages/product/AddProduct.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/admin/category/edit",
        name: "editCategory",
        component: () => import("src/pages/product/EditCategory.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/admin/product/editResource",
        name: "editProductResource",
        component: () => import("src/pages/product/ProductSrc.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/admin/reservation",
        name: "adminResieveren",
        component: () => import("src/pages/admin/ReservierungManager.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/admin/notice",
        name: "adminNotice",
        component: () => import("src/pages/admin/NoticeAdmin.vue"),
        meta: { isRequireAuth: true },

      },
      {
        path: "/onlyAdmin/createNewUser",
        name: "createNewUser",
        component: () => import("src/pages/admin/login/CreateUser.vue"),
        meta: { isRequireAuth: true },

      },

      //  Admin end
      //  {path : '/loginIn', name : 'loginIn', component:() => import('src/pages/admin/LoginINte.vue')},
      {
        path: "/login",
        name: "login",
        component: () => import("src/pages/admin/login/Login.vue"),
        meta: { isRequireAuth: true },

      },

      {
        path: "/loginPage",
        name: "loginPage",
        component: () => import("src/pages/admin/login/LoginPage.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("src/pages/admin/login/RegisterPage.vue"),
      },

      {
        path: "/protected",
        name: "protectedPage",
        component: () => import("src/pages/admin/ProtectedHomePage.vue"),
        meta: { isRequireAuth: true },
      },

      {
        path: "/contact",
        name: "contact",
        component: () => import("src/pages/customer/Contact.vue"),
      },

      // Customer
      {
        path: "/shopping",
        name: "shopping",
        component: () => import("src/pages/shopping/Cart.vue"),
      },
      {
        path: "/thank",
        name: "thank",
        component: () => import("src/pages/Thank.vue"),
      },
      {
        path: "/reservation",
        name: "resevation",
        component: () => import("src/pages/customer/Reservation.vue"),
      },

      {
        path: "/deliveryStatus",
        name: "deliveryStatus",
        component: () => import("src/pages/customer/DeliveryStatus.vue"),
      },

      // Information
      {
        path: "/datenschutzErklaerung",
        name: "datenschutzErklaerung",
        component: () => import("src/pages/infos/Datenschutz.vue"),
      },

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

// routes.beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   // const loggedIn = localStorage.getItem('user');

//   // if (authRequired && !loggedIn) {
//   //   return next('/login');
//   // }

//   if (authRequired) {
//     return next('/login');
//   }

//   next();
// })

export default routes;
