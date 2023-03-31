import React from "react";
import { useEth } from "../../contexts/EthContext";
// import { Navigate } from "react-router-dom";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeNoUser from "./NoticeLoginUser";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

// import { useNavigate } from "react-router-dom";
function PrivateRoute ({ children }) {
//   const navigate = useNavigate();
//   const val = useEth();
  const { loggedUser, state } = useEth();
  if(!state.artifact) return <NoticeNoArtifact/>
  if(!state.contract) return <NoticeWrongNetwork/>
  if(!loggedUser) return <NoticeNoUser/>
  return children ;
}

export default PrivateRoute;