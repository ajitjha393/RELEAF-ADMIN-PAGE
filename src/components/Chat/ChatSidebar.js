import React from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "../../assets/firebase";
// import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SidebarChat from "./SidebarChat";

const ChatSidebar = ({ toggle, isOpen }) => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("personalChats")
    .where("users", "array-contains", "Releaf Support");

  const [chatSnapshot] = useCollection(userChatRef);
  return (
    <Container isOpen={isOpen} onClick={toggle}>
      <Header>
        <UserAvatar src={user.photoURL} />
        <IconContainer>
          <IconButton>
            <ArrowBackIosIcon onClick={toggle} />
          </IconButton>
        </IconContainer>
      </Header>

      {/* <Search>
        <SearchInput placeholder="Search in chats" />
        <SearchIcon />
      </Search>

      <SidebarButton>Start a new chat</SidebarButton> */}

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
  height: 80vh;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

// const Search = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px;
//   border-radius: 2px;
// `;

// const SearchInput = styled.input`
//   outline-width: 0;
//   border: none;
//   flex: 1;
// `;

// const SidebarButton = styled(Button)`
//   width: 100%;
//   &&& {
//     border-bottom: 1px solid whitesmoke;
//     border-top: 1px solid whitesmoke;
//   }
// `;

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
