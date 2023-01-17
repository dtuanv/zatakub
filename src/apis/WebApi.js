import axios from "src/boot/axios";

// const server = process.env.DEV ? "http://localhost:8690" : "https://waxyrice.de/api" ;
const server = process.env.DEV ? "http://localhost:8690" : "https://zatakub.com/api" ;
// const server = "https://waxyrice.de/api" ;
// const server = "http://85.214.156.202:8686" ;
// const server = "http://localhost:8690";
const iconUrl = "/img/icon/zatakub.png"

const getAxios = (url) => {
  return axios.get(`${server}${url}`)
}
export const WebApi ={
  server,
  iconUrl,
  getAxios

}
