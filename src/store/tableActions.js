import { FILTER_TABLE_DATA, SET_TABLE_DATA } from "./actionTypes";

export const setTableData = (data) => ({
   type: SET_TABLE_DATA,
   payload: data,
});
 
export const setFilteredData = (data) => ({
   type: FILTER_TABLE_DATA,
   payload: data,
});