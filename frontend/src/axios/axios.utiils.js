import axios from "axios";

export const get = url => {
  return axios.get(url, {
    //AxiosRequestConfig parameter
    withCredentials: true //correct
  });
};

export const post = (url, body) => {
  return axios.post(url, body, {
    //AxiosRequestConfig parameter
    withCredentials: true //correct
  });
};
