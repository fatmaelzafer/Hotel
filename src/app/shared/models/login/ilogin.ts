export interface Ilogin {
  email: string| null| undefined;
  password: string| null| undefined;
}
export interface Iloginresult {
  accessToken: string
  refreshToken: string
}
