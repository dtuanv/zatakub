import { priceCalculator } from "/src/logic/logic.js";


export const SET_PRODUCT = (state, product) => {
  // console.log("SET_Product")
  // state.products = product;


  // set product manuel begin
  state.products = [
    {
      id: 0,
      status: true,
      imageUrl: "goidau.png",
      imageUrl2: "dauxa.png",
      imageUrl3: "nau.png",

      name: "Dầu gội Yunsey dành cho nam For Men 380ml",
      price: "130000",
      discount: 30,
      subtitle: "BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",
      body: 'subtitle.png',
      body1: "123 Thường: cho tóc hư tổn có chất tóc sợi mỏng, mảnh",
      body2: "123+: cho tóc hư tổn có chất tóc sợi trung bình",
      body3: "123X: cho tóc hư tổn có chất tóc sợi to, dày",
      body4: "cho 2 tóc hư tổn có chất tóc sợi trung bình",


      description: "description.png",
      category: 'hair',

      category: 'germany',

      mark: 'goldWell'
    },
    {
      id: 1,
      status: true,
      subtitle: "BỘ PHỤC HỒI TÓC HƯ TỔN 3 BƯỚC MILBON DEESSE'S MẪU 2022 (600ML X 3): ",

      imageUrl: "dauxa.png",
      name: "Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2",
      price: "130000",
      discount: 50,
      description: "",

      category: 'germany',
      mark: 'spWella'
    },
    {
      id: 2,
      status: true,

      imageUrl: "goidau.png",
      name: "Dau Goi Dau 3 Dau Goi Dau 3  Dầu gội xả siêu mượt phục hồi và ngăn gãy rụng tóc Edocean Collagen Keratin 500mlx2 ",
      price: "130000",
      discount: 20,
      description: "Dau Goi Dau De 3",
      category: 'hair',
      category: 'germany',
      mark: 'goldWell'
    },
    {
      id: 3,
      status: true,

      imageUrl: "goidau.png",
      name: "Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
      price: "130000",
      discount: 25,
      description: "Dau Goi Dau De 3",
      category: 'hair',
      category: 'germany',
      mark: 'goldWell'
    },
    {
      id: 4,
      status: false,

      imageUrl: "goidau.png",
      name: "Dau Goi Dau 4 F Dau Goi Dau 3 Keratin thủy phân ORCHID_OIL KLERAL phục hồi cho mái tóc hư tổn, khô xơ, giòn, gẫy, xốp 10mlx10",
      price: "130000",
      discount: 30,
      description: "Dau Goi Dau De 3",
      category: 'whitening',
      category: 'america', mark: 'goldWell'
    },
    {
      id: 5,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 30,
      description: "Dau Goi Dau De 3",
      category: 'whitening',
      category: 'america', mark: 'goldWell'

    },
    {
      id: 6,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 30,
      description: "Dau Goi Dau De 3",
      category: 'combo',
      category: 'german', mark: 'goldWell'

    },
    {
      id: 7,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 30,
      description: "Dau Goi Dau De 3",
    },
    {
      id: 8,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 40,
      description: "Dau Goi Dau De 3",
      category: 'hairCosmetic',

    },
    {
      id: 9,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 50,
      description: "Dau Goi Dau De 3",
    },
    {
      id: 10,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 10,
      description: "Dau Goi Dau De 3",
    },
    {
      id: 11,
      status: true,

      imageUrl: "nau.png",
      name: "TINH DẦU DƯỠNG TÓC KLERAL HUILE D’ARGAN CONDITIONING OIL 150ML",
      price: "130000",
      discount: 12,
      description: "Dau Goi Dau De 3",
    },
  ];


  // set product manuel end


  state.products.forEach((product) => {
    // test
    let newSubFoods = product.subFoods.sort((a, b) => a.key - b.key);
    product.subFoods = newSubFoods
    // test

    let check = product.subFoods.find((sf) => {
      return sf.price != undefined;
    });
    if (check === undefined) {
      product.checkSubFood = 2;
    }
  });
  // console.log("state.products",state.products)

  // product.forEach((pr) => {
  //   console.log("check product", pr)
  // })

  // product.forEach((pr) => {
  //     if(state.sushiProducts.length > 0){
  //       if (!state.sushiProducts.includes(pr)) {
  //         // console.log("push include sushiProducts");
  //         // state.sushiProducts.push(pr);
  //       }
  //     }
  // });
  state.vorspeiseProducts = product.filter((pr) => {
    return pr.category === "vorspeise";
  });


  // state.spezialProducts.sort((a, b) => a.num - b.num);
  // -----------------------------------------------------------------
  // console.log("product in mutation ", state.products )
  // console.log("product in mutation per String",  JSON.parse(JSON.stringify(state.products)) )
};
// export const addNewTodo = (state, payload) => {
//   console.log("SET_NewTodo",payload)
//   state.todos.push({name: payload})
//   console.log("state Todos ",state.todos)
// }



