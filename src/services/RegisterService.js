import { WebApi } from "/src/apis/WebApi";
import axios from "axios";

export class RegisterService {
  doRegister(registerRequest) {
    return axios.post(`${WebApi.server}/api/register`, registerRequest);
  }
}

export class RegisterRequest {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
