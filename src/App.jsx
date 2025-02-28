import React from "react";
import ChatBot from "./ChatBot";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY
  const prompt = "You are a helpful AI assistant";
  // const model = "gemini-2.0-flash";
  // const Header = "ChatOrbit";
  // const geminiTemperature = 0.7;
  // const useContext = true;
  // const chatOpen = true
  // const apiMaxOutputTokens = 3000
  // const imageUrl = '/chatbotimage.png'
  // const textPosition = "no"
  // const titleOfChatBot = "Hello come here"
  // const DescriptionOfChatbot ="hello"
  // const headerDescription = "title"
  // const themeColor = "green"
  // const BackGroundImage = "/chatbotimage.png"
  return (
    <ChatBot
      apiKey={apiKey}
      prompt={prompt}
      // model={model}
      // Header={Header}
      // temperature={geminiTemperature}
      // useContext={useContext}
      // apiMaxOutputTokens={apiMaxOutputTokens}
      // chatOpen={chatOpen}
      // imageUrl={imageUrl}
      // textPosition={textPosition}
      // titleOfChatBot={titleOfChatBot}
      // DescriptionOfChatbot={DescriptionOfChatbot}
      // headerDescription={headerDescription}
      // themeColor={themeColor}
      // BackGroundImage={BackGroundImage}
    />
  );
}

export default App;
