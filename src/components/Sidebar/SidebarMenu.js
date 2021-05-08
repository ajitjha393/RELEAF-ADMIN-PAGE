import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarMenu = ({ item, isUser, showSiderbar }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        isUser={isUser}
      >
        <div onClick={showSiderbar}>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => (
          <DropDownLink to={item.path} key={index}>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </DropDownLink>
        ))}
    </>
  );
};

export default SidebarMenu;

const SidebarLink = styled(Link)`
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
const DropDownLink = styled(Link)`
  background: #37b0f7;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  list-style: none;
  text-decoration: none;
  color: #f5f5f5;
  font-size: 15px;
  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;
