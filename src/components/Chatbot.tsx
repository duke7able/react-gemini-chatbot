import { useState } from "react";
import { Container } from "@mui/material";
import { sendMessageToGemini } from "../utils/apiRes";
import { FileType } from "./File";
import Chat from "./Chat";
import React from "react";
import { FormField } from "./FormComponent";

type ChatbotProps = {
  apiKey: string;
  prompt: string;
  model?: string;
  Header?: string;
  temperature?: number;
  useContext?: boolean;
  apiMaxOutputTokens?: number;
  imageUrl?: string;
  textPosition?: boolean;
  chatOpen?: boolean;
  titleOfChatBot?: string;
  descriptionOfChatbot?: string;
  headerDescription?: string;
  themeColor?: string;
  backGroundImage?: string;
  APIStoreResponseDataEndpoint?: string;
  APIAccessToken?: string;
  APIHttpMethod?: "POST" | "GET" | "PUT";
  leadForm?: {
    enableFormAt?: number;
    fields?: FormField[];
    submitApiEndPoint?: string;
    submitApiAccessToken?: string;
    submitApiHttpMethod?: "POST" | "GET" | "PUT";
  };
  enableLeadForm?: boolean;
};

export type UserMessage = {
  isUser: boolean;
  type: "attachment" | "text";
  fileName?: string;
  fileType?: FileType;
  fileUrl?: string;
  text: string;
  timestamp: string;
};

function ChatBot({
  apiKey,
  prompt,
  model = "gemini-2.0-flash",
  Header = "ChatOrbit",
  temperature = 0.7,
  useContext = false,
  apiMaxOutputTokens = 2048,
  imageUrl = "data:image/png;base64,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",
  textPosition = false,
  chatOpen = true,
  titleOfChatBot = "",
  descriptionOfChatbot = "Start a conversation by typing a message below",
  headerDescription = "Ready to help",
  themeColor = "",
  backGroundImage = "",
  APIStoreResponseDataEndpoint = "",
  APIAccessToken = "",
  APIHttpMethod = "POST",
  leadForm,
  enableLeadForm,
}: ChatbotProps) {
  // all states
  const [messages, setMessages] = useState<UserMessage[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handler function
  const handleMessageBingSend = async (
    messageText: string,
    attachment: File | null
  ) => {
    let userMessage: UserMessage;
    if (attachment) {
      userMessage = {
        isUser: true,
        type: "attachment",
        fileName: attachment.name,
        fileType: attachment.type as FileType,
        fileUrl: URL.createObjectURL(attachment),
        text: messageText,
        timestamp: new Date().toLocaleString(),
      };
    } else {
      userMessage = {
        isUser: true,
        type: "text",
        text: messageText,
        timestamp: new Date().toLocaleString(),
      };
    }

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      let fileContent: string | ArrayBuffer | null = null;

      if (attachment) {
        fileContent = await readFileContent(attachment);
      }

      const messageToSend =
        messageText || (attachment ? `Analyzing file: ${attachment.name}` : "");

      const botResponse = await sendMessageToGemini({
        apiKey,
        modelName: model,
        systemPrompt: prompt,
        userMessage: messageToSend,
        previousMessages: updatedMessages,
        fileContent,
        fileName: attachment?.name ?? null,
        temperature,
        useContext,
        apiMaxOutputTokens,
        APIStoreResponseDataEndpoint,
        APIAccessToken,
        APIHttpMethod,
      });

      console.log(botResponse.candidates[0].content.parts[0].text);

      setMessages([
        ...updatedMessages,
        {
          isUser: false,
          type: "text",
          text: botResponse.candidates[0].content.parts[0].text,
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } catch (err: any) {
      console.log(err);
      setMessages([
        ...updatedMessages,
        {
          isUser: false,
          type: "text",
          text: `Sorry, something went wrong. Please try again.  Error: ${
            err.message || "Unknown error"
          }`,
          timestamp: new Date().toLocaleString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // helper function
  const readFileContent = (
    file: File
  ): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        resolve(e.target?.result ?? null);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Container
      maxWidth={false}
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
        messages={messages}
        isLoading={isLoading}
        handleMessageBeingSent={handleMessageBingSend}
        imageUrl={imageUrl}
        textPosition={textPosition}
        chatOpen={chatOpen}
        titleOfChatBot={titleOfChatBot}
        descriptionOfChatbot={descriptionOfChatbot}
        headerDescription={headerDescription}
        themeColor={themeColor}
        backGroundImage={backGroundImage}
        Header={Header}
        form={leadForm}
        enableLeadForm={enableLeadForm}
        APIStoreResponseDataEndpoint={APIStoreResponseDataEndpoint}
        APIAccessToken={APIAccessToken}
        APIHttpMethod={APIHttpMethod}
      />
    </Container>
  );
}

export { ChatBot };
