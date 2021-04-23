/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import IFriend from "../interfaces/interfaces"

interface IFriendResult {
  getFriend: IFriend
}

interface IVariableInput {
  email: string
}

const GET_FRIEND = gql`
 query getFriend($email:String){
  getFriend(email:$email){
    id
    firstName
    lastName
    email
    role
  }
}
`

export default function FindFriend() {
  const [email, setEmail] = useState("")
  const [getFriend, {loading, called, data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy:"cache-and-network"}
  );
    
  const fetchFriend = () => {
    getFriend({variables: {email: email}})
  }

  return (
    <div>
      Email:<input type="txt" value={email} onChange={e => {
        setEmail(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />

      {called && loading && <p>loading...</p>}
      {data && (
        <div>
      <p>{data.getFriend.firstName}</p>
      <p>{data.getFriend.lastName}</p>
      </div>
      )}
      

    </div>)
}
