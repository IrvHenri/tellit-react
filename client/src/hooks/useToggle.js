import { useState } from "react";

const useToggle = (initialState = false) => {
  const [visible, setVisibility] = useState(initialState);

  const toggle = () => setVisibility((prev) => !prev);

  return { visible, toggle };
};

export default useToggle;
