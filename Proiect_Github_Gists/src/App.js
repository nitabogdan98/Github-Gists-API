import React, { Component } from "react";
import axios from "axios";
import Gist from "./Gist";
import './App.css'

const api = axios.create();
let id = 1;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      gists: [],
      username: '',
      message: 'Choose username:',
      forks: []
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state.username;
    api.get(`https://api.github.com/users/${data}/gists?page=${id}&per_page=5`)
      .then(res => {
        this.setState({ gists: res.data })
        console.log(id)
        //Verify if the response is empty
        if (!Object.keys(res.data).length) {
          id = 1;
        }
      })
      .catch(error => {
        id = 1;
        this.setState({ message: `User ${data} not found, try another username` });
      });
    id++;
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { username } = this.state.username;
    if (this.state.gists.length > 0) {
      return (
        <div className="app">
          <table>
            <tr>
              <th>Gists</th>
              <th>Users who forked</th>
            </tr>

            {this.state.gists.map(gist => (
              <Gist gist={gist} />
            ))}
            </table>
            <form onSubmit={this.handleSubmit}>
              <p><button>Next</button></p>
            </form>
            
        </div>
          )
    } else {
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
}

          export default App;
