import axios from 'axios'
import Product from "/src/apis/Product.js"
import { WebApi } from "/src/apis/WebApi";

// export const getProduct = ({commit}) => {



//   // axios
//   // .get("http://localhost:8687/product")
//   // Product.allProduct()
//   // .then((response) => {
//   //  commit('SET_PRODUCT', response.data)
//   // });

// }


// export const addNewTodo =({commit}, payload) => {
//   commit('addNewTodo', payload)
// }

export const resetCartToEmpty = ({commit}) => {
  commit('RESET_CART_TO_EMPTY')
}
export const customerLogout = ({commit}) => {
  commit('CUSTOMER_LOGOUT')
}


export const setDrawItems = ({ commit }) => {


  axios.get(`${WebApi.server}/allDrawItem`).then(re => {
    // let draw = []

    console.log("re.data ",re.data)
    commit('SET_DRAWITEMS', re.data)

  })

}
export const addProductToCart = ({ commit }, { product, quantity }) => {
  commit('ADD_TO_CART', { product, quantity })
}

export const customerLogin = ({ commit }, customerId) => {
  commit('SET_CUSTOMER', customerId)
}

// customerLogin

export const changeNumItemInCart = ({ commit }, { product, quantity, action }) => {
  commit('CHANGE_NUMITEM_CART', { product, quantity, action })
}
export const removeProductFromCart = ({ commit }, product) => {
  commit('REMOVE_FROM_CART', product)
}
export const checkOut = ({ commit }) => {
  commit('CHECK_OUT')

}
export const changeGuestNum = ({ commit }, orGuestNum) => {
  commit('CHANGE_GUEST_NUM', orGuestNum)
}
export const changeStatus = ({ commit }, key, input) => {
  commit('CHANGE_STATUS', key, input)
}
export const resetStatus = ({ commit }) => {
  commit('RESET_STATUS')
}
// Token
export const setToken = ({ commit }, input) => {
  commit('SET_TOKEN', input)
}
// Role
export const setRole = ({ commit }, input) => {
  commit('SET_ROLE', input)
}
export const logOut = ({ commit }, input) => {
  commit('LOG_OUT', input)
}
export const changeStatusProduct = ({ commit }, product) => {
  commit('CHANGE_STATUS_PRODUCT', product)
}

export const setAdminRole = ({ commit }) => {
  commit('SET_ADMIN_ROLE')
}
