import React from "react";
import { createContext, useState } from "react";
const ChatContext = createContext();
const ChatContextProvider = (props) => {
  const [chatId, setChatId] = useState(null);
  const [recipient, setRecipient] = useState("");

  const getChatId = (id) => {
    setChatId(id);
  };

  const getRecipient = (user) => {
    setRecipient(user);
  };

  console.log(recipient);

  return (
    <ChatContext.Provider
      value={{ chatId, getChatId, recipient, getRecipient }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContext;

export { ChatContextProvider };
