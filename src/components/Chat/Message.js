import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../assets/firebase";

const Message = ({ data }) => {
  // console.log(data);
  return (
    <MessageContainer
      sender={data.username === "Releaf Support" ? `true` : `false`}
    >
      <MessagePhoto
        src={data?.photo}
        sender={"Releaf Suppot" === data.displayName ? `true` : `false`}
      />
      <p>{data.message}</p>
      <small>{new Date(data.timestamp?.toDate()).toLocaleString()}</small>
    </MessageContainer>
  );
};

export default Message;

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
