import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { msTo } from "../helpers";

// do not use this
export const useReminder = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const profile = useSelector((state) => state.user.profile);

  const sound = useMemo(() => new Audio(profile.audio), [profile.audio]);

  const checkRemind = () => {
    const now = msTo("minutes", Date.now());
    const task = tasks.find((task) => {
      const remind = msTo("minutes", new Date(task.remind).getTime());
      return remind === now;
    });

    if (task) {
      sound.play();
    }
  };

  useEffect(() => {
    const date = new Date();
    const seconds = date.getSeconds();

    let interval;
    let timeout;

    timeout = setTimeout(() => {
      checkRemind();
      interval = setInterval(() => {
        checkRemind();
      }, 60 * 1000);
    }, (60 - seconds) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);
};
