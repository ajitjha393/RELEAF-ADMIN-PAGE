import React from "react";
import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Avatar, Button, IconButton } from "@material-ui/core";
import logo from "../../assets/img/releaf.jpg";
import { useCollection } from "react-firebase-hooks/firestore";
import db from "../../assets/firebase";
import ChatroomSidebarChat from "./ChatroomSidebarChat";

const ChatroomSiebar = ({ isOpen, toggle }) => {
  const userChatRef = db.collection("chatrooms");
  const [chatSnapshot] = useCollection(userChatRef);
  const addChat = () => {
    const chatName = prompt("Please enter a chat room name ");
    const chatDesc = prompt("Please enter chat room description");
    if (chatName) {
      db.collection("chatrooms").add({
        chatName: chatName,
        description: chatDesc,
      });
    }
  };
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <SidebarHeader>
        <SidebarAvatar src={logo} />
        <h3>Minderse Support</h3>

        <SidebarIcon variant="outlined">
          <ArrowBackIosIcon />
        </SidebarIcon>
      </SidebarHeader>

      <SidebarButton onClick={addChat}>ADD NEW CHATROOM</SidebarButton>

      <SidebarChats>
        {chatSnapshot?.docs.map((chat) => (
          <ChatroomSidebarChat
            key={chat.id}
            id={chat.id}
            chatName={chat.data().chatName}
            description={chat.data().description}
          />
        ))}
      </SidebarChats>
    </SidebarContainer>
  );
};

export default ChatroomSiebar;

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 90vh;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
  overflow-y: scroll;
  @media screen and (max-width: 768px) {
    height: 80vh;
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 60px;
  background-color: white;
  justify-content: space-around;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarIcon = styled(IconButton)`
  display: none !important;
  @media screen and (max-width: 768px) {
    display: block !important ;
  }
`;

const SidebarChats = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-bottom: 1px solid white;
    border-top: 1px solid white;
  }
`;
