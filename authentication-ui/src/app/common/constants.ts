const API_PREFIX = 'http://localhost:8080';

export class CONSTANTS {
  static ServiceUrls = {
    authUrl: API_PREFIX + '/api/v1/auth/simple'
  };
  static AUTH_KEY = "isAuthenticated";
  static REDIRECT_KEY = "redirectUrl";
  static expireMinutes = 5 * 60;
  static AUTH_PREFIX = "auth";
  static AUTH_USER = "user";
}
