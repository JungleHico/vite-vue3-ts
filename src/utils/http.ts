import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse
} from 'axios';
import { notification } from 'ant-design-vue';
import 'ant-design-vue/es/notification/style/css';
import { useLoginStore } from '@/store/loginStore';

class Request {
  private _http: AxiosInstance;
  private static _instance: Request | undefined;

  constructor() {
    this._http = axios.create({
      baseURL: '',
      timeout: 10000
    });
    this.setRequestInterceptors();
    this.setResponseInterceptors();
  }

  // 返回单例
  public static getInstance(): Request {
    this._instance || (this._instance = new Request());
    return this._instance;
  }

  // 请求拦截
  private setRequestInterceptors() {
    this._http.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 请求头添加Authorization
        const token = localStorage.getItem('token');
        if (token) {
          (<AxiosRequestHeaders>(
            config.headers
          )).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );
  }

  // 响应拦截
  private setResponseInterceptors() {
    this._http.interceptors.response.use(
      <T>(response: AxiosResponse): Promise<T> => {
        const { code, data, message }: BaseResponse<T> = response.data;
        if (code === 0) {
          return Promise.resolve(data);
        }
        notification.error({
          message: code + '',
          description: message
        });
        if (code === 401) {
          // 授权过期，退出登录，重定向到登录页
          const loginStore = useLoginStore();
          loginStore.logout();
          window.location.reload();
        }
        return Promise.reject(message);
      },
      (error: any) => {
        notification.error({
          message: '请求失败',
          description: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  // 封装GET请求
  public get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    return this._http.get(url, config);
  }

  // 封装POST请求
  public post<T>(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    return this._http.post(url, data, config);
  }
}

export default Request.getInstance();
