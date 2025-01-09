import axios from 'axios';
import { RepoRequest, ReadMeFile } from './datatypes';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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

// Get ReadMe Files
export const fetchReadMeFiles = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/trigger-readme/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching readme files:', error);
    throw error;
  }
}
