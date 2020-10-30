import { createStore } from 'redux';

//Reducers
//1. Reducers are pure function. Its output depends purely on its input and doesn't changes variables outside of the reducers' scope.
//2. never change state or action    
const countReducer = (state = { count: 0 }, action) => {
  
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };
    default:
      return state;
  }
};


const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

//INCREMENT
const incrementCount = ({incrementBy = 1} = {}) => ({
  type:'INCREMENT',
  incrementBy
});

store.dispatch(incrementCount({incrementBy:5}));
store.dispatch(incrementCount());

//DECREMENT
const decrementCount = ({decrementBy = 1}={}) => ({
  type:'DECREMENT',
  decrementBy
});

store.dispatch(decrementCount({decrementBy:10}));
store.dispatch(decrementCount());

//RESET
const resetCount = () => ({
  type:'RESET',
});

store.dispatch(resetCount());

//SET VALUE
const setCount =({count }) => ({
  type:'SET',
  count
});
store.dispatch(setCount({count:101}));

