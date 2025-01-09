import React, { useState, useEffect } from "react";
import { fetchReadMeFiles, fetchRepoRequests } from '../common/data/apiService';
import { RepoRequest, ReadMeFile } from "../common/data/datatypes";

const HomePage = () => {
  const [repoRequests, setRepoRequests] = useState<RepoRequest[]>([]);
  const [readMeFiles, setReadMeFiles] = useState<ReadMeFile[]>([]);

  useEffect(() => {
    const getRepoRequests = async () => {
      try {
        const data = await fetchRepoRequests();
        setRepoRequests(data);
      } catch (error) {
        console.error('Failed to load repo requests.');
      }
    };

    getRepoRequests();
  }, []);

  useEffect(() => {
    const getReadMeFiles = async () => {
      try {
        const data = await fetchReadMeFiles();
        setReadMeFiles(data);
      } catch (error) {
        console.error('Failed to load readme files.');
      }
    };

    getReadMeFiles();
  }, []);

  return (
    <div className="homepage">
      <header>
        <h1>README Generator</h1>
      </header>
      <section>
        <h2>Repo Requests</h2>
        <ul>
          {repoRequests.length > 0 ? (
            repoRequests.map((repo) => (
              <li key={repo.id}>
                <p>{repo.repo_url}</p>
              </li>
            ))
          ) : (
            <p>No repo requests available.</p>
          )}
        </ul>
      </section>

      <section>
        <h2>README.md Requests</h2>
        <ul>
          {readMeFiles.length > 0 ? (
            readMeFiles.map((readme) => (
              <li key={readme.id}>
                <p>{readme.content}</p>
              </li>
            ))
          ) : (
            <p>No readme files available.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
