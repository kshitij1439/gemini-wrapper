import React, { useState } from "react";
import axios from "axios";
import './components/GeminiWrapper'; // For custom styles

const GeminiWrapper = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateResponse() {
    setLoading(true);
    setAnswer("Loading...");
    try {
      const key =import.meta.env.VITE_GEMINI_API_KEY;
      const res = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
        method: "POST",
        data: {
          "contents": [
            {
              "parts": [{ "text": question }],
            },
          ],
        },
      });

      const responseText = res?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAnswer(responseText || "No response content received.");
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrapper">
      <h1>AI Chat with Gemini</h1>
      <textarea
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input-area"
      />
      <br />
      <button onClick={generateResponse} className="generate-btn" disabled={loading}>
        {loading ? "Generating..." : "Generate Response"}
      </button>
      <br />

      <div className="response-box">
        <h3>Response:</h3>
        <pre>{answer}</pre>
      </div>
    </div>
  );
};

export default GeminiWrapper;
