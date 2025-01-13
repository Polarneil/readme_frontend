import axios from 'axios';

const apiUrl = process.env.REACT_APP_DJANGO_API_URL;

// Get Repo Requests
export const fetchRepoRequests = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/repo/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching repo requests:', error);
    throw error;
  }
}

// Create Repo Request
export const createRepoRequest = async (url: string) => {
  try {
    const response = await axios.post(`${apiUrl}/api/repo/`, { repo_url: url });
    return response.data;
  } catch (error) {
    console.error('Error creating repo request:', error);
    throw error;
  }
}

// Get ReadMe Files
export const fetchReadMeFiles = async (key: string) => {
  try {
    const response = await axios.get(`${apiUrl}/api/trigger-readme/?key=${key}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching readme files:', error);
    throw error;
  }
}

// Create ReadMe File
export const createReadMeFile = async (repoId: number) => {
  try {
    const response = await axios.post(`${apiUrl}/api/trigger-readme/`, { repo_request: repoId });
    return response.data;
  } catch (error) {
    console.error('Error creating readme file:', error);
    throw error;
  }
}

// Update ReadMe File
export const updateReadMeFile = async (readMeUUID: string, updated_content: string) => {
  try {
    const response = await axios.patch(`${apiUrl}/api/trigger-readme/`, { key: readMeUUID, content: updated_content });
    return response.data;
  } catch (error) {
    console.error('Error updating readme file:', error);
    throw error;
  }
}
