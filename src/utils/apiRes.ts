import { UserMessage } from "../components/ChatBot";
import { v4 as uuidv4 } from "uuid";
import { ApiResponsePayload, sendApiResponse } from "./apiBackend";

export type SendMessageToGeminiParams = {
  apiKey: string;
  modelName: string;
  systemPrompt: string;
  userMessage: string;
  previousMessages: UserMessage[];
  fileContent: string | ArrayBuffer | null;
  fileName: string | null;
  temperature: number;
  useContext: boolean;
  apiMaxOutputTokens: number;
  APIStoreResponseDataEndpoint: string;
  APIAccessToken: string;
  APIHttpMethod?: "POST" | "GET" | "PUT";
  approach?: Array<{agent : string ; user : string}>;
};

interface GeminiApiResponse {
  candidates: {
    text: string;
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}
interface Message {
  role: "model" | "user";
  parts: { text: string }[];
}
export async function sendMessageToGemini({
  apiKey,
  modelName,
  systemPrompt,
  userMessage,
  previousMessages,
  fileContent = null,
  fileName = null,
  temperature,
  useContext,
  apiMaxOutputTokens,
  APIStoreResponseDataEndpoint,
  APIAccessToken,
  APIHttpMethod,
  approach
}: SendMessageToGeminiParams) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent`;
  
  let formattedMessages: Message[] = [];
  if (approach) {
    approach.forEach(pair => {
      formattedMessages.push({
        role: "user",
        parts: [{ text: pair.user }],
      });
      formattedMessages.push({
        role: "model",
        parts: [{ text: pair.agent }],
      });
    });
  }
  let userMessageText = userMessage;
  if (fileContent) {
    userMessageText += `\n\nFile Content (${fileName}): ${fileContent}`;
  }

  formattedMessages.push({
    role: "model",
    parts: [{ text: systemPrompt }],
  });
  formattedMessages.push({
    role: "user",
    parts: [{ text: userMessageText }],
  });

  if (useContext) {
    for (let i = 0; i < previousMessages.length; i++) {
      const msg = previousMessages[i];
      if (msg.type === "text") {
        formattedMessages.push({
          role: msg.isUser ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }
    }
  }

  const requestBody = {
    contents: formattedMessages,
    generationConfig: {
      temperature: temperature,
      maxOutputTokens: apiMaxOutputTokens,
    },
  };

  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.error?.message || "Failed to get response from Gemini"
    );
  }

  const data: GeminiApiResponse = await response.json();

  let uuid = localStorage.getItem("userUUID");
  if (!uuid) {
    uuid = uuidv4();
    localStorage.setItem("userUUID", uuid);
  }

  if (APIStoreResponseDataEndpoint && APIStoreResponseDataEndpoint !== "") {
    const apiPayload: ApiResponsePayload = {
      userUUID: uuid,
      userMessage: userMessageText,
      modelMessage: data.candidates[0].content.parts[0].text,
    };

    try {
      await sendApiResponse(
        APIStoreResponseDataEndpoint,
        APIAccessToken,
        apiPayload,
        APIHttpMethod || "POST"
      );
    } catch (error) {
      console.error("Failed to store response data:", error);
    }
  }
  if (
    data.candidates &&
    data.candidates[0] &&
    data.candidates[0].content &&
    data.candidates[0].content.parts
  ) {
    return data;
  } else {
    throw new Error("Unexpected response format from Gemini API");
  }
}
