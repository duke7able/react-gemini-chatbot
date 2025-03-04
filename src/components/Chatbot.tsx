import { useState } from 'react'
import { Container } from '@mui/material'
import { sendMessageToGemini } from '../utils/apiRes'
import { FileType } from './File'
import Chat from './Chat'
import React from 'react'

type ChatbotProps = {
    apiKey: string,
    prompt: string,
    model?: string,
    Header?: string,
    temperature?: number,
    useContext?: boolean,
    apiMaxOutputTokens?: number,
    imageUrl?: string,
    textPosition?: "yes" | "no",
    chatOpen?: boolean,
    titleOfChatBot?: string,
    DescriptionOfChatbot?: string,
    headerDescription?: string,
    themeColor?: string,
    BackGroundImage?: string
}

export type UserMessage = {
    isUser: boolean,
    type: 'attachment' | 'text',
    fileName?: string,
    fileType?: FileType,
    fileUrl?: string,
    text: string,
    timestamp: string,
}

function Chatbot(
    {
        apiKey,
        prompt,
        model = "gemini-2.0-flash",
        Header = "ChatOrbit",
        temperature = 0.7,
        useContext = false,
        apiMaxOutputTokens = 2048,
        imageUrl = "/chatbotimage.png",
        textPosition = "no",
        chatOpen = true,
        titleOfChatBot = "",
        DescriptionOfChatbot = "Start a conversation by typing a message below",
        headerDescription = "Ready to help",
        themeColor = "",
        BackGroundImage = ""
    }: ChatbotProps
) {

    // all states
    const [messages, setMessages] = useState<UserMessage[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // handler function
    const handleMessageBingSend = async (
        messageText: string,
        attachment: File | null
    ) => {
        const currentTime = new Date().toLocaleDateString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        let userMessage: UserMessage;
        if (attachment) {
            userMessage = {
                isUser: true,
                type: 'attachment',
                fileName: attachment.name,
                fileType: attachment.type as FileType,
                fileUrl: URL.createObjectURL(attachment),
                text: messageText,
                timestamp: currentTime,
            };
        } else {
            userMessage = {
                isUser: true,
                type: "text",
                text: messageText,
                timestamp: currentTime
            }
        }

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);

        setIsLoading(true);

        try {
            let fileContent: string | ArrayBuffer | null = null;

            if (attachment) {
                fileContent = await readFileContent(attachment);
            }

            const messageToSend = messageText || (attachment ? `Analyzing file: ${attachment.name}` : '');

            const botResponse = await sendMessageToGemini({
                apiKey,
                modelName: model,
                systemPrompt: prompt,
                userMessage: messageToSend,
                previousMessages: updatedMessages,
                fileContent,
                fileName: attachment?.name ?? null,
                temperature,
                useContext,
                apiMaxOutputTokens
            });

            console.log(botResponse.candidates[0].content.parts[0].text);

            setMessages([
                ...updatedMessages,
                {
                    isUser: false,
                    type: 'text',
                    text: botResponse.candidates[0].content.parts[0].text,
                    timestamp: new Date().toLocaleDateString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            ]);
        } catch (err) {
            console.log(err);
            setMessages([
                ...updatedMessages,
                {
                    isUser: false,
                    type: 'text',
                    text: 'Sorry, something went wrong. Please try again.',
                    timestamp: new Date().toLocaleDateString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    // helper function
    const readFileContent = (file: File): Promise<string | ArrayBuffer | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                resolve(e.target?.result ?? null);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }


    return (
        <Container
            maxWidth={false}
            sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                height: "100vh",
                padding: 3,
                margin: 0,
                width: "100%",
            }}
        >
            <Chat
                messages={messages}
                isLoading={isLoading}
                handleMessageBeingSent={handleMessageBingSend}
                imageUrl={imageUrl}
                textPosition={textPosition}
                chatOpen={chatOpen}
                titleOfChatBot={titleOfChatBot}
                DescriptionOfChatbot={DescriptionOfChatbot}
                headerDescription={headerDescription}
                themeColor={themeColor}
                BackGroundImage={BackGroundImage} Header={Header} />
        </Container>
    )
}

export { Chatbot }