import { useEffect, useState } from "react";
import axios from "axios";

export default function useUpvote(id) {
  const [upVote, setUpvote] = useState(0);
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/contributions/${id}/upvotes`)
      .then((result) => {
        const { upvotes } = result.data;
        setUpvote(upvotes);
        // setLoading(false);
      })
      .catch((err) => console.log("Error", err));
  }, [id]);

  return { upVote, setUpvote };
}
