import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./Chat.css";
import ChatFeed from "./ChatFeed";
const LiveChat = () => {
  return (
    <ChatEngine
      heigh="100vh"
      projectID="2881e190-d6d7-44f3-9cc1-2a035550b1b2"
      userName="Tu Linh"
      userSecret="281123"
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    />
  );
};

export default LiveChat;
