import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setFilteredData, setTableData } from './store/tableActions';
import { SORT_TABLE_DATA } from './store/actionTypes';

const API_URL = 'https://mocki.io/v1/b5e6ad84-b768-4b55-a5de-625561eefcb8';


const Table = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.filteredData);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ column: '', direction: '' });

  //Data fetch
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        dispatch(setTableData(response.data));
      })
      .catch((error) => {
        console.error('Error fetching table data:', error);
      });
  }, [dispatch]);


  //Filtering & sorting
  const handleNameFilter = (event) => {
    dispatch(setFilteredData(event.target.value));
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column, direction });
    dispatch({
      type: SORT_TABLE_DATA,
      payload: { column, direction },
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <input type="text" onChange={handleNameFilter} placeholder="Search by name" />
      <table>
        <thead>
          <tr>
            <th>
              Name
              <button onClick={() => handleSort('name')}>
                {sortConfig.column === 'name' && sortConfig.direction === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th>
              Phone
              <button onClick={() => handleSort('phone')}>
                {sortConfig.column === 'phone' && sortConfig.direction === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th>
              Email
              <button onClick={() => handleSort('email')}>
                {sortConfig.column === 'email' && sortConfig.direction === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th>
              Country
              <button onClick={() => handleSort('country')}>
                {sortConfig.column === 'country' && sortConfig.direction === 'asc' ? '▲' : '▼'}
              </button>
            </th>
            <th>
              Numberrange
              <button onClick={() => handleSort('numberrange')}>
                {sortConfig.column === 'numberrange' && sortConfig.direction === 'asc' ? '▲' : '▼'}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.country}</td>
              <td>{item.numberrange}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handleClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;