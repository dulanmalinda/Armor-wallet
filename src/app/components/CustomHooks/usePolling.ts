import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Update {
    _id: string;
    content: string;
  }
  
  const usePolling = (url: string, interval: number = 10000) => {
    const [data, setData] = useState<Update[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
  
    useEffect(() => {
      const fetchUpdates = async () => {
        try {
          setLoading(true);
          const response = await axios.get<Update[]>(url);
          setData(response.data);
        } catch (err) {
          setError(err as Error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUpdates();
      const id = setInterval(fetchUpdates, interval);
  
      return () => clearInterval(id);
    }, [url, interval]);
  
    return { data, loading, error };
  };
  
  export default usePolling;