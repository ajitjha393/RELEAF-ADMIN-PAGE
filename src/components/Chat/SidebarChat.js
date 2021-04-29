import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import db from "../../assets/firebase";
import getRecipientDisplayName from "../../utils/getRecepientDisplayName";
import ChatContext from "../../context/ChatContext";
import * as timeago from "timeago.js";
import CryptoJS from "crypto-js";

const SidebarChat = ({ id, users }) => {
  const [chat, setChat] = useState([]);
  const [decryptedData, setDecryptedData] = useState("");
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("displayName", "==", getRecipientDisplayName(users))
  );
  const recipientDisplayName = getRecipientDisplayName(users);
  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const { getChatId, getRecipient } = useContext(ChatContext);

  useEffect(() => {
    db.collection("personalChats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChat(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    if (chat[0]) {
      setDecryptedData(
        CryptoJS.AES.decrypt(
          chat[0]?.data.message,
          process.env.REACT_APP_CHAT_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      );
    }
  }, [chat]);

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
      <TextWrapper>
        <p>{recipientDisplayName}</p>
        <MessageSpan>
          <span>{chat[0]?.data.displayName}: </span>
          <p>
            {decryptedData
              ? decryptedData.length > 10
                ? `${decryptedData}`.slice(0, 10) + "..."
                : decryptedData
              : "Loading"}
          </p>
        </MessageSpan>
        <Time>
          {timeago.format(new Date(chat[0]?.data.timestamp?.toDate()))}
        </Time>
      </TextWrapper>
    </Container>
  );
};

export default SidebarChat;

const Time = styled.small`
  display: flex;
  margin-top: 2px;
  font-size: 0.8rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  border: 1px solid whitesmoke;
  :hover {
    background-color: #e9eaeb;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageSpan = styled.div`
  display: flex;
  margin-top: 5px;
  flex-direction: row;
  > span {
    color: grey;
    margin-right: 5px;
  }
`;
