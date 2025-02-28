import React, { useState } from "react";
import Chat from "./UserChat";
import { Container } from "@mui/material";
import { sendMessageToGemini } from "./ApiRes";

const ChatBot = ({
  apiKey,
  prompt,
  model="gemini-2.0-flash",
  Header = "ChatOrbit",
  temperature = 0.7,
  useContext = false,
  apiMaxOutputTokens = 2048,
  imageUrl = "/chatbotimage.png",
  textPosition = "no",
  chatOpen=true,
  titleOfChatBot="",
  DescriptionOfChatbot="Start a conversation by typing a message below",
  headerDescription="Ready to help",
  themeColor="",
  BackGroundImage=""
}) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleMessageBeingSent = async (messageText, attachment) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    let userMessage;
    if (attachment) {
      userMessage = {
        isUser: true,
        type: "attachment",
        fileName: attachment.name,
        fileType: attachment.name.split(".").pop(),
        fileUrl: URL.createObjectURL(attachment),
        text: messageText,
        timestamp: currentTime,
      };
    } else {
      userMessage = {
        isUser: true,
        type: "text",
        text: messageText,
        timestamp: currentTime,
      };
    }

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      let fileContent = null;

      if (attachment) {
        fileContent = await readFileContent(attachment);
      }
      const messageToSend =
        messageText || (attachment ? `Analyzing file: ${attachment.name}` : "");

      const botResponse = await sendMessageToGemini(
        apiKey,
        model,
        prompt,
        messageToSend,
        updatedMessages,
        fileContent,
        attachment?.name,
        temperature,
        useContext,
        apiMaxOutputTokens
      );

      setMessages([
        ...updatedMessages,
        {
          isUser: false,
          type: "text",
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages([
        ...updatedMessages,
        {
          isUser: false,
          type: "text",
          text: `Error: ${error.message}. Please check your API key and try again.`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to read file content (as a promise)
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(error); // Reject if there's an error
      };

      reader.readAsDataURL(file); // Read as base64 data URL (important for binary files)
      //reader.readAsText(file); // If you only expect TEXT files
    });
  };

  return (
    <Container
    maxWidth={false} // Disable the max-width
    sx={{
      display: "flex",
      justifyContent: "flex-end", 
      alignItems: "flex-start",
      height: "100vh", 
      padding: 3, 
      margin: 0,
      width: "100%", 
    }}
    >
        <Chat
          Header={Header}
          messages={messages}
          handleMessageBeingSent={handleMessageBeingSent}
          isLoading={isLoading}
          imageUrl={imageUrl}
          textPosition={textPosition}
          chatOpen={chatOpen}
          titleOfChatBot={titleOfChatBot}
          DescriptionOfChatbot={DescriptionOfChatbot}
          headerDescription={headerDescription}
          themeColor={themeColor}
          BackGroundImage={BackGroundImage}
        />
    </Container>
  );
};

export default ChatBot;
