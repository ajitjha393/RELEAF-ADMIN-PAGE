import React, { useContext } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import firebase from "firebase";
import db, { auth } from "../../assets/firebase";
import Message from "./Message";
import ChatContext from "../../context/ChatContext";
import TimeAgo from "timeago-react";
import CryptoJS from "crypto-js";

const Chat = ({ toggle, isOpen }) => {
  const endOfMessagesRef = useRef(null);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  const { chatId, recipient } = useContext(ChatContext);

  console.log(recipient);

  const scrollToBottom = () => [
    endOfMessagesRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    }),
  ];

  useEffect(() => {
    db.collection("personalChats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [chatId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Enter Message");
    } else {
      db.collection("personalChats")
        .doc(chatId)
        .collection("messages")
        .add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: CryptoJS.AES.encrypt(
            input,
            process.env.REACT_APP_CHAT_SECRET_KEY
          ).toString(),
          photo:
            "https://firebasestorage.googleapis.com/v0/b/help-releaf.appspot.com/o/releaf.jpg?alt=media&token=ad62568e-f7fa-4660-951d-93995eeb2a40",
          displayName: "Releaf Support",
        });

      setInput("");
      scrollToBottom();
    }
  };

  return (
    <ChatContainer isOpen={isOpen}>
      <Header>
        <ShowSidebarButton>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </ShowSidebarButton>

        {recipient?.photoURL ? (
          <Avatar src={recipient?.photoURL} />
        ) : (
          <Avatar>{recipient?.displayName[0]}</Avatar>
        )}

        <HeaderText>
          <h3>{recipient?.displayName}</h3>
          {recipient ? (
            <p>
              Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                // console.log(recipient.lastSeen.toDate())
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavialable"
              )}
            </p>
          ) : (
            <p>Loading Last Active....</p>
          )}
        </HeaderText>
      </Header>

      <ChatMessage>
        {messages.map(({ id, data }) => (
          <Message key={id} data={data} />
        ))}

        <EndOfMessage ref={endOfMessagesRef} />
      </ChatMessage>

      <ChatInput>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your message."
            type="text"
          />
          <button onClick={sendMessage}>Send Message</button>
        </form>

        <IconButton>
          <SendIcon className="chat__mic" />
        </IconButton>
      </ChatInput>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 90vh;
  background-color: white;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  }
`;

const ChatMessage = styled.div`
  flex: 1;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border-top: 1px solid lightgray;
  background-color: #f5f5f5;

  > form {
    flex: 1;
  }

  > form > input {
    width: 98%;
    outline-width: 0;
    border: 1px solid lightgray;
    border-radius: 999px;
    padding: 5px;
  }

  > form > button {
    display: none;
  }
`;

const EndOfMessage = styled.div`
  margin-bottom: 80px;
`;

const Header = styled.div`
  background-color: #f5f5f5;
  display: flex;
  padding: 18px 20px;
  justify-content: space-around;
  border-bottom: 1px solid whitesmoke;
`;

const ShowSidebarButton = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    margin-right: 30px;
  }
`;

const HeaderText = styled.div`
  margin-left: 15px;
  flex: 1;
  flex-direction: column;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14px;
    color: gray;
  }
`;
