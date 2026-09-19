export interface Isignupdata {
  userName: string| null| undefined;
  email: string| null| undefined;
  password: string| null| undefined;
  phone: string| null| undefined;
  nationality: string| null| undefined;
}
export interface Isignup {
  user:User;
  token: string;

}
interface User {
  name: string;
  email: string;
}
