import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFitlers from './ExpenseListFilters';


const ExpenseDashBoardPage = ()=> (
    <div>
        <ExpenseListFitlers />
        <ExpenseList />
    </div>
);

export default ExpenseDashBoardPage;

