import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GiIcons from "react-icons/gi";
import * as GoIcons from "react-icons/go";

export const SidebarData = [
  {
    title: "Overview",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  // {
  //   title: "Reports",
  //   path: "/user/reports",
  //   icon: <IoIcons.IoIosPaper />,
  // },
  {
    title: "Experts Approval",
    path: "/experts",
    icon: <GoIcons.GoVerified />,
  },
  {
    title: "Mindfulness",
    path: "/meditation",
    icon: <GiIcons.GiMeditation />,
  },
  {
    title: "Chatroom",
    path: "/chatroom",
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
