import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
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


interface StyledProps {
  isUser?: boolean;
  isrecording?: number;
  themeColor?: string;
  textPosition?: "yes" | "no";
  BackGroundImage?: string;
  open?: boolean;
}

// Styled Components with TypeScript
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const slideIn = keyframes`
  from { transform: translateX(20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

export const ChatContainer = styled(Box) <StyledProps>`
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

export const ChatHeader = styled(Box) <StyledProps>`
  background: ${(props) => props.themeColor || "purple"};
  color: white;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ChatTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1; /* Allow title to take available space */
`;

export const MessagesList = styled(Box) <StyledProps>`
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

export const MessageWrapper = styled(Box) <StyledProps>`
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

export const MessageBox = styled(Paper) <StyledProps>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  max-width: 70%;
  border-radius: ${({ isUser }) =>
    isUser ? "20px 20px 4px 20px" : "20px 20px 20px 4px"};
  background: ${({ isUser, themeColor }) =>
    isUser ? themeColor || "purple" : "#ffffff"};
  color: ${({ isUser }) => (isUser ? "white" : "#374151")};
  box-shadow: ${({ isUser }) =>
    isUser
      ? "0 4px 15px rgba(99, 102, 241, 0.2)"
      : "0 4px 15px rgba(0, 0, 0, 0.05)"};
  animation: ${slideIn} 0.3s ease-out;
`;

export const EmojiPickerWrapper = styled(Box)`
  position: absolute;
  bottom: 80px;
  right: 20px;
  z-index: 1000;

  .EmojiPickerReact {
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  }
`;

export const StyleImage = styled.div`
  width: 70px; /* Adjust the size of the avatar */
  height: 70px; /* Adjust the size of the avatar */
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MessageContent = styled(Box) <StyledProps>`
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

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledAvatar = styled(Avatar) <StyledProps>`
  width: 38px;
  height: 38px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: ${({ isUser }) =>
    isUser
      ? "linear-gradient(135deg, #34d399 0%, #10b981 100%)"
      : "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)"};
`;

export const pulseAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

export const RecordingIndicator = styled(Box)`
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

export const RecordingDot = styled(Box)`
  width: 8px;
  height: 8px;
  background-color: white;
  border-radius: 50%;
`;

export const MicButton = styled(IconButton) <StyledProps>`
  color: ${(props) => (props.isrecording ? "#ef4444" : "#6366f1")};
  animation: ${(props) => (props.isrecording ? pulseAnimation : "none")} 1.5s
    ease-in-out infinite;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
    props.isrecording ? "rgba(239, 68, 68, 0.1)" : "rgba(99, 102, 241, 0.1)"};
  }
`;

export const InputContainer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  gap: 8px;
`;

export const StyledTextField = styled(TextField)`
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

export const AttachmentPreview = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: #f9fafb;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ActionButton = styled(IconButton)`
  color: #6366f1;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(99, 102, 241, 0.1);
    transform: scale(1.1);
  }
`;

export const TimeStamp = styled(Typography) <StyledProps>`
  font-size: 11px;
  color: ${({ isUser }) => (isUser ? "rgba(255, 255, 255, 0.7)" : "#9ca3af")};
  margin-top: 4px;
`;