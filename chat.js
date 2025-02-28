import ChatBot from './dist/index.umd.js';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>React Gemini Chatbot - Local Test</h1>
      <ChatBot
        apiKey="AIzaSyD6OwCYXnXdCXPpydMYTu0GYCMKXJH0LXw"  // Replace with your actual API key
        prompt="You are a friendly test assistant."
        Header="Test Chat"
        imageUrl="https://example.com/your-image.png" // Replace with your image URL
      />
    </div>
  );
}

export default App;
