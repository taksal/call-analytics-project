import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchAllCalls = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calls/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all calls:', error);
    throw error;
  }
};

export const fetchSummaryData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summary/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary data:', error);
    throw error;
  }
};
