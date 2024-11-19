import React from "react";
import ReactDOM from "react-dom/client";
import { ChatContextProvider } from "./context/chatContext";
import "./index.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
      <App /> 
      </ChatContextProvider>
     
    </BrowserRouter>
  </React.StrictMode>
);
