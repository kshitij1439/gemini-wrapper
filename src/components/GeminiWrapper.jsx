// import axios from "axios"
// import { useState } from "react";
// const GeminiWrapper = () => {
//   const [question,setQuestion]=useState("");
//   const [answer,setAnswer]=useState("");
  
//   async function generateRespone() {
//       setAnswer("Generating...");
//       const res = await axios({
//         url:"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBALBP4FPHwE3oJK61JmQ8Fsx1wV0d5oeM",
//         method:"POST",
//         data:{
//           "contents": [{
//             "parts":[{"text": question}]
//             }]
//            }
//       })
//       setAnswer(res["data"]["candidates"][0]["content"]["parts"][0]["text"]);
//       console.log(res["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      
//     }
//   return (
//     <div>
//       <h1>AI Wrapper</h1>
//       <textarea placeholder="ask anything" value={question} onChange={e=>setQuestion(e.target.value)}></textarea>
//       <br />
//       <button onClick={generateRespone}>Generate </button>
//       <br />
//       <pre>

//       {answer}
//       </pre>
//     </div>
//   );
// };

// export default GeminiWrapper;

import React, { useState } from "react";
import axios from "axios";
import './GeminiWrapper.css'; // For custom styles

const GeminiWrapper = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateResponse() {
    setLoading(true);
    setAnswer("Loading...");
    try {
      const res = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBALBP4FPHwE3oJK61JmQ8Fsx1wV0d5oeM",
        method: "POST",
        data: {
          "contents": [
            {
              "parts": [{ "text": question }],
            },
          ],
        },
      });

      // Check if the response has content and format it
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
    <div>

    <div className="wrapper">
      <h1>AI Chat with Gemini</h1>
      <textarea
        placeholder="Ask anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="input-area"
        ></textarea>
      <br />
      <button onClick={generateResponse} className="generate-btn" disabled={loading}>
        {loading ? "Generating..." : "Generate Response"}
      </button>
      <br />
      
    </div>
      <div className="response-box">
        <h3>Response:</h3>
        <pre>{answer}</pre>
      </div>
        </div>
  );
};

export default GeminiWrapper;



