import { useRouteMatch } from "react-router-dom";

export const useMatchURL = () => {
  const match = useRouteMatch();
  return match ? match.url : null;
};
