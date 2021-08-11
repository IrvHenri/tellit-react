import { useEffect, useState } from "react";
import axios from "axios";

export default function useStories() {
  const [stories, setStories] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/stories")
      .then((result) => {
        const { stories } = result.data;
        setStories((prev) => [...prev, ...stories]);
        setLoading(false);
      })
      .catch((err) => console.log("Error", err));
  }, []);
  return [stories, loading];
}
