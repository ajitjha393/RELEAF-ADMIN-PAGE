import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChatContextProvider } from "./context/ChatContext";

ReactDOM.render(
  <ChatContextProvider>
    <App />
  </ChatContextProvider>,

  document.getElementById("root")
);
