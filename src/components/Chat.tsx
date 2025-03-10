import { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Popper,
  CircularProgress,
} from "@mui/material";
import {
  Send,
  AttachFile,
  Close,
  InsertEmoticon,
  Mic,
  MicOff,
  Image,
  Description,
  ChatBubble,
  Cancel,
} from "@mui/icons-material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Markdown from "react-markdown";
import { FilePreview } from "./File";
import React from "react";
import { UserMessage } from "./ChatBot";

import {
  ChatContainer,
  ChatHeader,
  MessagesList,
  MessageWrapper,
  MessageBox,
  MessageContent,
  StyledAvatar,
  TimeStamp,
  AttachmentPreview,
  InputContainer,
  StyledTextField,
  ActionButton,
  MicButton,
  RecordingIndicator,
  RecordingDot,
  EmojiPickerWrapper,
  StyledImage,
  ChatTitle,
  StyleImage,
} from "../utils/chatStyle";
import FormComponent, { FormField } from "./FormComponent";
import { sendApiForm } from "../utils/apiFormBackend";

export type ChatProps = {
  Header: string;
  messages: UserMessage[];
  handleMessageBeingSent: (
    messageText: string,
    attachment: File | null
  ) => Promise<void>;
  isLoading: boolean;
  imageUrl?: string;
  textPosition?: boolean;
  chatOpen?: boolean;
  titleOfChatBot?: string;
  descriptionOfChatbot?: string;
  headerDescription?: string;
  themeColor?: string;
  backGroundImage?: string;
  form?: {
    enableFormAt?: number;
    fields?: FormField[];
    submitApiEndPoint?: string;
    submitApiAccessToken?: string;
    submitApiHttpMethod?: "POST" | "GET" | "PUT";
  };
  enableLeadForm?: boolean;
  APIStoreResponseDataEndpoint?: string;
  APIAccessToken?: string;
  APIHttpMethod?: "POST" | "GET" | "PUT";
};

// Speech Recognition type definition
interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
declare const window: IWindow;

