import { useEffect, useState } from "react";
import axios from "axios";

export default function useStories() {
  const [stories, setStories] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1")
      .then((result) => {
        console.log(result.data.stories);
        setStories(result.data.stories);
        setLoading(false);
      })
      .catch((err) => console.log("Error", err));
  }, []);
  return [stories, loading];
}
