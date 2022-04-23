import { useSelector } from "react-redux";

export const useLoading = () => {
  const tasksLoading = useSelector((state) => state.tasks.loading);
  const userLoading = useSelector((state) => state.user.loading);

  const loading = tasksLoading || userLoading;

  return loading;
};