export const ADD_TO_CART = (state, { product, quantity }) => {
  let productInCart = state.cart.find((item) => {
    return item.product.id === product.id;
  });
  if (quantity === 0) {
    return;
  }
  if (productInCart) {
    productInCart.quantity += quantity;

  }

  const priceCalculators = new priceCalculator()

 let discountPrice = priceCalculators.priceWithDiscount(product.price,product.discount)
 if(productInCart){
  var itemTotal = discountPrice * productInCart.quantity
  productInCart.itemTotal = itemTotal
 }else{
  var itemTotal = discountPrice * quantity
  state.cart.push({ product, quantity,discountPrice,itemTotal });
 }

};

export const CHANGE_NUMITEM_CART = (state , { product , quantity, action}) => {
  let productInCart = state.cart.find((item) => {
    return item.product.id === product.id;
  });
  if(action == 'ADD'){
    productInCart.quantity ++
  }
  if(action == 'SUBTRACT'){
    productInCart.quantity --
    if(productInCart.quantity  == 0){
      let i = state.cart.indexOf(productInCart)
      state.cart.splice(i,1)
      console.log("i ",i)

      console.log(" state.cart ", state.cart)
    }
  }
  const priceCalculators = new priceCalculator()

 let discountPrice = priceCalculators.priceWithDiscount(product.price,product.discount)
 let itemTotal = discountPrice *  productInCart.quantity
 productInCart.itemTotal = itemTotal

}
export const REMOVE_FROM_CART = (state, product) => {
  state.cart = state.cart.filter((item) => {
    return item.product.id !== product.id;
  });
};
export const CHECK_OUT = (state) => {
  // console.log("Check Out")
  return (state.cart = []);
};
export const CHANGE_GUEST_NUM = (state, orGuestNum) => {
  // console.log("change in mutation")
  state.guestNum = orGuestNum;
  // console.log( state.guestNum )
  return;
};
export const CHANGE_STATUS = (state, key, input) => {
  let reservationIcon = state.reservations.find((re) => {
    return re.key === key;
  });

  if (reservationIcon && input != "") {
    reservationIcon.status = true;
  }
};
export const RESET_STATUS = (state) => {
  state.guestInfo = {
    guestNum: 0,
    orGuestNum: "",
  };

  // let  updateStatus = state.reservations.find(re =>{
  //     return re.icon==='east'
  //   })
  //   if(updateStatus){
  //     updateStatus.status = false
  //   }
  state.reservations.forEach((re) => {
    re.status = false;
  });
};
export const SET_TOKEN = (state, input) => {
  state.token = input;
};
export const SET_ROLE = (state, input) => {
  state.role = input;
};
export const LOG_OUT = (state) => {
  state.role = "";
};

export const CHANGE_STATUS_PRODUCT = (state, product) => {
  let findProduct = state.products.find(p => {
    return p.id == product.id
  })
  if(findProduct.status == 'on'){
    findProduct.status  = 'off'
  }else{
    findProduct.status  = 'on'

  }
};

export const SET_ADMIN_ROLE = (state) => {
  if(state.ro == ''){
    state.ro = 'admin'
  }else{
    state.ro = ''
  }
}

