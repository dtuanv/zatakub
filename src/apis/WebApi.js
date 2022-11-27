
const server = process.env.DEV ? "http://localhost:8889" : "https://koto-asiankitchen.de/api" ;
//const server = "http://85.214.156.202:8686" ;
const iconUrl = "/img/icon/nha.png"
export const WebApi ={
  server,
  iconUrl,
}
