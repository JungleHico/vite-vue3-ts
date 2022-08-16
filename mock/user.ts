import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { successResult, errorResult, getRequestToken } from './utils';

function getUserList() {
  return [
    {
      userId: 1,
      username: 'admin',
      password: '123456',
      nickname: '超级管理员',
      phone: '13123456789',
      roles: ['admin'],
      token: 'token1',
      avatar: Random.image('100x100', '#ccc', '#f00', 'a'),
    },
  ];
}

const userServices: MockMethod[] = [
  {
    url: '/user/login',
    timeout: 500,
    method: 'post',
    response: ({ body }: MockRequestParams) => {
      const { username, password } = body;
      const checkUser = getUserList().find(
        (user) => user.username === username && user.password === password,
      );
      if (!checkUser) {
        return errorResult('帐号不存在或密码错误');
      }
      const { token } = checkUser;
      return successResult({
        token,
      });
    },
  },
  {
    url: '/user/info',
    timeout: 500,
    method: 'get',
    response: (request: MockRequestParams) => {
      const token = getRequestToken(request);
      if (!token) {
        return errorResult('无效token', null, 401);
      }
      const checkUser = getUserList().find((user) => user.token === token);
      if (!checkUser) {
        return errorResult('token已过期', null, 401);
      }
      const { password, token: userToken, ...user } = checkUser;
      return successResult(user);
    },
  },
];

export default userServices;
