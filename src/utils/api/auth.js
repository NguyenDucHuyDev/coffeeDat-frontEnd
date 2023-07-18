import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_PATH_URL_SERVER}api/`
})

instance.interceptors.response.use(function (response) {
  return response.data;
}, function(error){
  if(error.response.status === 404 )  return Promise.reject(error);
  return error.response.data;
}
);

export default instance