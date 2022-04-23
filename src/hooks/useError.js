import { useSelector } from "react-redux";

export const useError = () => {
  const tasksError = useSelector((state) => state.tasks.error);
  const userError = useSelector((state) => state.user.error);
  const appError = useSelector((state) => state.app.error);

  const error = tasksError || userError || appError;

  return error;
};
