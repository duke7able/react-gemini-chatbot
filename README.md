# React Gemini Chatbot

A modern, customizable React chatbot component that integrates with Google's Gemini AI API. This package provides a complete UI solution with voice input, emoji picker, file attachments, and markdown rendering capabilities.

## Badges

[![NPM Version](https://img.shields.io/npm/v/react-gemini-chatbot)](https://www.npmjs.com/package/react-gemini-chatbot)
[![License](https://img.shields.io/npm/l/react-gemini-chatbot)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/workflow/status/duke7able/react-gemini-chatbot/CI)](https://github.com/duke7able/react-gemini-chatbot/actions)
[![GitHub Stars](https://img.shields.io/github/stars/duke7able/react-gemini-chatbot?style=social)](https://github.com/duke7able/react-gemini-chatbot)
[![React Version](https://img.shields.io/npm/dependency-version/react-gemini-chatbot/peer/react)](https://www.npmjs.com/package/react)[![Vite Version](https://img.shields.io/npm/dependency-version/react-gemini-chatbot/dev/vite)](https://vitejs.dev/)

### Style & Framework

[![MUI](https://img.shields.io/badge/MUI-%40mui%2Fmaterial-007FFF)](https://mui.com/)
[![Emotion](https://img.shields.io/badge/Emotion-%40emotion%2Freact-FF2A00)](https://emotion.sh/docs/introduction)

### Code Quality & Tools

[![ESLint](https://img.shields.io/badge/ESLint-1A2B34?logo=eslint&logoColor=4B32C3)](https://eslint.org/)
[![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=F7B93E)](https://prettier.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=646CFF)](https://vitejs.dev/)

### Other Dependencies

[![Emoji Picker](https://img.shields.io/badge/Emoji%20Picker-Emoji--picker--react-42D88B)](https://www.npmjs.com/package/emoji-picker-react)
[![React Markdown](https://img.shields.io/badge/React%20Markdown-react--markdown-61DAFB)](https://www.npmjs.com/package/react-markdown)


### Demo

<p align="center">
  <img src="/public/chatbot.gif" alt="React Gemini Chatbot" width="80%" />
</p>

## Features

- 🤖 Integration with Google Gemini AI API
- 💬 Modern chat interface with animations
- 🎨 Beautiful UI with gradient backgrounds
- 🎙️ Voice input support (speech-to-text)
- 📎 File attachment support
- 😊 Emoji picker integration
- ✏️ Markdown rendering for formatted messages
- 📱 Responsive design
- 🌙 Expandable/collapsible chat window
- ⏳ Loading indicators for AI responses


## Installation

```bash
npm install react-gemini-chatbot
# or
yarn add react-gemini-chatbot
```

## Prerequisites

- React 16.8+ (Hooks support)
- A Google Gemini API key

## Usage

### Basic Implementation

```tsx
import ChatBot from "react-gemini-chatbot";

function App() {
  return (
    <main style={{ height: "100vh" }}>
      <Chatbot apiKey={"--gemini api key--"} prompt={"hello gemini ai"} />
    </main>
  )
}

export default App;
```

## Props

| Prop                   | Type    | Default            | Required | Description                                                                                                          |
| ---------------------- | ------- | ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `apiKey`               | string  | `""`               | _Yes_    | Your Google Gemini API key.                                                                                          |
| `prompt`               | string  | `""`               | _Yes_    | System prompt to define the chatbot's behavior.                                                                      |
| `model`                | string  | `gemini-1.5-flash` | _No_     | Gemini model to use (e.g., "gemini-1.5-flash").                                                                      |
| `TitleOfChatBot`       | string  | `"ChatBot"`        | _No_     | Display name for the chatbot.                                                                                        |
| `temperature`          | number  | `0.7`              | _No_     | Controls the randomness of the responses (0.0-1.0).                                                                  |
| `useContext`           | boolean | `false`            | _No_     | Whether to maintain conversation context.                                                                            |
| `apiMaxOutputTokens`   | number  | `2048`             | _No_     | Maximum tokens allowed in the API response.                                                                          |
| `chatOpen`             | boolean | `true`             | _No_     | Controls the visibility of the chat window (open or closed).                                                         |
| `imageUrl`             | string  | `"https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?ga=GA1.1.1236369542.1738934698&semt=ais_hybrid"`  | _No_     | URL for the chatbot's avatar image.                                                                                  |
| `textPosition`         | string  | `"no"`             | _No_     | By default, the user’s text is displayed on the right side. To change the alignment of the user's text to the left side and ai response to right, pass "yes"     |
| `Header`       | string  | `"ChatOrbit"`      | _No_     | To display your own chatbot Header, pass a value as a string.                                                         |
| `headerDescription`    | string  | `"Ready to help"`  | _No_     | To display your own header description for the chatbot, pass a value as a string.                                    |
| `titleOfChatBot` | string  | `"👋 Welcome to ChatOrbit"`             | _No_     | To display your own Title of the chatbot, pass a value as a string.                                            |
| `DescriptionOfChatbot` | string  | `"Start a conversation by typing a message below"`             | _No_     | To display your own description of the chatbot, pass a value as a string.                                            |
| `themeColor`          | string  | `"purple"`             | _No_     | To set your own color theme for the chatbot, pass a color name or hex code as a string (e.g., `"red"`, `"#FF5733"`). |
| `BackGroundImage`      | string  | `"https://img.freepik.com/free-vector/light-grey-dots-background_78370-2583.jpg?ga=GA1.1.1236369542.1738934698&semt=ais_hybrid"`             | _No_     | To set your own background image, pass the image URL or path as a string (e.g., `"https://placehold.co/600x400"`).   |


# Setting Up Google Gemini API Key

To get started with Google Gemini API, you'll need to generate an API key. Follow the steps below to create the key and secure it for your project.

### 1. **Obtain the API Key**

To generate a Google Gemini API key, follow the official guide from Merge Dev. You can access the instructions here: [Google Gemini API Key Documentation](https://www.merge.dev/blog/gemini-api-key).

This documentation will walk you through the process of creating and managing your API key.

### Restrict API Key (Optional but recommended)

- After copying the API key, you can click **Restrict Key** to limit its usage.
- You can restrict the API key to specific IP addresses, referrers, or HTTP methods to secure your API key further.

### Install Dependencies in Your Project

Make sure you have the required dependencies installed in your project.


## Features in Detail

### Voice Input

The chatbot integrates speech recognition for voice-to-text input:

- Click the microphone icon to start recording
- Speak your message
- Click the microphone icon again to stop recording

### ⚠️File Attachments

Users can attach files to their messages:

- Click the attachment icon
- Select a file from their device
- The file send by the user get the correct response based on your model you are using
- Files are sent as base64-encoded data to the API
- Although the **gemini-1.5-flash** model is intended to support images, users may face issues with image processing. If you're uploading an image, be prepared for potential errors. For PDFs, the model works as expected without issues.
- **PDFs**: Works flawlessly. The model can extract and analyze text, metadata, and other content from PDF files.
- **Images**: Currently, images may result in an error when uploaded due to limitations in the model. While the **gemini-1.5-flash** model is intended to handle images, users may encounter issues with image uploads.

### Emoji Picker

The chatbot includes an emoji picker:

- Click the emoji icon to open the picker
- Select an emoji to insert it into the message

### Markdown Support

The chatbot renders messages with Markdown support:

- Format text with bold, italic, lists, etc.
- API responses can include formatted text
- Code blocks are properly displayed with syntax highlighting

## Styling

The component uses MUI (Material-UI) and Emotion for styling with:

- Smooth animations for messages and UI elements
- Gradient backgrounds
- Customizable avatars
- Responsive design for all screen sizes

## Dependencies

The package relies on the following dependencies:

- React
- Material-UI (MUI)
- Emotion (for styled components)
- emoji-picker-react
- react-markdown

## ⚠️ Important Note

**This package is not production-ready yet. The current implementation exposes your Google Gemini API key in the frontend, which is not secure for production environments. Please do not use this in production unless the key is properly secured (e.g., through a proxy or server-side authentication).**

**In the current version, the API key is passed directly to the frontend, which makes it vulnerable to misuse. A secure solution will be implemented in future versions.**

## Browser Compatibility

The voice input feature uses the Web Speech API, which may not be supported in all browsers. The component gracefully handles this by disabling the feature when not supported.
For a comprehensive list of supported browsers and versions, visit the following link: 
- [Web Speech API Browser Compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility)


## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
