import { priceCalculator } from "/src/logic/logic.js";


export const SET_PRODUCT = (state, product) => {
  // console.log("SET_Product")
  state.products = product;

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
