
//SET_TEXT_FILTER ACTION
export const setTextFilter = (text='')=> ({
    type:'SET_TEXT_FILTER',
    text
});

//SORT_BY_AMOUNT ACTION
export const sortByAmount = ()=> ({
    type:'SORT_BY_AMOUNT'
});

//SORT_BY_DATE ACTION
export const sortByDate = ()=> ({
    type:'SORT_BY_DATE'
});

//SET_START_DATE ACTION
export const setStartDate = (date = undefined)=> ({
    type: 'SET_START_DATE',
    date
});

//SET_END_DATE ACTION
export const setEndDate = (date = undefined)=> ({
    type: 'SET_END_DATE',
    date
});