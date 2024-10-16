import { useEffect, useState } from 'react';

export default function useTime() {
  const [time, setTime] = useState(() => new Date());
  const [oneMonthAgo, setOneMonthAgo] = useState(() => new Date());
  const [oneMonthLater, setOneMonthLater] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      setOneMonthAgo(
        new Date(time.getFullYear(), time.getMonth() - 1, time.getDate())
      );
      setOneMonthLater(
        new Date(time.getFullYear(), time.getMonth() + 1, time.getDate())
      );
    }, 3600000);
    return () => clearInterval(interval);
  }, [time]);
  return {
    oneMonthAgo,
    oneMonthLater,
  };
}
