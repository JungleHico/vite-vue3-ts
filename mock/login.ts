import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';

const loginServices: MockMethod[] = [
  {
    url: '/api/login',
    method: 'post',
    timeout: 500,
    response: ({ body }: MockRequestOptions): BaseResponse<Token | null> => {
      const { account, password } = body;
      const pass = account === 'admin' && password === '1234';

      if (!pass) {
        return {
          code: 400,
          data: null,
          message: '帐号密码错误'
        };
      }
      return {
        code: 0,
        data: {
          token: Random.word()
        },
        message: 'success'
      };
    }
  },
  {
    url: '/api/userInfo',
    method: 'get',
    timeout: 500,
    response: ({
      headers
    }: MockRequestOptions): BaseResponse<UserInfo | null> => {
      console.log(headers.authorization);
      if (!headers.authorization) {
        return {
          code: 401,
          data: null,
          message: '鉴权失败'
        };
      }
      return {
        code: 0,
        data: {
          username: 'admin',
          avatar: Random.image('100x100', '#aaa', '#f00', 'a')
        },
        message: 'success'
      };
    }
  }
];

export default loginServices;
