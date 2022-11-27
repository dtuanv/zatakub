import { useStore } from "vuex";
import { ref, computed, nextTick } from "vue";
import { WebApi } from "/src/apis/WebApi";
import {removeJwtTokenFromStorage} from "src/utils/LocalStorageUtils";
import axios from "axios";
export class LoginService {
  doLogin(loginRequest) {
    return axios.post(`${WebApi.server}/api/login`,loginRequest);
  }
  doLogout(){
    removeJwtTokenFromStorage();
  }
}

export class LoginRequest {
  constructor(username, password){
    this.username = username;
    this.password = password;
  }
}
