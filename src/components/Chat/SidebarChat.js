import React from "react";
import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import db, { auth } from "../../assets/firebase";
import getRecipientDisplayName from "../../utils/getRecepientDisplayName";
import { useHistory } from "react-router-dom";

const SidebarChat = ({ id, users }) => {
  const history = useHistory();
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("displayName", "==", getRecipientDisplayName(users))
  );
  const recipientDisplayName = getRecipientDisplayName(users);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  console.log(recipient);

  const enterChat = () => {
    history.push({
      pathname: `/chat/${id}`,
      state: {
        recipient: recipient,
      },
    });
  };

  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient?.photoURL} />
      ) : (
        <UserAvatar>{recipientDisplayName[0].charAt(0)}</UserAvatar>
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
