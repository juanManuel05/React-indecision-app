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

export default expensesReducer;