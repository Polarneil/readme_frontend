import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { createRepoRequest, createReadMeFile } from "../common/data/apiService";
import '../app/app.component.css';

const HomePage = () => {
  const [newRepoUrl, setNewRepoUrl] = useState<string>(""); // For storing new repo URL
  const [readMeContent, setReadMeContent] = useState<string | null>(null); // For storing README markdown content
  const [editorContent, setEditorContent] = useState<string>(""); // For storing raw markdown input from the user
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // For error messages
  const [isLoading, setIsLoading] = useState<boolean>(false); // For tracking loading state

  // Handle form submission for creating a new repo request and fetching README
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Reset error message
    setReadMeContent(null); // Reset README content
    setIsLoading(true); // Start loading

    try {
      // Create a new repo request
      const newRequest = await createRepoRequest(newRepoUrl);

      // Create the ReadMe file for the newly created repo request
      const readMeFile = await createReadMeFile(newRequest.id);

      // Set the README content from the response
      setReadMeContent(readMeFile.content);
      setEditorContent(readMeFile.content); // Pre-populate the editor with the received content
      setNewRepoUrl(""); // Clear the input field
    } catch (error) {
      console.error("Error creating repo request or README:", error);
      setErrorMessage("Failed to create repo request or generate README. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading when the request is finished
    }
  };

  return (
    <div className="homepage">
      <header>
        <h1>README Generator</h1>
      </header>

      <section>
        <h2>Enter GitHub Repo URL</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newRepoUrl}
            onChange={(e) => setNewRepoUrl(e.target.value)}
            placeholder="Enter repo URL"
            required
          />
          <button type="submit">Generate README</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </section>

      {isLoading && (
        <section>
          <div className="spinner"></div> {/* Simple CSS spinner */}
        </section>
      )}

      {readMeContent && !isLoading && (
        <section>
          <h2>Split View - Editor & Preview</h2>
          <div className="split-container">
            <div className="editor-container">
              <h3>Markdown Editor</h3>
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                rows={10}
                placeholder="Edit your markdown here..."
              />
            </div>
            <div className="preview-container">
              <h3>Markdown Preview</h3>
              <ReactMarkdown>{editorContent}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
