export function getProduct (state) {
  // console.log("Get Product")
    return state.products
}
export const cartItemCount = (state) => {
  return state.cart.length;
}
export const cartTotalPrice = (state) => {
  let total = 0;
  state.cart.forEach(item => {
    total += item.product.price * item.quantity
  })
  // console.log("show test total ", total)
  return total
}
// export function getCustomer(state){
//   return state.customers
// }

