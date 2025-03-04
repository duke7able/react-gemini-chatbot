import styled from "@emotion/styled";
import { Box, IconButton } from "@mui/material";
import { FileType } from "../components/File";

// **Function to Get File Type Colors**
const getFileTypeColor = (fileType: string) => {
    const colors: Record<string, string> = {
        pdf: "#f87171",
        doc: "#60a5fa",
        docx: "#60a5fa",
        xls: "#4ade80",
        xlsx: "#4ade80",
        csv: "#4ade80",
        jpg: "#f59e0b",
        jpeg: "#f59e0b",
        png: "#f59e0b",
        zip: "#8b5cf6",
        default: "#6366f1",
    };
    return colors[fileType?.toLowerCase()] || colors.default;
};

// **File Attachment Container**
export const FileAttachment = styled(Box) <{ filetype: FileType }>`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${({ filetype }) => getFileTypeColor(filetype)};
  border-radius: 8px;
  margin-top: 8px;
  gap: 12px;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// **File Icon Styling**
export const FileIcon = styled(Box) <{ filetype: string }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  color: ${({ filetype }) => getFileTypeColor(filetype)};
`;

// **Download Button Styling**
export const DownloadButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.9);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
