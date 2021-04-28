import React from "react";
import styled from "styled-components";
import * as FiIcons from "react-icons/fi";
import { auth } from "../../assets/firebase";
const SidebarMenu = () => {
  return (
    <>
      <SidebarLink onClick={() => auth.signOut()}>
        <div>
          <FiIcons.FiLogOut />
          <SidebarLabel>Logout</SidebarLabel>
        </div>
      </SidebarLink>
    </>
  );
};

export default SidebarMenu;

const SidebarLink = styled.div`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  text-decoration: none;
  height: 60px;
  font-size: 18px;
  &:hover {
    background: #039be5;
    border-left: 4px solid #fefefe;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;
