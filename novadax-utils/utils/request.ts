import axios from "axios";
import JSONbig from "json-bigint";

import { requestFace, requestConfigFace, promiseErr } from "../interface";
class axiosRequest {
  constructor(timeout: number, headers: requestConfigFace) {
    this.request = axios.create({
      timeout: 1000 * timeout,
      withCredentials: true,
    });
    this.requestHeaders(headers);
    this.response();
  }

  request: any = null;

  err: promiseErr = (error) => Promise.reject(error);

  requestHeaders = (headers: requestConfigFace) => {
    this.request.interceptors.request.use((config: any) => {
      if (JSON.stringify(headers) !== "{}") {
        Object.keys(headers).forEach((item) => {
          config.headers[item] = headers[item];
        });
      }
      return config;
    }, this.err);
  };

  response = () => {
    this.request.interceptors.response.use((response: any) => {
      return response.data;
    }, this.err);
  };
}

/**
 * @description:httpGet请求
 * @param {requestFace} data {url,params 所需参数，config header配置,timeout 超时时间,bigFlag 是否是开启bigNumber}
 * @return {Promise}
 */

export const httpGet = (data: requestFace): any => {
  const { url, params, config = {}, timeout = 5, bigFlag = false } = data;
  const request = new axiosRequest(timeout, config).request;
  return request({
    url,
    method: "get",
    params,
    transformResponse: [
      (data: string) => (bigFlag ? JSONbig.parse(data) : JSON.parse(data)),
    ],
  });
};

/**
 * @description:httpPost请求
 * @param {requestFace} data {url,params 所需参数，config header配置,timeout 超时时间,bigFlag 是否是开启bigNumber}
 * @return {Promise}
 */

export const httpPost = (data: requestFace): any => {
  const {
    url,
    params,
    config = {},
    timeout = 5,
    bigFlag = false,
    responseType = "json",
  } = data;
  const request = new axiosRequest(timeout, config).request;
  return request({
    url,
    method: "post",
    data: params,
    transformResponse: [
      (data: string) =>
        responseType === "json"
          ? bigFlag
            ? JSONbig.parse(data)
            : JSON.parse(data)
          : data,
    ],
    responseType,
  });
};

/**
 * @description:httpPut请求
 * @param {requestFace} data {url,params 所需参数，config header配置,timeout 超时时间,bigFlag 是否是开启bigNumber}
 * @return {Promise}
 */

export const httpPut = (data: requestFace): any => {
  const {
    url,
    params,
    config = {},
    timeout = 5,
    bigFlag = false,
    responseType = "json",
  } = data;
  const request = new axiosRequest(timeout, config).request;
  return request({
    url,
    method: "put",
    data: params,
    transformResponse: [
      (data: string) =>
        responseType === "json"
          ? bigFlag
            ? JSONbig.parse(data)
            : JSON.parse(data)
          : data,
    ],
    responseType,
  });
};

/**
 * @description:httpDelete请求
 * @param {requestFace} data {url,params 所需参数，config header配置,timeout 超时时间,bigFlag 是否是开启bigNumber}
 * @return {Promise}
 */

export const httpDelete = (data: requestFace): any => {
  const {
    url,
    params,
    config = {},
    timeout = 5,
    bigFlag = false,
    responseType = "json",
  } = data;
  const request = new axiosRequest(timeout, config).request;
  return request({
    url,
    method: "delete",
    data: params,
    transformResponse: [
      (data: string) =>
        responseType === "json"
          ? bigFlag
            ? JSONbig.parse(data)
            : JSON.parse(data)
          : data,
    ],
    responseType,
  });
};
