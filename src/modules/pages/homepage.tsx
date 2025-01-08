import React, { useState, useEffect } from "react";
import { fetchRepoRequests } from '../common/data/apiService';
import { RepoRequest, ReadMeFile } from "../common/data/datatypes";

const HomePage = () => {
  const [repoRequests, setRepoRequests] = useState<RepoRequest[]>([]);

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

  return (
    <div className="homepage">
      <header>
        <h1>README Generator</h1>
        <p>yeah yeah yeah.</p>
      </header>
      <section>
        <h2>Repo Requests</h2>
        <ul>
          {repoRequests.length > 0 ? (
            repoRequests.map((repo) => (
              <li key={repo.id}>{repo.repo_url}</li>  // Adjust the property based on actual data
            ))
          ) : (
            <p>No repo requests available.</p>
          )}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
