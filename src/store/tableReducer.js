import { FILTER_TABLE_DATA, SET_TABLE_DATA, SORT_TABLE_DATA } from "./actionTypes";

export const initialState = {
   data: [],
   filteredData: [],
};

export const tableReducer = (state = initialState, action) => {
   switch (action.type) {
     case SET_TABLE_DATA:
       return {
         ...state,
         data: action.payload,
         filteredData: action.payload,
       };
       case FILTER_TABLE_DATA:
        const searchTerm = action.payload.toLowerCase();
        const filteredData = state.data.filter((item) =>
          Object.values(item).join("").toLowerCase().includes(searchTerm)
        );
        return {
          ...state,
          filteredData,
        };
       case SORT_TABLE_DATA:
        const { column, direction } = action.payload;
        const sortedData = [...state.filteredData].sort((a, b) => {
          if (direction === 'asc') {
            return a[column] > b[column] ? 1 : -1;
          } else if (direction === 'desc') {
            return a[column] < b[column] ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          filteredData: sortedData,
        }; 
     default:
       return state;
   }
 };