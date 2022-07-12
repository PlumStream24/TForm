export interface User {
  uid: string,
  email?: string,
  displayName?: string,
  photoURL?: string,
  name?: {
    first: string,
    last: string
  },
  token: string
}