const Chat = ({
  messages,
  handleMessageBeingSent,
  isLoading = false,
  Header,
  imageUrl,
  textPosition = false,
  chatOpen = true,
  titleOfChatBot = "",
  descriptionOfChatbot = "",
  headerDescription = "",
  themeColor = "purple",
  backGroundImage = "",
  form,
  enableLeadForm,
  APIStoreResponseDataEndpoint = "",
  APIAccessToken = "",
  APIHttpMethod = "POST",
}: ChatProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [messageText, setMessageText] = useState<string>("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesListRef = useRef<HTMLDivElement | null>(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<HTMLElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(chatOpen);
  const [openForm, setOpenForm] = useState(enableLeadForm);
  const defaultFormConfig = {
    enableFormAt: 3,
    fields: [
      {
        title: "Name",
        label: "Your Name",
        placeholder: "Enter your name",
        type: "text",
        validationRegex: "^[a-zA-Z\\s]*$",
        validationMessage: "Only letters and spaces are allowed",
        required: true,
      },
      {
        title: "email",
        label: "Email",
        placeholder: "Enter your Email",
        type: "text",
        validationRegex: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        validationMessage: "Please enter a valid email address",
        required: true,
      },
      {
        title: "Phone Number",
        label: "number",
        placeholder: "Enter your Phone Number",
        type: "number",
        validationRegex: "^\\d{10}$",
        validationMessage: "Please enter a valid phone number",
        required: false,
      },
      {
        title: "Company Name",
        label: "Company Name",
        placeholder: "Enter your CompanyName",
        type: "text",
        validationRegex: "^[A-Za-z0-9s.,'-]{2,100}$",
        validationMessage: "Please enter a valid company name",
        required: false,
      },
    ],
  };
  const formConfig = {
    enableFormAt: form?.enableFormAt ?? defaultFormConfig.enableFormAt,
    fields: form?.fields ?? defaultFormConfig.fields,
  };
  const handleFormSubmit = (formData: any) => {
    console.log("Form data received in Chat component:", formData);
    localStorage.setItem("data", formData);

    let apiEndpoint = "";
    let apiAccessToken = "";
    let apiHttpMethod = "POST";

    console.log(form?.submitApiEndPoint);
    if (APIStoreResponseDataEndpoint && APIStoreResponseDataEndpoint !== "") {
      apiEndpoint = APIStoreResponseDataEndpoint;
      apiAccessToken = APIAccessToken;
      apiHttpMethod = APIHttpMethod;
    } else if (form?.submitApiEndPoint && form?.submitApiEndPoint !== "") {
      apiEndpoint = form?.submitApiEndPoint;
      apiAccessToken = form?.submitApiAccessToken || APIAccessToken;
      apiHttpMethod = form?.submitApiHttpMethod || APIHttpMethod;
    }

    if (apiEndpoint) {
      sendApiForm(
        apiEndpoint,
        apiAccessToken,
        formData,
        (apiHttpMethod = "POST")
      );
    } else {
      console.warn("No API endpoint provided. Skipping form submission.");
      localStorage.setItem("data", formData);
    }

    setOpenForm(false);
  };
  const completeExchanges = Math.floor(messages.length / 2);
  const shouldDisplayForm = completeExchanges === formConfig.enableFormAt;

  const handleButtonClick = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  function parseGoogleDriveLink(imageUrl: string): string {
    const driveRegex =
      /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;

    const match = imageUrl.match(driveRegex);

    if (match) {
      const fileId = match[1];
      const newImageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
      return newImageUrl;
    } else {
      return imageUrl;
    }
  }

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesListRef.current) {
        messagesListRef.current.scrollTop =
          messagesListRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText && !attachment) return;
    handleMessageBeingSent(messageText, attachment);
    setMessageText("");
    setAttachment(null);
    setShowEmojiPicker(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("Selected file:", file.name, file.size, file.type);
      setAttachment(file);
    } else {
      console.log("No file selected.");
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessageText((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowEmojiPicker(!showEmojiPicker);
    setEmojiAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            setMessageText((prev) => prev + " " + finalTranscript.trim());
            setInterimTranscript("");
          } else {
            interimTranscript += transcript;
            setInterimTranscript(interimTranscript);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <Box>
      {!isChatOpen && (
        <IconButton
          onClick={toggleChat}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            bgcolor: themeColor || "purple",
            color: "white",
            "&:hover": {
              bgcolor: "black",
            },
          }}
        >
          <ChatBubble />
        </IconButton>
      )}

      <ChatContainer open={isChatOpen}>
        <ChatHeader themeColor={themeColor}>
          <ChatTitle>
            <StyleImage>
              <StyledImage src={parseGoogleDriveLink(imageUrl || "")} />
            </StyleImage>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {Header}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {isLoading ? "Thinking..." : headerDescription}
              </Typography>
            </Box>
          </ChatTitle>
          <IconButton onClick={toggleChat} sx={{ color: "white" }}>
            <Cancel />
          </IconButton>
        </ChatHeader>

        {shouldDisplayForm && openForm ? (
          <FormComponent
            form={formConfig}
            shouldDisplayForm={shouldDisplayForm}
            onSubmit={handleFormSubmit}
          />
        ) : (
          <>
            <MessagesList
              ref={messagesListRef}
              backGroundImage={backGroundImage}
            >
              {messages.length === 0 ? (
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    color: "#6b7280",
                    padding: 3,
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {titleOfChatBot !== ""
                      ? titleOfChatBot
                      : `👋 Welcome to ${Header}`}
                  </Typography>

                  <Typography variant="body2">
                    {descriptionOfChatbot}
                  </Typography>
                </Box>
              ) : (
                messages.map((msg, index) => (
                  <MessageWrapper
                    key={index}
                    isUser={msg.isUser}
                    textPosition={textPosition}
                  >
                    <MessageBox isUser={msg.isUser} themeColor={themeColor}>
                      <MessageContent
                        isUser={msg.isUser}
                        textPosition={textPosition}
                      >
                        <StyledAvatar isUser={msg.isUser}>
                          {msg.isUser ? "You" : "AI"}
                        </StyledAvatar>
                        <Box>
                          {msg.type === "attachment" && (
                            <>
                              <FilePreview file={msg} isUser={msg.isUser} />

                              {msg.text && msg.text.trim() !== "" && (
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: msg.isUser ? "white" : "#374151",
                                    wordBreak: "break-word",
                                    mt: 2,
                                  }}
                                >
                                  <Markdown>{msg.text}</Markdown>
                                </Typography>
                              )}
                            </>
                          )}

                          {msg.type === "text" && (
                            <Typography
                              variant="body1"
                              sx={{
                                color: msg.isUser ? "white" : "#374151",
                                wordBreak: "break-word",
                              }}
                            >
                              <Markdown>{msg.text}</Markdown>
                            </Typography>
                          )}

                          <TimeStamp isUser={msg.isUser}>
                            {msg.timestamp}
                          </TimeStamp>
                        </Box>
                      </MessageContent>
                    </MessageBox>
                  </MessageWrapper>
                ))
              )}

              {isLoading && (
                <MessageWrapper isUser={false} textPosition={textPosition}>
                  <MessageBox isUser={false} themeColor={themeColor}>
                    <MessageContent isUser={false} textPosition={textPosition}>
                      <StyledAvatar isUser={false}>AI</StyledAvatar>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CircularProgress size={20} color="primary" />
                        <Typography variant="body1" sx={{ color: "#374151" }}>
                          Thinking...
                        </Typography>
                      </Box>
                    </MessageContent>
                  </MessageBox>
                </MessageWrapper>
              )}

              <div ref={messagesEndRef} />
            </MessagesList>

            {attachment && (
              <AttachmentPreview>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        bgcolor: "rgba(99, 102, 241, 0.1)",
                        borderRadius: "8px",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#6366f1",
                      }}
                    >
                      {attachment.type?.startsWith("image/") ? (
                        <Image />
                      ) : (
                        <Description />
                      )}
                    </Box>
                    <Typography variant="body2" noWrap>
                      {attachment.name}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => setAttachment(null)}>
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              </AttachmentPreview>
            )}

            {isRecording && (
              <RecordingIndicator>
                <RecordingDot />
                Recording...
              </RecordingIndicator>
            )}

            <InputContainer>
              <input
                type="file"
                ref={inputFile}
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload">
                <ActionButton onClick={handleButtonClick}>
                  <AttachFile />
                </ActionButton>
              </label>

              <ActionButton onClick={toggleEmojiPicker}>
                <InsertEmoticon />
              </ActionButton>

              <StyledTextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                size="small"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  endAdornment: interimTranscript && (
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ fontStyle: "italic", mr: 1 }}
                    >
                      {interimTranscript}
                    </Typography>
                  ),
                }}
              />

              <MicButton
                isrecording={isRecording ? 1 : 0}
                onClick={toggleRecording}
              >
                {isRecording ? <MicOff /> : <Mic />}
              </MicButton>

              <ActionButton
                onClick={handleSendMessage}
                disabled={!messageText && !attachment}
              >
                <Send />
              </ActionButton>
            </InputContainer>
          </>
        )}

        {showEmojiPicker && (
          <Popper
            open={showEmojiPicker}
            anchorEl={emojiAnchorEl}
            placement="top-end"
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 10],
                },
              },
            ]}
          >
            <EmojiPickerWrapper>
              <Box
                sx={{
                  position: "absolute",
                  top: -35,
                  right: 10,
                  bgcolor: "white",
                  borderRadius: "50%",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => setShowEmojiPicker(false)}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Box>
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                searchDisabled
                skinTonesDisabled
                width={300}
                height={350}
              />
            </EmojiPickerWrapper>
          </Popper>
        )}
      </ChatContainer>
    </Box>
  );
};

export default Chat;
