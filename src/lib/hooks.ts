import { useEffect, useReducer } from 'react';

type TimeState = {
  time: Date;
  oneMonthAgo: Date;
  oneMonthLater: Date;
};

type TimeAction = { type: 'UPDATE_TIME'; payload: Date };

function calculateTimeState(currentTime: Date): TimeState {
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

function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case 'UPDATE_TIME':
      calculateTimeState(action.payload);
    default:
      return state;
  }
}

export default function useTime() {
  const [state, dispatch] = useReducer(
    timeReducer,
    new Date(),
    calculateTimeState
  );

  useEffect(() => {
    dispatch({ type: 'UPDATE_TIME', payload: new Date() });
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_TIME', payload: new Date() });
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  return {
    today: state.time,
    oneMonthAgo: state.oneMonthAgo,
    oneMonthLater: state.oneMonthLater,
  };
}
