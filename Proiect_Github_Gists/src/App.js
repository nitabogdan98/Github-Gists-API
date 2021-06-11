import React, { Component } from "react";
import axios from "axios";
import './App.css'

const api = axios.create();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gists: [],
      username: '',
      message: 'Choose username:'
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.username;
    api.get(`https://api.github.com/users/${data}/gists`)
      .then(res => {
        this.setState({ gists: res.data })
        console.log(res.data);
      })
      .catch(error => {
        this.setState({ message: `User ${data} not found, try another username` });
      });
   
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { username } = this.state.username;
      return (
        <div className="app">
          <p>{this.state.message}</p>
          <form onSubmit={this.handleSubmit}>
            <p><input type="text" placeholder="Username" value={username} name="username" onChange={this.handleInputChange}></input></p>
            <p><button>Search for Gists</button></p>
          </form>
        </div>
      );
    }
  }

export default App;
