import { useEffect, useState } from "react";
import axios from "axios";

export default function useStory(id) {
  const [story, setStory] = useState({});
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/stories/${id}`)
      .then((result) => {
        const { story, contributions } = result.data;
        setStory((prev) => ({ ...prev, ...story }));
        setContributions((prev) => [...prev, ...contributions]);
        setLoading(false);
      })
      .catch((err) => console.log("Error", err));
  }, [id, setContributions]);

  return { story, contributions, loading };
}
