import axios from "axios";
import { useReducer, useEffect } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "done":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
  }
};

export const useAPI = (url) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url);
        dispatch({ type: "done", data: response.data });
      } catch {
        dispatch({ type: "error" });
      }
    };
    fetchData();
  }, [url]);

  return [state];
};
