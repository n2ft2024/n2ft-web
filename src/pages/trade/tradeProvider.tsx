import React, { useReducer } from 'react';

export const TrandeContext = React.createContext({});


function reducer(state:any, action:any) {
  if (action.type === 'changeLevel') {
    return {
      level: action.level
    };
  }
  throw Error('Unknown action.');
}
const initState = {
  level:1
}
export interface TradeContentProps {
  level:number,
  dispatchLevel:Function
}
export default function TradeProvider({children}:any) {
  const [state, dispatch] = useReducer(reducer, initState);

  function dispatchLevel(level:number){
    dispatch({
      type:'changeLevel',
      level
    })
  }

  let ctx:TradeContentProps = {
    level:state.level,
    dispatchLevel,
  };
  return <TrandeContext.Provider value={ctx} >{children}</TrandeContext.Provider>
}
