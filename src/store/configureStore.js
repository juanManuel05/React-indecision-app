import {createStore,combineReducers} from 'redux'; 
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

//STORE CREATION
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        })
    );

    return store;
};


// wee exported like this cause we're exporting a function