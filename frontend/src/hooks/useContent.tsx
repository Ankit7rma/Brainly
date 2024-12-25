/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

// Custom hook to fetch content data
export function useContent() {
  const [contents, setContents] = useState<any[]>([]); // State to store fetched content
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Function to fetch content from the backend
  const fetchContents = async () => {
    try {
      setLoading(true); // Set loading state to true when data is being fetched
      const response = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"), // Authorization header with token
        },
      });
      console.log("Fetched content:", response.data); // Log the fetched data for debugging

      // Set the content if available, else use an empty array
      setContents(response.data.content || []);
    } catch (error) {
      console.error("Error fetching content:", error); // Log any errors
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  useEffect(() => {
    fetchContents(); // Fetch data when the component mounts

    // Set an interval to refresh the content every 10 seconds
    const interval = setInterval(() => {
      fetchContents();
    }, 10 * 1000); // Refresh every 10 seconds

    return () => {
      clearInterval(interval); // Cleanup interval when component unmounts
    };
  }, []); // Only run on mount (empty dependency array)

  return { contents, loading, refresh: fetchContents }; // Return the fetched content and loading state
}
