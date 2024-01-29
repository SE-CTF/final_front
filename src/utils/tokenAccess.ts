const TokenService = {
  saveToken: (token: string) => {
    localStorage.setItem("key", token);
  },

  getToken: () => {
    return localStorage.getItem("key");
  },

  removeToken: () => {
    localStorage.removeItem("key");
  },

  isTokenExpired: () => {
    const token = TokenService.getToken();
    if (!token) return true;

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const expirationDate = new Date(decodedToken.exp * 1000);

    return expirationDate < new Date();
  },

  decodeToken : () => {
    const token = TokenService.getToken();
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]))

  }
};

export default TokenService;
