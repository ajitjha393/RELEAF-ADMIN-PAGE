import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components";
import db from "../../assets/firebase";
// import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SidebarChat from "./SidebarChat";
import logo from "../../assets/img/releaf.jpg";
import { useCollection } from "react-firebase-hooks/firestore";

const ChatSidebar = ({ toggle, isOpen }) => {
  const userChatRef = db
    .collection("personalChats")
    .where("users", "array-contains", "Releaf Support");

  const [chatSnapshot] = useCollection(userChatRef);

  return (
    <Container isOpen={isOpen} onClick={toggle}>
      <Header>
        <UserAvatar src={logo} />
        <IconContainer>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </IconContainer>
      </Header>

      {/* List of chats */}
      {chatSnapshot?.docs.map((chat) => (
        <SidebarChat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default ChatSidebar;

const Container = styled.div`
  flex: 0.35;
  border-right: 1px solid whitesmoke;
  height: 90vh;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (max-width: 768px) {
    flex: 1;
    height: 80vh;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconContainer = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
