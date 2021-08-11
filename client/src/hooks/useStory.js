// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function useStory(id) {
//   const [story, setStory] = useState({});
//   const [contributions, setContributions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:8000/api/stories/${id}`)
//       .then((result) => {
//         const { story, contributions } = result.data;
//         setStory((prev) => ({ ...prev, ...story }));
//         setContributions((prev) => [...prev, ...contributions]);
//         setLoading(false);
//       })
//       .catch((err) => console.log("Error", err));
//   }, [id, setContributions]);

//   return { story, contributions, loading };
// }

import { useEffect, useState } from "react";
import axios from "axios";

export default function useStory(id) {
  const [story, setStory] = useState({});
  const [contributions, setContributions] = useState([]);
  const [acceptedContributions, setAcceptedContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  let one = `http://localhost:8000/api/stories/${id}`;
  let two = `http://localhost:8000/api/stories/${id}/acceptedContributions`;

  useEffect(() => {
    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    axios
      .all([requestOne, requestTwo])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          console.log("RESPONSE ONE:", responseOne);
          console.log("RESPONSE TWO:", responseTwo);
          const { story, contributions } = responseOne.data;
          setStory((prev) => ({ ...prev, ...story }));
          setContributions((prev) => [...prev, ...contributions]);

          const { acceptedContributions } = responseTwo.data;
          setAcceptedContributions((prev) => [
            ...prev,
            ...acceptedContributions,
          ]);

          setLoading(false);
        })
      )
      .catch((errors) => {
        // react on errors.
      });
  }, [id, setContributions, setAcceptedContributions, one, two]);

  return { story, contributions, acceptedContributions, loading };
}
