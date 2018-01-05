import React, { Component } from 'react';

const TableHeader = (props) => {
  return (
    <tr className="table__header_row">
      <th>Full name</th>
      <th>User Name</th>
      <th>Address</th>
      <th>Url</th>
    </tr>
  )
};

export default TableHeader;
