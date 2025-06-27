import axios from 'axios';







const api = axios.create({
    baseURL: 'http://localhost:4006',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        // Make sure 'token' is defined somewhere in your code
      
    }
})

export const get=(url,params)=>api.get(url,{params});
export const post=(url,data)=>api.post(url,data)
export const put=(url,data)=>api.put(url,data)
export const deleteUser=(url)=>api.delete(url)


api.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });