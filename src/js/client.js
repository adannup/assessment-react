const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/users',
}

const getUsers = (callback) => {
  return axios(options)
    .then(checkStatus)
    .then(callback)
}

const checkStatus = response => {
  if (response.status == 200) {
    return response.data;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

module.exports = {
  getUsers,
}
