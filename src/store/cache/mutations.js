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
  // console.log("state.vorspeiseProducts vor", state.vorspeiseProducts);
  // state.vorspeiseProducts = product
  //   .filter((pr) => {
  //     return pr.category === "vorspeise";
  //   }).sort((a, b) => parseInt(a.num) - parseInt(b.num));
  // console.log("state.vorspeiseProducts", state.vorspeiseProducts);
  // ----------
  state.hauptgangProducts = product.filter((pr) => {
    return pr.category === "hauptgang";
  });
  // state.hauptgangProducts.sort((a, b) => a.num - b.num);
  //////////
  state.sushiMixProducts = product.filter((pr) => {
    return pr.category === "sushiMix";
  });
  // state.sushiMixProducts.sort((a, b) => a.num - b.num);
  ////////////
  state.sushiProducts = product.filter((pr) => {
    return pr.category === "sushi";
  });
  ////////
  state.makiProducts = product.filter((pr) => {
    return pr.category === "maki";
  });
  // state.makiProducts.sort((a, b) => a.num - b.num);

  // -----------------
  state.nigiriProducts = product.filter((pr) => {
    return pr.category === "nigiri";
  });
  // state.nigiriProducts.sort((a, b) => a.num - b.num);

  // ----------
  state.insideOutProducts = product.filter((pr) => {
    return pr.category === "insideOut";
  });
  // console.log("state.insideOutProducts ",state.insideOutProducts )
  // state.insideOutProducts.sort((a, b) => a.num - b.num);

  // -----------------------------------------------------
  state.tempuraProducts = product.filter((pr) => {
    return pr.category === "tempura";
  });
  // state.tempuraProducts.sort((a, b) => a.num - b.num);

  // ------------------------------------------------------------
  state.spezialProducts = product.filter((pr) => {
    return pr.category === "spezial";
  });
  // sashimiProducts
  state.sashimiProducts = product.filter((pr) => {
    return pr.category === "saschimi";
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
    return;
  }
  state.cart.push({ product, quantity });
};
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
