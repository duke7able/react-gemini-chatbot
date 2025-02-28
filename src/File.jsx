import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  Download,
  PictureAsPdf,
  Image,
  Description,
  TableChart,
  Folder,
} from "@mui/icons-material";
import styled from "@emotion/styled";


const FileAttachment = styled(Box)`
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

const FileIcon = styled(Box)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  color: ${({ filetype }) => getFileTypeColor(filetype)};
`;

const DownloadButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.9);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const getFileIcon = (fileType) => {
  switch (fileType?.toLowerCase()) {
    case "pdf":
      return <PictureAsPdf />;
    case "jpg":
    case "jpeg":
    case "png":
      return <Image />;
    case "doc":
    case "docx":
      return <Description />;
    case "xls":
    case "xlsx":
    case "csv":
      return <TableChart />;
    case "zip":
      return <Folder />;
    default:
      return <Description />;
  }
};

const getFileTypeColor = (fileType) => {
  const colors = {
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
export const FilePreview = ({ file }) => {
    const [downloading, setDownloading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDownload = async (url, fileName) => {
      setDownloading(true);
      setError(null);
  
      try {
        // Method 1: Try direct download first
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank"; // Open in new tab if direct download fails
        link.download = fileName;
        link.rel = "noopener noreferrer"; // Security best practice
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Download failed:", error);
        setError("Download failed. Opening in new tab...");
  
        // Method 2: Fallback to window.open
        window.open(url, "_blank");
      } finally {
        setDownloading(false);
      }
    };
  
    // For image files
    if (file.fileType?.toLowerCase().match(/^(jpg|jpeg|png|gif)$/)) {
      return (
        <Box
          mt={1}
          position="relative"
          sx={{ "&:hover .download-button": { opacity: 1 } }}
        >
          <img
            src={file.fileUrl}
            alt={file.fileName}
            style={{
              maxWidth: "100%",
              borderRadius: "8px",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/path/to/fallback-image.png"; // Add a fallback image
            }}
          />
          <IconButton
            className="download-button"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              opacity: 0,
              transition: "opacity 0.2s",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            }}
            onClick={() => handleDownload(file.fileUrl, file.fileName)}
            disabled={downloading}
          >
            {downloading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <Download />
            )}
          </IconButton>
        </Box>
      );
    }
  
    return (
      <FileAttachment filetype={file.fileType}>
        <FileIcon filetype={file.fileType}>{getFileIcon(file.fileType)}</FileIcon>
        <Box flex={1}>
          <Typography variant="subtitle2" color="white" noWrap>
            {file?.fileName?.slice(0, 15) + "..."}
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
            {file.fileType?.toUpperCase()}
          </Typography>
          {error && (
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)", display: "block" }}
            >
              {error}
            </Typography>
          )}
        </Box>
        <DownloadButton
          size="small"
          onClick={() => handleDownload(file.fileUrl, file.fileName)}
          disabled={downloading}
        >
          {downloading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <Download />
          )}
        </DownloadButton>
      </FileAttachment>
    );
  };
  