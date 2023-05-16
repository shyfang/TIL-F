/**接口参数配置 */
export interface requestConfigFace {
  [key: string]: any;
}

/**接口参数配置*/
export interface requestFace {
  url: string;
  params?: requestConfigFace | string;
  config?: requestConfigFace;
  timeout?: number;
  bigFlag?: boolean;
  responseType?: string;
}

/**后端返回数据*/
export interface httpReturnParam {
  code: number;
  data: object;
  message: string;
}

/** Promise错误信息*/
export interface promiseErr {
  <T>(error: T): Promise<T>;
}

export interface requestParamsFace {
  [key: string]: string | number;
}

export type osTypeFace = "pc" | "iPhone" | "Android";

export interface strObjectFace {
  [key: string]: string;
}

export type DataType =
  | "Object"
  | "Array"
  | "Number"
  | "String"
  | "Null"
  | "Undefined"
  | "Boolean"
  | "RegExp";

export type paramsType =
  | object
  | Array<paramsType>
  | number
  | string
  | null
  | undefined
  | boolean
  | RegExp;
