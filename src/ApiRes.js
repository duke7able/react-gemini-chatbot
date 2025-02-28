export async function sendMessageToGemini(apiKey, modelName, systemPrompt, userMessage, previousMessages, fileContent = null, fileName = null,temperature,useContext,apiMaxOutputTokens) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent`;

  const formattedMessages = [];

  
  let userMessageText = userMessage; 
  if (fileContent) {
  userMessageText += `\n\nFile Content (${fileName}): ${fileContent}`;  
    }

  formattedMessages.push({
    role: 'model',
    parts: [{ text: systemPrompt }]
});
formattedMessages.push({
    role: 'user',
    parts: [{ text: userMessageText }]
});

  if (useContext) {
  for (let i = 0; i < previousMessages.length; i++) {
      const msg = previousMessages[i];
      if (msg.type === 'text') {
          formattedMessages.push({
              role: msg.isUser ? 'user' : 'model',
              parts: [{ text: msg.text }]
          });
      }
  }
}

  const requestBody = {
      contents: formattedMessages,
      generationConfig: {
          temperature: temperature,
          maxOutputTokens: apiMaxOutputTokens,
      },
  };

  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini');
  }

  const data = await response.json();

  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      return data.candidates[0].content.parts[0].text;
  } else {
      throw new Error('Unexpected response format from Gemini API');
  }
}
