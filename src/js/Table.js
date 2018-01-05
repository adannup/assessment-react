import React, { Component } from 'react';
import TableRow from './TableRow';
import TableHeader from './TableHeader';

export default class Table extends Component {
  render() {
    const rows = this.props.users.map(user => (
      <TableRow
        key={user.id}
        name={user.name}
        username={user.username}
        address={user.address}
        website={user.website}
      />
    ));

    return (
      <table className="table">
        <tbody>
          <TableHeader />
          {rows}
        </tbody>
      </table>
    )
  }
}
