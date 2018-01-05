import React, { Component } from 'react';
import { getUsers } from './client.js';
import Table from './Table';
import '../scss/index.scss';

export default class App extends Component {
  state = {
    fetched: false,
    users: []
  }

  componentDidMount() {
    this.loadUsersFromServer();
  }

  loadUsersFromServer = () => {
    getUsers(data => {
      this.setState({
        fetched: true,
        users: data
      });
    })
  }

  render() {
    if(this.state.fetched) {
      return (
        <Table users={this.state.users}/>
      )
    } else {
      return (
        <div className="loading"> Loading ... </div>
      )
    }

  }
}
