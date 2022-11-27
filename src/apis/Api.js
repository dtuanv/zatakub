import axios from 'axios'

  const Api = axios.create({
    baseURL : process.env.DEV ? "http://localhost:8888" : "https://waxyrice.de/api"
  })
  export default Api;
