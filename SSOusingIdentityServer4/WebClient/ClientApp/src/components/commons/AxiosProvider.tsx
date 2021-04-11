import axios, { AxiosInstance } from 'axios';
import React, { createContext, useContext, useEffect } from 'react';

const newAxios = axios.create({
  baseURL: 'https://localhost:6001'
});
const axiosContext = createContext<AxiosInstance>(newAxios);

export const useAxios = () => useContext(axiosContext);

export const AxiosProvider: React.FC<{ accessToken?: string }> = ({ accessToken, children }) => {

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    // https://www.npmjs.com/package/axios#interceptors
    newAxios.interceptors
      .request
      .use(async config => {
        config.headers.common['Authorization'] = `Bearer ${accessToken ?? ''}`

        return config;
      });
  }, [accessToken]);

  return (
    <axiosContext.Provider value={newAxios}>
      {children}
    </axiosContext.Provider>
  );
};