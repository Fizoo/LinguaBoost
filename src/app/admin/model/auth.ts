export interface SignUpCredentials {
  email: string;
  password:string
  displayName:string
}

export interface User {
  uid: string;
  email: string;
  name:string
  password:string
  photoURL?: string;
}
