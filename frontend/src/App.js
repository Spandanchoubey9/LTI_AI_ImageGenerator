import { useState } from "react";
import "./App.css";
import Sample1 from "./Sample1.png";
import Sample2 from "./Sample2.png";
import Sample3 from "./Sample3.png";
import Sample4 from "./Sample4.png";
import Sample5 from "./Sample5.png";
import Sample6 from "./Sample6.png";


function App() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setImageUrl("");

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Backend returned an error");
      }

      const data = await response.json();

      if (!data.imageUrl) {
        throw new Error("Invalid response from backend");
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error(err);
      setError("Error connecting to backend");
    } finally {
      setLoading(false);
    }
  };
  
return (
  <div className="page">
    <div className="layout">

      <div className="sidebar">
    <h1 className="sidebar-title">Sample Images</h1>

    <img src={Sample1} alt="Sample 1" className="sample-img" />
    <img src={Sample2} alt="Sample 2" className="sample-img" />
    <img src={Sample3} alt="Sample 3" className="sample-img" />

  </div>

      {/* MAIN CONTENT */}
      <div className="app">
        <div className="card">
          <strong><h1>AI Image Generator</h1></strong>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want..."
          />

          <button onClick={generateImage} disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </button>

          {error && <div className="error">{error}</div>}

          {imageUrl && (
            <div className="image-container">
              <img src={imageUrl} alt="Generated result" />
            </div>
          )}
        </div>
      </div>

      <div className="sidebar">
    <h1 className="sidebar-title">Sample Images</h1>

    <img src={Sample4} alt="Sample 1" className="sample-img" />
    <img src={Sample5} alt="Sample 2" className="sample-img" />
    <img src={Sample6} alt="Sample 3" className="sample-img" />

  </div>
    </div>
  </div>
);
}

export default App;