import axios from "src/boot/axios";

// const server = process.env.DEV ? "http://localhost:8690" : "https://koto-asiankitchen.de/api" ;
// const server = "http://85.214.156.202:8686" ;
const server = "http://localhost:8690";
const iconUrl = "/img/icon/nha.png"

const getAxios = (url) => {
  return axios.get(`${server}${url}`)
}
export const WebApi ={
  server,
  iconUrl,
  getAxios

}
