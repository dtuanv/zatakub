// import { api } from "boot/axios";
import { WebApi } from "/src/apis/WebApi";
import axios from "axios";
export class ProtectedService {
  getUserInfo(jwt) {
    console.log(" getUserInfo(jwt)",jwt)
    return axios.get(`${WebApi.server}/api/protected`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      withCredentials: true,
    });
  }

  doSimplePostRequest(jwt) {
    return api.post("/doSimplePostRequest", new DummyRequestBody("dummy"), {
      headers: {
        Authorization: "Bearer " + jwt,
      },
      withCredentials: true,
    });
  }
}

class DummyRequestBody {
  constructor(name) {
    this.name = name;
  }
}
