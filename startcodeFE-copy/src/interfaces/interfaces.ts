/* export enum Gender {
  MALE,
  FEMALE,
  OTHER
 } */

 //export type Gender = "MALE" | "FEMALE" | "OTHER"
 
 export default interface IFriend  {
   id? :string
   firstName: string
   lastName: string
   password: string
   email: string
   role?: string
 }

 export interface IEditFriend  {
  firstName?: string
  lastName?: string
  password?: string
  email: string
}
 