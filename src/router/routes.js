const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [

    { path: "",name:'home', component: () => import("pages/IndexPage.vue") },
      // { path: '/test',name:'test', component: () => import('src/components/product/ProductBox.vue') },

      {
        path: "/customer",
        name: "customer",
        component: () => import("src/pages/customer/Customer.vue"),
      },

      {
        path: "/billHistory",
        name: "billHistory",
        component: () => import("src/pages/customer/BillHistory.vue"),
      },



      {
        path: "/cusOrderManager",
        name: "customerOrderManager",
        component: () => import("src/pages/customer/CusOrderManager.vue"),
      },
      {
        path: "/cusOrderManager/myAddress",
        name: "customerOrderManagerMyAddress",
        component: () => import("src/pages/customer/EditCustomer.vue"),
      },

      {
        path: "/aboutMe",
        name: "aboutMe",
        component: () => import("src/pages/infos/AboutMe.vue"),
      },
      // product begin
      // {
      //   path: "/product/:category",
      //   name: "productcategory",
      //   component: () => import("src/pages/product/Product.vue"),
      // },

      {
        path: "/product/category/:category",
        name: "productCategory",
        component: () => import("src/pages/product/Product.vue"),
      },


      {
        path: "/productDetail/:productId",
        name: "productHomeDetail",
        component: () => import("src/pages/product/ProductDetail.vue"),
      },

      {
        path: "/product/category/:category/:productId",
        name: "productDetail",
        component: () => import("src/pages/product/ProductDetail.vue"),
      },


      {
        path: "/product/category/:category/mark/:mark/:productId",
        name: "productMarkDetail",
        component: () => import("src/pages/product/ProductDetail.vue"),
      },

      {
        path: "/product/sale/:productId",
        name: "productSaleDetail",
        component: () => import("src/pages/product/ProductDetail.vue"),
      },


      {
        path: "/product/category/:category/mark/:mark",
        name: "productCategoryMark",
        component: () => import("src/pages/product/Product.vue"),
      },
      {
        path: "/product/sale",
        name: "productSale",
        component: () => import("src/pages/product/Product.vue"),
      },
      {
        path: "/product",
        name: "product",
        component: () => import("src/pages/product/Product.vue"),
      },
      // product end
      //  { path : '/product/:id', name :'product', props:true, component:() => import('src/pages/product/Product.vue')},

      {
        path: "/contact",
        name: "contact",
        component: () => import("src/pages/about/Contact.vue"),
      },
      //  Admin

      {
        path: "/admin",
        name: "admin",
        component: () => import("src/pages/admin/Admin.vue"),
        meta: { isRequireAuth: true },

      },

      {
        path: "/admin/addCategory",
        name: "adminAddCategory",
        component: () => import("src/pages/admin/product/AddCategory.vue"),
        meta: { isRequireAuth: true },

      },


      {
        path: "/admin/discountCode",
        name: "adminCodeDiscount",
        component: () => import("src/pages/admin/discount/DiscountCode.vue"),
        meta: { isRequireAuth: true },
      },

      {
        path: "/admin/discountCode/Detail/:discountCodeId",
        name: "adminAddCodeDiscount",
        component: () => import("src/pages/admin/discount/DiscountCodeDetail.vue"),
        meta: { isRequireAuth: true },
      },

      {
        path: "/admin/message",
        name: "adminMessage",
        component: () => import("src/pages/admin/Message.vue"),
        meta: { isRequireAuth: true },
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
        path: "/admin/orderManager/numUnread/:numUnread",
        name: "adminOrderManager",
        component: () => import("src/pages/admin/bill/OrderManager.vue"),
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
        component: () => import("src/pages/admin/bill/ReservierungAmin.vue"),
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
        component: () => import("src/pages/customer/Login.vue"),
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
