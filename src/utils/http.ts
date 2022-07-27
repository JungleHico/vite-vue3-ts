import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { notification } from 'ant-design-vue';
import 'ant-design-vue/es/notification/style/css';
import { useLoginStore } from '@/store/loginStore';

const http: AxiosInstance = axios.create({
  // 接口
  // baseURL:
  //   process.env.NODE_ENV === 'production'
  //     ? import.meta.env.VITE_API_BASEURL
  //     : import.meta.env.VITE_PROXY_BASEURL,
  baseURL: '', // Mock
  timeout: 10000,
});

// 请求拦截
http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 请求头添加 token
    const token = localStorage.getItem('token');
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return Promise.resolve(config);
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 响应拦截（根据接口数据格式进行调整）
http.interceptors.response.use(
  <T = any>(response: AxiosResponse): Promise<T> => {
    const { code, data, message }: HttpResponse = response.data;
    if (code === 0) {
      // 请求成功
      return data;
    }
    // 请求异常
    notification.error({
      message: code,
      description: message,
    });
    return Promise.reject(message);
  },
  // 请求失败
  async (error: any) => {
    if (error.response) {
      const { status, data } = error.response;
      notification.error({
        message: '请求失败',
        description: data.message || error.message,
      });
      if (status === 401) {
        // 授权过期，退出登录，重定向到登录页
        const loginStore = useLoginStore();
        await loginStore.logout();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  },
);

// 封装 GET 请求
export function get<T>(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<T> {
  return http.get(url, {
    params,
    ...config,
  });
}

// 封装 POST 请求
export function post<T>(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<T> {
  return http.post(url, data, config);
}

export default http;
