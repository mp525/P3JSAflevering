/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql, useMutation } from "@apollo/client"
import IFriend from "../interfaces/interfaces"
import { ALL_FRIENDS } from "./AllFriends";

interface IFriendResult {
  deleteFriend: IFriend
}

interface IVariableInput {
  input: string
}

const DELETE_FRIEND = gql`
 mutation deleteFriend($input:String){
  deleteFriend(input:$input){
    firstName
    lastName
  }
}
`

export default function DeleteFriend() {
  const [email, setEmail] = useState("")
  const [deleteFriend, {loading, called, data}] = useMutation<IFriendResult, IVariableInput>(
    DELETE_FRIEND,
    /* {
        update(cache, { data }) {
        const deletedFriend = data.deleteFriend;
        const d: any = cache.readQuery({ query: ALL_FRIENDS })
        if (!d) {
          return
        }
        let allFriends = d.getAllFriends
        cache.writeQuery({
          query: ALL_FRIENDS,
          data: { getAllFriends: [...allFriends, deletedFriend] }
        })
      }
    } */
  );
    
  const fetchFriend = () => {
    deleteFriend({variables: {input: email}})
  }

  return (
    <div>
      Email:<input type="txt" value={email} onChange={e => {
        setEmail(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Delete Friend</button>
      <br />
      <br />

      {called && loading && <p>loading...</p>}
      {data && (
        <div>
            <p>Friend was deleted:</p>
      <p>{data.deleteFriend.firstName}</p>
      <p>{data.deleteFriend.lastName}</p>
      </div>
      )}
      

    </div>)
}
