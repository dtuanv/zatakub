import axios from "src/boot/axios";

const server = process.env.DEV ? "http://localhost:8690" : "https://koto-asiankitchen.de/api" ;
//const server = "http://85.214.156.202:8686" ;
const iconUrl = "/img/icon/nha.png"

export function getAxios(url) {
  return  axios.get(`${server}`+url)
  // console.log("get Axios", url)
}
