import { useEffect, useState } from "react";
import axios from "axios";

export default function useUserStories(id, token) {
  const [stories, setStories] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/api/users/${id}/stories`, {
          headers: {
            "auth-token": token,
          },
        })
        .then((result) => {
          const { stories } = result.data;
          setStories((prev) => [...prev, ...stories]);
          setLoading(false);
        })
        .catch((err) => console.log("Error", err));
    }
  }, [id, token]);
  return [stories, loading];
}
