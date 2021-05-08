import React from "react";
import { useEffect, useState } from "react";
import db from "../../assets/firebase";
import * as timeago from "timeago.js";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import CryptoJS from "crypto-js";

const ChatroomSidebarChat = ({ id, chatName, description }) => {
  const [chatInfo, setChatInfo] = useState([]);
  const [decryptedData, setDecryptedData] = useState("");
  const history = useHistory();

  useEffect(() => {
    db.collection("chatrooms")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  useEffect(() => {
    if (chatInfo[0]) {
      setDecryptedData(
        CryptoJS.AES.decrypt(
          chatInfo[0]?.message,
          process.env.REACT_APP_CHAT_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      );
    }
  }, [chatInfo]);

  const enterChat = () => {
    history.push({
      pathname: `/chatroom/${id}`,
      state: {
        description: description,
        chatName: chatName,
      },
    });
  };

  return (
    <SidebarChatContainer onClick={enterChat}>
      <SidebarChatInfo>
        <h3>{chatName}</h3>
        <p>
          {decryptedData
            ? decryptedData.length > 10
              ? `${decryptedData}`.slice(0, 10) + "..."
              : decryptedData
            : "Loading"}
        </p>
        <small>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </small>
      </SidebarChatInfo>
    </SidebarChatContainer>
  );
};

export default ChatroomSidebarChat;

const SidebarChatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: #3e93fd;
    color: white;
  }
`;

const SidebarChatInfo = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;
  > small {
    position: relative;
    top: 5px;
    right: 0;
  }
`;
