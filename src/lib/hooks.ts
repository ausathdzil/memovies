import { useEffect, useReducer } from 'react';

type TimeState = {
  time: Date;
  oneMonthAgo: Date;
  oneMonthLater: Date;
};

type TimeAction = { type: 'UPDATE_TIME'; payload: Date };

function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case 'UPDATE_TIME': {
      const currentTime = action.payload;
      return {
        time: currentTime,
        oneMonthAgo: new Date(
          currentTime.getFullYear(),
          currentTime.getMonth() - 1,
          currentTime.getDate()
        ),
        oneMonthLater: new Date(
          currentTime.getFullYear(),
          currentTime.getMonth() + 1,
          currentTime.getDate()
        ),
      };
    }
    default:
      return state;
  }
}

export default function useTime() {
  const initialState: TimeState = {
    time: new Date(),
    oneMonthAgo: new Date(),
    oneMonthLater: new Date(),
  };

  const [state, dispatch] = useReducer(timeReducer, initialState);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_TIME', payload: new Date() });
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return {
    oneMonthAgo: state.oneMonthAgo,
    oneMonthLater: state.oneMonthLater,
  };
}
