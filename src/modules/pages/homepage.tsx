import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { createRepoRequest, createReadMeFile, fetchReadMeFiles, updateReadMeFile } from "../common/data/apiService";
import CopyIcon from '@mui/icons-material/ContentCopy'; 
import '../app/app.component.css';
import BootstrapTooltip from "../common/tooltip";

const HomePage = () => {
  const [newRepoUrl, setNewRepoUrl] = useState<string>("");
  const [readmeKey, setReadmeKey] = useState<string>("");
  const [newReadMeKey, setNewReadMeKey] = useState<string>("");
  const [readMeContent, setReadMeContent] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showUrlForm, setShowUrlForm] = useState<boolean>(true);
  const [showForms, setShowForms] = useState<boolean>(true);
  const [tooltipText, setTooltipText] = useState('Copy');
  const [isContentChanged, setIsContentChanged] = useState<boolean>(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    // Determine if content has changed
    setIsContentChanged(editorContent !== readMeContent);
  }, [editorContent, readMeContent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setReadMeContent(null);
    setIsLoading(true);

    try {
      const newRequest = await createRepoRequest(newRepoUrl);
      const readMeFile = await createReadMeFile(newRequest.id);

      setReadMeContent(readMeFile.content);
      setEditorContent(readMeFile.content);
      setNewReadMeKey(readMeFile.key);
      setNewRepoUrl("");
      setShowForms(false);
    } catch (error) {
      console.error("Error creating repo request or README:", error);
      setErrorMessage("Failed to create repo request or generate README. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setReadMeContent(null);
    setIsLoading(true);

    try {
      const newRequest = await fetchReadMeFiles(readmeKey);
      setReadMeContent(newRequest.content);
      setEditorContent(newRequest.content);
      setNewReadMeKey(newRequest.key);
      setReadmeKey("");
      setShowForms(false);
    } catch (error) {
      console.error("Error fetching README content:", error);
      setErrorMessage("Error fetching README content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    setShowSaveSuccess(false);

    try {
      const updatedReadMe = await updateReadMeFile(newReadMeKey, editorContent);
      setReadMeContent(updatedReadMe.content);
      setShowSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating README content:", error);
      setErrorMessage("Failed to update README content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
    setTooltipText('Copied!');

    setTimeout(() => {
      setTooltipText('Copy');
    }, 1500);
  };

  return (
    <div className="homepage">
      {readMeContent && (
        <button onClick={() => setShowForms(!showForms)}>
          {showForms ? "Hide Input Forms" : "Show Input Forms"}
        </button>
      )}
      {showForms && (
        <div className="form-container">
          {showUrlForm ? (
            <section>
              <h2>Enter GitHub Repo URL</h2>
              <form className="form-subcontainer" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={newRepoUrl}
                  onChange={(e) => setNewRepoUrl(e.target.value)}
                  placeholder="Enter repo URL"
                  required
                />
                <button type="submit">Generate README</button>
              </form>
            </section>
          ) : (
            <section>
              <h2>Enter README Key</h2>
              <form className="form-subcontainer" onSubmit={handleKeySubmit}>
                <input
                  type="text"
                  value={readmeKey}
                  onChange={(e) => setReadmeKey(e.target.value)}
                  placeholder="Enter README Key"
                  required
                />
                <button type="submit">Fetch README</button>
              </form>
            </section>
          )}
          <p className="or-spacer">OR</p>
          <button onClick={() => setShowUrlForm(!showUrlForm)}>
            {showUrlForm ? "Use Key" : "Use URL"}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      )}

      {isLoading && (
        <div className="spinner"></div>
      )}

      {readMeContent && !isLoading && (
        <section>
          <div className="token-box-container">
            <div className="token-box">
              {newReadMeKey}
              <BootstrapTooltip title={tooltipText} arrow>
                <span className="copy-icon" onClick={() => copyToClipboard(newReadMeKey)}><CopyIcon fontSize="small" /></span>
              </BootstrapTooltip>
            </div>
            <div>
              <button
                className="no-hover"
                onClick={handleSave}
                disabled={!isContentChanged}
                style={{
                  cursor: isContentChanged ? 'pointer' : 'not-allowed',
                  display: 'inline-block',
                  backgroundColor: '#F6F8FA',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '2px solid #D0D9E0',
                  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)',
                  marginTop: '15px',
                  color: isContentChanged ? 'black' : 'gray',
                }}
              >
                Save
              </button>
              {showSaveSuccess && (
                <div style={{
                  color: '#2E7D32',
                  backgroundColor: '#E8F5E9',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  marginLeft: '10px',
                  display: 'inline-block',
                  animation: 'fadeIn 0.3s ease-in'
                }}>
                  Changes saved successfully!
                </div>
              )}
            </div>
          </div>
          <div className="split-container">
            <div className="editor-container">
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                rows={10}
                placeholder="Edit your markdown here..."
              />
            </div>
            <div className="preview-container">
              <ReactMarkdown>{editorContent}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;