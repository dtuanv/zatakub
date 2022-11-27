import Api from "./Api"

export default {
  allProduct(){
   return Api.get('/product')
  },
  allCustomer(){
    return Api.get('/customer')
  }
}
