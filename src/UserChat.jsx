import { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Paper,
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
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import EmojiPicker from "emoji-picker-react";
import Markdown from "react-markdown";
import { FilePreview } from "./File";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const ChatContainer = styled(Box)`
  width: 100%;
  max-width: 600px;
  height: 700px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background-color: #f8faff;
  position: relative;
  ${(props) =>
    !props.open &&
    `
    display: none; /* Hide the chat container when closed */
  `}
`;

const ChatHeader = styled(Box)`
background: ${(props) => props.themeColor || "purple"};
color: white;
padding: 16px;
display: flex;
align-items: center;
justify-content: space-between;
gap: 12px;
`;

const ChatTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1; /* Allow title to take available space */
`;

const MessagesList = styled(Box)`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #ffffff;
  background-image: ${(props) =>
    props.BackGroundImage && props.BackGroundImage !== ""
      ? `url(${props.BackGroundImage})`
      : `url('/backgroundImage.jpg')`}; 
  background-size: cover; 
  background-position: center;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;



const MessageWrapper = styled(Box)`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  justify-content: ${({ textPosition, isUser }) => {
    if (textPosition === "yes") {
      return isUser ? "flex-start" : "flex-end"; 
    } else {
      return isUser ? "flex-end" : "flex-start"; 
    }
  }};
  margin: 16px 0;
  width: 100%;
  animation: ${fadeIn} 0.3s ease-out;
`;

const MessageBox = styled(Paper)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  max-width: 70%;
  border-radius: ${({ isUser }) =>
    isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px"};
  background: ${({ isUser, themeColor }) =>
    isUser ? themeColor || "purple" : "#ffffff"}; // Corrected background
  color: ${({ isUser }) => (isUser ? "white" : "#374151")};
  box-shadow: ${({ isUser }) =>
    isUser
      ? "0 4px 15px rgba(99, 102, 241, 0.2)"
      : "0 4px 15px rgba(0, 0, 0, 0.05)"};
  animation: ${slideIn} 0.3s ease-out;
`;




const EmojiPickerWrapper = styled(Box)`
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 1000;

  .EmojiPickerReact {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  }
`;

const StyleImage = styled.div`
  width: 70px; /* Adjust the size of the avatar */
  height: 70px; /* Adjust the size of the avatar */
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContent = styled(Box)`
  display: flex;
  flex-direction: ${({ isUser, textPosition }) => {
    if (textPosition === "yes") {
      return isUser ? "row" : "row-reverse";
    } else {
      return isUser ? "row-reverse" : "row";
    }
  }};
  align-items: flex-start;
  gap: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const StyledAvatar = styled(Avatar)`
  width: 38px;
  height: 38px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${({ isUser }) =>
    isUser
      ? "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
      : "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"};
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const RecordingIndicator = styled(Box)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ef4444;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(239, 68, 68, 0.2);
  animation: ${pulseAnimation} 1.5s ease-in-out infinite;
`;

const RecordingDot = styled(Box)`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
`;

const MicButton = styled(IconButton)`
  color: ${(props) => (props.isrecording ? "#ef4444" : "#6366f1")};
  animation: ${(props) => (props.isrecording ? pulseAnimation : "none")} 1.5s
    ease-in-out infinite;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isrecording ? "rgba(239, 68, 68, 0.1)" : "rgba(99, 102, 241, 0.1)"};
  }
`;

const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  gap: 8px;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 25px;
    background-color: #f3f4f6;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: #6366f1;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: #6366f1;
    }
  }
`;

const AttachmentPreview = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9fafb;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 0.3s ease-out;
`;

const ActionButton = styled(IconButton)`
  color: #6366f1;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(99, 102, 241, 0.1);
    transform: scale(1.1);
  }
`;

const TimeStamp = styled(Typography)`
  font-size: 11px;
  color: ${({ isUser }) => (isUser ? "rgba(255, 255, 255, 0.7)" : "#9ca3af")};
  margin-top: 4px;
`;

const Chat = ({
  messages,
  handleMessageBeingSent,
  isLoading,
  Header,
  imageUrl,
  textPosition,
  chatOpen,
  titleOfChatBot,
  DescriptionOfChatbot,
  headerDescription,
  themeColor, 
  BackGroundImage,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [messageText, setMessageText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesListRef = useRef(null);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(chatOpen); 
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  function parseGoogleDriveLink(imageUrl) {
    const driveRegex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessageText((prev) => prev + emojiData.emoji);
  };

  const toggleEmojiPicker = (event) => {
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

      recognition.onresult = (event) => {
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

      recognition.onerror = (event) => {
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
              <StyledImage src={parseGoogleDriveLink(imageUrl)} />
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

        <MessagesList ref={messagesListRef} BackGroundImage={BackGroundImage}>
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
  {titleOfChatBot !== "" ? titleOfChatBot : `👋 Welcome to ${Header}`}
</Typography>

              <Typography variant="body2">
                {DescriptionOfChatbot}
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

                      <TimeStamp isUser={msg.isUser}>{msg.timestamp}</TimeStamp>
                    </Box>
                  </MessageContent>
                </MessageBox>
              </MessageWrapper>
            ))
          )}

          {isLoading && (
            <MessageWrapper isUser={false} textPosition={textPosition}>
              <MessageBox isUser={false} themeColor={themeColor}>
                <MessageContent isUser={false}>
                  <StyledAvatar isUser={false}>AI</StyledAvatar>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
            id="file-upload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <ActionButton component="span">
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
