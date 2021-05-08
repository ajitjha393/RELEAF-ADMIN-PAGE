import React from "react";
import { Avatar } from "@material-ui/core";
import { forwardRef } from "react";
import styled from "styled-components";
import CryptoJS from "crypto-js";

const ChatroomMessage = forwardRef(
  ({ id, contents: { timestamp, message, photoURL, username } }, ref) => {
    var bytes = CryptoJS.AES.decrypt(
      message,
      process.env.REACT_APP_CHAT_SECRET_KEY
    );
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return (
      <MessageContainer
        ref={ref}
        sender={"Releaf Support" === username ? true : false}
      >
        <MessagePhoto
          src={photoURL}
          alt={username[0]}
          sender={"Releaf Support" === username ? true : false}
        />
        {console.log(username)}
        <p>{decryptedData}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </MessageContainer>
    );
  }
);

export default ChatroomMessage;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  justify-content: space-between;
  margin: 15px;
  margin-left: ${({ sender }) => (sender ? "auto" : "none")};
  > p {
    background-color: ${({ sender }) => (sender ? "#3cabfa" : "#f3f3f5")};
    color: ${({ sender }) => (sender ? "white" : "black")};
    font-size: medium;
    padding: 15px;
    border-radius: 20px;
    margin: 10px;
    margin-right: auto;
  }
  > small {
    color: gray;
    position: absolute;
    font-size: 8px;
    bottom: -5px;
    right: 0;
  }
`;

const MessagePhoto = styled(Avatar)`
  order: ${({ sender }) => (sender ? 1 : 0)};
  margin: ${({ sender }) => (sender ? "15px" : null)};
`;
