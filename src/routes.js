import React from "react";
import { BrowserRouter, Routes as Routess , Route } from "react-router-dom";

import Main from "./pages/Main";
import Repository from "./pages/Repository";

export default function Routes(){
  return(
    <BrowserRouter>
      <Routess>
        <Route path="/" exact element={<Main/>}/>
        <Route path="/repository/:repository" exact element={<Repository/>}/>
      </Routess>
    </BrowserRouter>
  );
}
