

export function getProduct (state) {
  console.log("Get Product",state.products )
    return state.products
}
export const cartItemCount = (state) => {
  return state.cart.filter(c => {
   return c.quantity > 0
  }).length;
}
export const cartTotalPrice = (state) => {
  let total = 0;

  // state.cart.forEach(item => {
  //   total += item.product.price * item.quantity
  // })
  state.cart.forEach(item => {
    total += item.itemTotal
  })
  return total
}

export const billDetail = (state) => {

}

export function getRo(state){
  return state.ro
}

export function getDrawItems(state) {
  return state.drawItems
}

