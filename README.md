# React Gemini Chatbot

A modern, customizable React chatbot component that integrates with Google's Gemini AI API. This package provides a complete UI solution with voice input, emoji picker, file attachments, and markdown rendering capabilities.

## Badges

[![NPM Version](https://img.shields.io/npm/v/react-gemini-chatbot)](https://www.npmjs.com/package/react-gemini-chatbot)
[![License](https://img.shields.io/npm/l/react-gemini-chatbot)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Status-Success-brightgreen)](https://github.com/duke7able/react-gemini-chatbot)
[![GitHub Stars](https://img.shields.io/github/stars/duke7able/react-gemini-chatbot?style=social)](https://github.com/duke7able/react-gemini-chatbot)
[![React Version](https://img.shields.io/npm/dependency-version/react-gemini-chatbot/peer/react)](https://www.npmjs.com/package/react)[![Node Version](https://img.shields.io/static/v1?label=Node&message=v18&color=green)](https://nodejs.org/)

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
  <img src="/public/newchatbot.gif" alt="React Gemini Chatbot" width="35%" height="50%" />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="/public/newleadform.gif" alt="lead form video" width="35%" height="50%"/>
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

*Note:* This might take longer it would be optimised in upcoming builds 

## Prerequisites

- React 16.8+ (Hooks support)
- A Google Gemini API key

## Usage

### Basic Implementation

```tsx
import {ChatBot} from "react-gemini-chatbot";

function App() {
  return (
    <main>
      <ChatBot apiKey={"--gemini api key--"} prompt={"hello gemini ai"} />
    </main>
  )
}

export default App;
```

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


## Props

| Prop | Type | Default | Required | Description |
| ---------------------- | ------- | ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `APIHttpMethod` | string | `"POST"` | _No_ | Configure the HTTP method to use for the API request. Options: `"POST"`, `"PUT"`, or `"GET"`. The default method is `"POST"`. |
| `APIStoreResponseDataEndpoint` | string | `""` | _No_ | Add your endpoint url of backend to store every conversation of chatbot in database (e.g., https://localhost:5173/route). |
| `APIAccessToken` | string | `""` | _No_ | In your endpoint URL of backend, if there is any authorization, you can share your bearer token. |
| `apiMaxOutputTokens` | number | `2048` | _No_ | Maximum tokens allowed in the API response. |
| `apiKey` | string | `""` | _Yes_ | Your Google Gemini API key. |
| `approach` | Array | `[]` | _No_ | The `approach` array is used to prime the Large Language Model (LLM) or Chatbot with a specific conversation style, persona, or expected dialogue flow. Each object in the array represents a single turn in a conversation, defining what the `user` would say and the corresponding, desired response from the `agent` (the LLM/Chatbot). |
| `backGroundImage` | string | `"https://img.freepik.com/free-vector/light-grey-dots-background_78370-2583.jpg?ga=GA1.1.1236369542.1738934698&semt=ais_hybrid"` | _No_ | To set your own background image, pass the image URL or path as a string (e.g., `"https://placehold.co/600x400"`). |
| `chatOpen` | boolean | `true` | _No_ | Controls the visibility of the chat window (open or closed). |
| `chatBotHeight` | string | `"450px"` | _No_ | If you want to change the height of chatbot you have to pass the value eg-("450px")|
| `chatBotWeight` | string | `"700px"` | _No_ | If you want to change the wieght of chatbot you have to pass the value eg-("700px")|
| `descriptionOfChatbot` | string | `"Start a conversation by typing a message below"` | _No_ | To display your own description of the chatbot, pass a value as a string. |
| `enableLeadform` | boolean | `"false"` | _No_ | Set to `true` to enable the LeadForm so users can fill it. If `false`, the form is disabled. |
| `goodFormatting` | boolean | `true` | _No_ | `goodFormatting` set to true, adds instructions for well-structured, readable responses with appropriate formatting. |
| `leadFormHeader` | string | `"Please complete the form."` | _No_ | If you want to change the header text of leadform you have to pass the value as string.|
| `leadFormDescription` | string | `"Fill out the information below to continue the conversation."` | _No_ | If you want to change the description text of leadform you have to pass the value as string.|
| `leadFormButtonText` | string | `"Submit"` | _No_ | If you want to change the Button text of leadform you have to pass the value as string.|
| `header` | string | `"ChatOrbit"` | _No_ | To display your own chatbot header, pass a value as a string. |
| `headerDescription` | string | `"Ready to help"` | _No_ | To display your own header description for the chatbot, pass a value as a string. |
| `imageUrl` | string | `"https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?ga=GA1.1.1236369542.1738934698&semt=ais_hybrid"` | _No_ | URL for the chatbot's avatar image. |
| `leadForm` | JSON | `{}` | _No_ | The configuration object for the lead form fields. You can customize this object to add/remove fields and define their properties. If not provided, default fields (name, email, phone number, and company name) will be used. |
| `model` | string | `gemini-1.5-flash` | _No_ | Gemini model to use (e.g., "gemini-1.5-flash"). |
| `prompt` | string | `""` | _Yes_ | System prompt to define the chatbot's behavior. |
| `temperature` | number | `0.7` | _No_ | Controls the randomness of the responses (0.0-1.0). |
| `textPosition` | string | `false` | _No_ | By default, the user’s text is displayed on the right side. To change the alignment of the user's text to the left side and AI response to the right, pass true. |
| `titleOfChatBot` | string | `"👋 Welcome to ChatOrbit"` | _No_ | To display your own Title of the chatbot, pass a value as a string. |
| `themeColor` | string | `"purple"` | _No_ | To set your own color theme for the chatbot, pass a color name or hex code as a string (e.g., `"red"`, `"#FF5733"`). |
| `tone` | string | `"formal"` | _No_ | If specified, instructs the model to respond in the requested tone. |
| `useContext` | boolean | `false` | _No_ | Whether to maintain conversation context. |
| `useEmoji` | boolean | `false` | _No_ | When set to true, instructs the model to include appropriate emojis in responses. |

# Backend Api To Store Data

- **`APIStoreResponseDataEndpoint`**: This is the URL of the backend where the chatbot conversation should be stored. The URL should point to an API route that can accept a `POST`, `PUT`, or `GET` request. If your backend requires authorization, you can provide the `APIAccessToken` to authenticate the request.
  
- **`APIAccessToken`**: If your backend requires authentication, this parameter will store the Bearer token that should be included in the request's authorization header. This is optional and should only be set if your API requires it.

- **`APIHttpMethod`**: This variable specifies the HTTP method used for the request. It can be set to:
    - `"POST"`: Sends the data as JSON in the request body (default method).
    - `"PUT"`: Sends the data as JSON in the request body.
    - `"GET"`: Sends the data as query parameters in the URL.

# LeadForm Feature

The LeadForm feature allows you to create a customizable form that can be displayed on your website. The form can include various fields, and you can configure it to submit data to a specified API endpoint.

## Configuration Options

### 1. `enableLeadform`
- **Type:** `boolean`
- **Default Value:** `"false"`
- **Required:** No
- **Description:** 
  - Set this to `true` to enable the LeadForm so users can fill it out.
  - Set this to `false` to disable the form.

### 2. `leadForm`
- **Type:** `JSON`
- **Required:** No
- **Description:** 
  - The `leadForm` object contains the fields and configurations for the form.
  - If you do not provide any `leadForm`, the form will default to the name, email, phone number, and company name fields.
  - You can customize the form by adding or removing fields in the `fields` array.

### JSON Structure for `leadForm`

```
const leadForm = {
  "enableFormAt": 3, // optional 
  "fields": [ // optional
    {
      "title": "Company Name",
      "placeholder": "Enter your Company Name",
      "type": "text",
      "validationMessage": "Please enter a valid company name",
      "required": false
    },
    {
      "title": "Country of Operation",
      "placeholder": "Select your Country",
      "type": "dropdown",
      "inputOptions": ["USA", "Canada", "UK", "Australia", "India"],
      "validationMessage": "Please select a country",
      "required": false
    },
    {
      "title": "Select Gender",
      "placeholder": "",
      "type": "radio",
      "inputOptions": ["Male", "Female", "other"],
      "validationMessage": "Please select your gender",
      "required": true
    },
    {
      "title": "Select your interest",
      "placeholder": "",
      "type": "checkbox",
      "inputOptions": ["Coding", "music","travel", "other"],
      "validationMessage": "Please select your gender",
      "required": true
    },
  ],
  "submitApiEndPoint": "http://localhost:3000/data",// optional
  "submitApiAccessToken": "njenjkfje", // optional
  "submitApiHttpMethod": "PUT" // optional
};
```

# Approach Feature

The `approach` feature allows users to set a **zero-shot** approach for the chatbot or language model. In this case, the model is primed with a set of example interactions, enabling it to generate responses based on the patterns in the examples, even when no additional context is provided. However, for some use cases, a **one-shot** or **few-shot** approach might produce output that is more closely aligned with user expectations, especially when more detailed context or instruction is required.

For more details, refer to the [Gemini text generation docs](https://ai.google.dev/gemini-api/docs/text-generation?lang=python#:~:text=In%20this%20case%2C%20the%20prompt%20("Explain%20how%20AI%20works")%20doesn't%20include%20any%20output%20examples%2C%20system%20instructions%2C%20or%20formatting%20information.).

**Approach Array of JSON Example:**

```
const approach = [
    {
      user: "Do you have any listings for homes with a pool?",
      agent: "Yes, we have several homes with swimming pools available! Could you please let me know your preferred location and budget? I'd be happy to share some options with you."
    },
    {
      user: "How do I know if I can get approved for a mortgage?",
      agent: "Great question! Mortgage approval usually depends on factors like your credit score, income, debt-to-income ratio, and the size of your down payment. I can connect you with a mortgage lender who can give you a clear idea of your loan eligibility. Would you like me to do that?"
    },
    {
      user: "Can you help me find a property for investment purposes?",
      agent: "Certainly! Investment properties can generate great returns if chosen wisely. Are you looking for residential or commercial properties? Also, do you have a target location or budget in mind?"
    }
  ];
```

## Features in Detail

### Voice Input

The chatbot integrates speech recognition for voice-to-text input:

- Click the microphone icon to start recording
- Speak your message
- Click the microphone icon again to stop recording

### ⚠️ File Attachments

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
