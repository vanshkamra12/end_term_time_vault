import axios from 'axios';
import { API_CONFIG } from '../config/apiConfig';

const historyApi = axios.create({
  baseURL: API_CONFIG.HISTORY_API_URL,
  headers: {
    'X-Api-Key': API_CONFIG.HISTORY_API_KEY,
    'Content-Type': 'application/json'
  }
});


const cache = new Map();

export const getHistoricalEvents = async (period, year) => {
  const cacheKey = `${period}-${year}`;
  
 
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < API_CONFIG.CACHE_DURATION) {
      return data;
    }
  }

  try {
    const response = await historyApi.get('/events', {
      params: {
        period,
        year
      }
    });

    // Store in cache
    cache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching historical events:', error);
    throw error;
  }
};

export const searchHistoricalFigures = async (query) => {
  try {
    const response = await historyApi.get('/figures', {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching historical figures:', error);
    throw error;
  }
};
