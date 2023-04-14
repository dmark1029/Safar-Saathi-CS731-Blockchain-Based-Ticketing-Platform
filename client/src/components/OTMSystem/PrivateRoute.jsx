import React from "react";
import { useEth } from "../../contexts/EthContext";
// import { Navigate } from "react-router-dom";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeNoUser from "./NoticeLoginUser";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import SignIn from "./signIn";
import DeletedUser from "./NoticeLoginUser";

function PrivateRoute ({ children }) {
  const { loggedUser, state, setLoggedUser } = useEth();
  // console.log(loggedUser)
  if(!state.artifact) return <NoticeNoArtifact/>
  if(!state.contract) return <NoticeWrongNetwork/>
  const checkUser = async () => {
    let flag = await state.contract.methods.UserExist(state.accounts[0]).call();
    if(flag && !loggedUser) {
      let tt = await state.contract.methods.getUserDetails(state.accounts[0]).call();
      // console.log(tt);
      setLoggedUser(tt);
    }
  }
  checkUser();
  // if(!loggedUser) return <NoticeNoUser/>
  if(!loggedUser) return <><NoticeNoUser/> <SignIn/></> 
  if(!loggedUser[5]) return  <><NoticeNoUser/> <DeletedUser/></> 
  return children ;
}

export default PrivateRoute;