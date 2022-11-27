import { isValueEmpty, ísValueEmpty } from "src/utils/HelperFunctions";
import {
  getJwtFromStorage,
  setJwtTokenInStorage,
  getUserRoleFromStrorage,
  removeJwtTokenFromStorage,
} from "src/utils/LocalStorageUtils";
import { LoginService } from "src/services/LoginService";

function getInitialState(){
  const token = getJwtFromStorage();
  const role = getUserRoleFromStrorage();

  console.log("Cheack time saved Token", token)
  if(isValueEmpty(token)){
    return {loggedIn: false, jwt: "",role:""};

  }else{

    return {loggedIn:true, jwt: token, role: role};
  }
}

const loginService = new LoginService();
export const loginModule = {
  namespaced: true,
  state:  getInitialState(),
  getters: {
    getLoginStatus(state){
      const token = getJwtFromStorage();
      return state;
    },
    getJwt(state){
      return state.jwt;
    },
  },
  mutations:{
    loginSuccess(state,jwt){
      state.loggedIn = true;
      state.jwt = jwt;
      setJwtTokenInStorage(jwt);
    },
    setRole(state,loginRequest ){
      if(loginRequest.username == 'test7'|| loginRequest.username =='tuan'){
        state.role = 'ADMIN'
      }else{
        state.role = 'USER'
      }
    },
    loginFailure(state){
      state.loggedIn = false;
      state.jwt = null;
      removeJwtTokenFromStorage();
    },
    logout(state){
      console.log("logout in store")
      state.loggedIn = false;
      state.jwt = null;
      state.role = "";
      removeJwtTokenFromStorage();
    },
  },
  actions:{
    async doLogin({commit}, loginRequest){
      try {
        console.log("lolgin request in modules", loginRequest);
        const response = await loginService.doLogin(loginRequest);
        const jwt = response.data.jwtToken;
        // console.log("TUan ckeck respone in dologin at modules ", jwt);
        commit("loginSuccess",jwt);
        commit("setRole",loginRequest)
        // test from orig logi
        // test from orig login




        return Promise.resolve();
      }
      catch (error){
        console.log(error);
        commit("loginFailure");
        return Promise.reject(error);
      }
    },
    doLogout({commit}){
      console.log("commit dologout")
      commit("logout");
    },
  },

};

