import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";

import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import db from "../../assets/firebase";
import getRecipientDisplayName from "../../utils/getRecepientDisplayName";
import { useHistory } from "react-router-dom";
import ChatContext from "../../context/ChatContext";

const SidebarChat = ({ id, users }) => {
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("displayName", "==", getRecipientDisplayName(users))
  );
  const recipientDisplayName = getRecipientDisplayName(users);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const { getChatId, getRecipient } = useContext(ChatContext);

  const enterChat = () => {
    getChatId(id);
    getRecipient(recipient);
  };

  return (
    <Container onClick={enterChat}>
      {recipient?.photoURL ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientDisplayName[0]}</UserAvatar>
      )}
      <p>{recipientDisplayName}</p>
    </Container>
  );
};

export default SidebarChat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
