import React from "react";
import { useParams } from "react-router-dom";
//import { useParams } from "react-router-dom";


export default function Repository({match}){
  let { repository } = useParams(); 
  //console.log(repository); 
  return <h1> Repository: {repository} </h1>
}