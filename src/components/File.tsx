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
import {
    FileAttachment,
    FileIcon,
    DownloadButton,
} from '../utils/fileStyle';
import React from "react";
import { UserMessage } from "./ChatBot";

// **File Type Definition**
export type FileType = "pdf" | "doc" | "docx" | "xls" | "xlsx" | "csv" | "jpg" | "jpeg" | "png" | "zip" | "default";

// **File Data Interface**
// export interface FileData {
//     fileType: FileType;
//     fileName: string;
//     fileUrl: string;
// }

// **Props for FilePreview Component**
interface FilePreviewProps {
    file: UserMessage;
    isUser: boolean;
}

// **Get File Icon Based on Type**
const getFileIcon = (fileType: string) => {
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

// **Main FilePreview Component**
export const FilePreview: React.FC<FilePreviewProps> = ({ file, isUser }) => {
    const [downloading, setDownloading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleDownload = async (url: string, fileName: string) => {
        setDownloading(true);
        setError(null);

        try {
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.download = fileName;
            link.rel = "noopener noreferrer";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed:", error);
            setError("Download failed. Opening in new tab...");
            window.open(url, "_blank");
        } finally {
            setDownloading(false);
        }
    };

    // **Image Preview**
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
                        border: isUser ? "2px solid #34d399" : "2px solid #60a5fa",
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = "/fallback-image.png";
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
                    onClick={() => handleDownload(file.fileUrl ?? '', file.fileName ?? '')}
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

    // **Other File Types**
    return (
        <FileAttachment filetype={file.fileType || 'default'}>
            <FileIcon filetype={file.fileType || 'default'}>{getFileIcon(file.fileType || 'default')}</FileIcon>
            <Box flex={1}>
                <Typography variant="subtitle2" color="white" noWrap>
                    {(file.fileName?.length ?? 0) > 15 ? file.fileName?.slice(0, 15) + "..." : file.fileName ?? ""}
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
                onClick={() => handleDownload(file.fileUrl ?? '', file.fileName ?? '')}
                disabled={downloading}
            >
                {downloading ? <CircularProgress size={24} color="inherit" /> : <Download />}
            </DownloadButton>
        </FileAttachment>
    );
};
