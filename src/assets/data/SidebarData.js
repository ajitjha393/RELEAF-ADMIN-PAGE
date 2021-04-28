import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
// import * as FiIcons from 'react-icons/fi'

export const SidebarData = [
  {
    title: "Overview",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Reports",
    path: "/user/reports",
    icon: <IoIcons.IoIosPaper />,
  },
  {
    title: "Mindfulness",
    path: "/experts",
    icon: <GiIcons.GiMeditation />,
  },
  {
    title: "Chatroom",
    path: "/user/chatroom",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaEnvelopeOpenText />,
  },
  {
    title: "Support",
    path: "/support",
    icon: <IoIcons.IoMdHelpCircle />,
  },
];
