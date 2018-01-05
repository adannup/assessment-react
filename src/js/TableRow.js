import React, { Component } from 'react';

export default class TableRow extends Component {
  render() {
    return (
      <tr className="table__row">
        <td className="table__cell">{this.props.name}</td>
        <td className="table__cell"><i className="material-icons">account_circle</i>{this.props.username}</td>
        <td className="table__cell">
          <div>{this.props.address.city}</div>
          <div>{`${this.props.address.suite} ${this.props.address.street}`}</div>
        </td>
        <td className="table__cell"><a href={`http://${this.props.website}`} target="_blank"> {this.props.website}</a></td>
      </tr>
    )
  }
}
