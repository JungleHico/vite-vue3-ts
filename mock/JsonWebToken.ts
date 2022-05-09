import jwt from 'jsonwebtoken';
// 参考：https://github.com/auth0/node-jsonwebtoken

class JsonWebToken {
  private static _secret: string = 'secret';

  // 生成token，有效期2小时
  public static generateToken(data: string | object): string {
    return jwt.sign(data, this._secret, { expiresIn: '2h' });
  }

  // 校验token
  public static checkToken(authorization: string, callback: any) {
    if (authorization && authorization.includes('Bearer')) {
      const token = authorization.substring(
        authorization.indexOf('Bearer ') + 7
      );
      jwt.verify(token, this._secret, callback);
    }
  }

  // 返回（鉴权后的）数据
  public static getAuthData<T>(
    authorization: string,
    data: T
  ): BaseResponse<T | null> {
    let auth = false;

    this.checkToken(
      authorization,
      (error: Error | null, data: string | object | undefined) => {
        if (data) {
          auth = true;
        }
      }
    );

    if (!auth) {
      return {
        code: 401,
        data: null,
        message: '鉴权失败'
      };
    }
    return {
      code: 0,
      data: data,
      message: 'success'
    };
  }
}

export default JsonWebToken;
