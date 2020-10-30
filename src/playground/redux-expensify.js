import { createStore, combineReducers } from 'redux'; 
import uuid from 'uuid';

/**ACTIONS */

//ADD_EXPENSE ACTION
const addExpense = ({description ='',note='',amount=0,createdAt=0} = {})=> ({
    type:'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE ACTION

const removeExpense = ({id}={}) =>({
    type:'REMOVE_EXPENSE',
    id
});

//EDIT_EXPENSE ACTION
const editExpense=(id,updates) =>({
    type:'EDIT_EXPENSE',
    id,
    updates
});

//SET_TEXT_FILTER ACTION
const setTextFilter = (text='')=> ({
    type:'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT ACTION
const sortByAmount = ()=> ({
    type:'SORT_BY_AMOUNT'
});

//SORT_BY_DATE ACTION
const sortByDate = ()=> ({
    type:'SORT_BY_DATE'
});

//SET_START_DATE ACTION
const setStartDate = (date = undefined)=> ({
    type: 'SET_START_DATE',
    date
});

//SET_END_DATE ACTION
const setEndDate = (date = undefined)=> ({
    type: 'SET_END_DATE',
    date
});

/**REDUCERS */

//EXPENSES REDUCER
const expensesReducerDefaultState = [];

const expensesReducer = (state= expensesReducerDefaultState,action) =>{
    switch (action.type) {
        case 'ADD_EXPENSE':
            //return state.concat(action.expense); //use concat to not to alter the original state(one of the reducers premises!)   
                                                //CONCAT returns a new array(not the original), PUSH adds on the new item to the new array and returns the new length         
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id})=>id!== action.id); //Destructuring
            //return state.filter((expense)=>expense.id!== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id===action.id) {
                    return {
                        ...expense,
                        ...action.updates//Overwrite the fields specified in the 'object'passed in when calling the action
                    }
                }else {
                    return expense;
                }
            });

        default:
            return state;
    }
};

//FILTERS REDUCERS

const filtersReducerDefaultState = {
    text:'',
    sortBy:'date',
    startDate:undefined,
    endDate:undefined
};

const filtersReducer = (state= filtersReducerDefaultState,action) =>{
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text:action.text
            }
        
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy:'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy:'date'
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate:action.date
            }
        
        case 'SET_END_DATE':
            return {
                ...state,
                endDate:action.date
            }
        default:
            return state;
    }
};

//Get visible expenses
const getVisibleExpenses = (expenses,{text,sortBy,startDate,endDate})=> {
    return expenses.filter((expense)=>{
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt>= startDate;
        const endDateMatch = typeof endDate !== 'number'|| expense.createdAt<= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy==='date'){
            return a.createdAt <b.createdAt ? 1 : -1;
        } else if( sortBy ==='amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    })
};

//STORE CREATION
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

//Everytime the callnack function runs i'll print the line to the screen therefore print the state
store.subscribe(()=>{
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);
});

//DISPATCHES
const expenseOne =  store.dispatch(addExpense({description:'rent',amount:100,createdAt:1000}));
const expenseTwo= store.dispatch(addExpense({description:'coffee',amount:200,createdAt:-1000}));

// store.dispatch(removeExpense({id:expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id,{amount:500}));

//store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate()); 

//store.dispatch(setStartDate(0));
// store.dispatch(setStartDate());
//store.dispatch(setEndDate(500));


const demoState = {
    expenses: [{
        id:'adasd',
        description:'January rent',
        note:'final payment',
        amount:12800,
        createdAt: 0
    }],
    filters:{
        text:'rent',
        sortBy:'amount',//date or amount
        startDate:undefined,
        endDate:undefined
    }
};
